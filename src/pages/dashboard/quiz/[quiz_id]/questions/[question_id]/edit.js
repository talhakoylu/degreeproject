import DashboardArea from "@/components/DashboardArea";
import StandardLayout from "@/components/layouts/StandardLayout";
import CustomRichText from "@/components/RichText";
import { ApiService } from "@/services/api.service";
import { Alert, AlertDescription, AlertIcon, Button, Checkbox, FormControl, FormErrorMessage, FormHelperText, FormLabel, HStack, Input, Radio, RadioGroup, Stack, Textarea, VStack } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useMutation, useQuery } from "react-query";
import * as yup from "yup";

const formSchema = yup.object().shape({
    questionText: yup.string()
        .required("Question is required.")
        .min(30, "Question must be at least 30 characters!"),
    answer1: yup.string()
        .required("Answer 1 is required."),
    answer2: yup.string()
        .required("Answer 2 is required.")
});

export default function EditQuestionPage() {
    const router = useRouter();
    const { quiz_id, question_id } = router.query;

    const { getValues, setValue, watch, control, register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(formSchema),
    });

    const questionQuery = useQuery('findQuestionById', async () => await ApiService.quizQueries.findQuestion(quiz_id, question_id), { enabled: router.isReady });
    const updateMutation = useMutation(async data => await ApiService.quizQueries.updateQuestion(data.quizId, data.questionId, data.data))

    useEffect(() => {
        if (questionQuery.isSuccess) {
            reset({
                questionText: questionQuery?.data?.data?.data?.questionText,
                answer1: questionQuery?.data?.data?.data?.answer1,
                answer2: questionQuery?.data?.data?.data?.answer2,
                answer3: questionQuery?.data?.data?.data?.answer3,
                answer4: questionQuery?.data?.data?.data?.answer4,
                correctAnswer: questionQuery?.data?.data?.data?.correctAnswer,
            });
        }

    }, [questionQuery.isSuccess, questionQuery?.data?.data?.data, reset]);
    
    const onSubmit = async data => {
        Object.keys(data).forEach(key => {
            if (data[key] === '' || data[key] == null) {
                delete data[key];
            }
        });

        await updateMutation.mutateAsync({quizId: quiz_id, questionId: question_id, data})
    };

    if (updateMutation.isSuccess) {
        router.push(`/dashboard/quiz/${quiz_id}/edit`)
    }
    return (
        <StandardLayout>
            <DashboardArea title={"Soru Düzenle"} description={"Bu sayfadan eklemiş olduğunuz bir soruyu düzenleyebilirsiniz."} showGoBackButton>
                {questionQuery.isSuccess ?
                    <form>
                        <VStack spacing={4} align={"stretch"}>
                            <FormControl id={"questionText"} isInvalid={errors.questionText}>
                                <FormLabel>Question</FormLabel>
                                <Controller
                                    control={control}
                                    name="questionText"
                                    render={({ field: { onChange, onBlur, value, ref } }) => (
                                        <CustomRichText
                                            onChange={onChange}
                                            onBlur={onBlur}
                                            value={value}
                                        />
                                    )}
                                />
                                <FormErrorMessage>{errors.questionText && errors.questionText.message}</FormErrorMessage>
                            </FormControl>

                            <Controller
                                control={control}
                                name="correctAnswer"
                                render={({
                                    field: { onChange, onBlur, value, name, ref },
                                    fieldState: { invalid, isTouched, isDirty, error },
                                    formState,
                                }) => (
                                    <RadioGroup
                                        onChange={onChange}
                                        value={value}
                                    >
                                        {["1", "2", "3", "4"].map((answerNumber, k) => {
                                            return (
                                                <Stack key={k} direction={{ base: "column", md: "row" }}>
                                                    <FormControl id={`answer${answerNumber}`} isInvalid={errors[`answer${answerNumber}`]}>
                                                        <FormLabel>Answer {answerNumber}</FormLabel>
                                                        <Textarea placeholder="Answer text" type="text" {...register(`answer${answerNumber}`, {
                                                            onChange: (e) => {
                                                                const correctAnswer = getValues('correctAnswer');
                                                                if (!e.target.value && correctAnswer === answerNumber) {
                                                                    setValue('correctAnswer', null);
                                                                }
                                                            }
                                                        })} />
                                                        <FormErrorMessage >{errors[`answer${answerNumber}`] && errors[`answer${answerNumber}`].message}</FormErrorMessage>
                                                    </FormControl>
                                                    <FormControl id={`answerCorrectLabel${answerNumber}`} maxW={{ base: "100%", md: "40%" }} isInvalid={errors.correctAnswer}>
                                                        <FormLabel>Is answer {answerNumber} is a correct answer?</FormLabel>
                                                        <Radio name={answerNumber} id={`answerCorrect${answerNumber}`} value={answerNumber} isDisabled={watch(`answer${answerNumber}`) ? false : true} {...register('correctAnswer')}>Check this box if this is a correct answer.</Radio>
                                                        <FormErrorMessage>{errors[`correctAnswer`] && errors[`correctAnswer`].message}</FormErrorMessage>
                                                    </FormControl>
                                                </Stack>
                                            );
                                        })}
                                    </RadioGroup>
                                )}
                            />

                            <Button isDisabled={!router.isReady} isFullWidth colorScheme={"purple"} type={"submit"} onClick={handleSubmit((onSubmit))}>Update</Button>
                        </VStack>
                    </form> :
                    questionQuery.isError ?
                        <Alert status='error'>
                            <AlertIcon />
                            <AlertDescription>Bir hata meydana geldi.</AlertDescription>
                        </Alert> :
                        <Alert status='warning'>
                            <AlertIcon />
                            <AlertDescription>Sayfa kontrol ediliyor.</AlertDescription>
                        </Alert>

                }
            </DashboardArea>
        </StandardLayout>
    );
}
