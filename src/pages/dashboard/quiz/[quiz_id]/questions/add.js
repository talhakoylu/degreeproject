import DashboardArea from "@/components/DashboardArea";
import StandardLayout from "@/components/layouts/StandardLayout";
import CustomRichText from "@/components/RichText";
import { Box, Button, Checkbox, FormControl, FormErrorMessage, FormHelperText, FormLabel, HStack, Input, Radio, RadioGroup, Stack, Text, Textarea, VStack } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";

const formSchema = yup.object().shape({
    question: yup.string()
        .required("Question is required.")
        .min(30, "Question must be at least 30 characters!"),
    answer1: yup.string()
        .required("Answer 1 is required."),
    answer2: yup.string()
        .required("Answer 2 is required."),
    correctAnswer: yup.string()
        .required("Select a correct answer.")
});

export default function AddQuestionPage() {
    const { getValues, setValue, watch, control, register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(formSchema)
    });


    const onSubmit = data => {
        Object.keys(data).forEach(key => {
            if (data[key] === '' || data[key] == null) {
              delete data[key];
            }
          });
        console.log(data)
    };
    return (
        <StandardLayout>
            <DashboardArea title={"Soru Ekle"} description={"Bu sayfadan sınavınız için soru ve cevaplar ekleyebilirsiniz."} showGoBackButton>
                <form>
                    <VStack spacing={4} align={"stretch"}>
                        <FormControl id={"question"} isInvalid={errors.question}>
                            <FormLabel>Question</FormLabel>
                            <Controller
                                control={control}
                                name="question"
                                render={({ field: { onChange, onBlur, value, ref } }) => (
                                    <CustomRichText
                                        onChange={onChange}
                                        onBlur={onBlur}
                                        value={value}
                                    />
                                )}
                            />
                            <FormErrorMessage>{errors.question && errors.question.message}</FormErrorMessage>
                            <FormHelperText>
                                Soru içeriğini bu alana girmelisiniz.
                            </FormHelperText>
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
                                                    {console.log(errors[`answer${answerNumber}`])}
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


                        <Button isFullWidth colorScheme={"purple"} type={"submit"} onClick={handleSubmit((onSubmit))}>Save</Button>

                    </VStack>
                </form>
            </DashboardArea>
        </StandardLayout>
    );
}
