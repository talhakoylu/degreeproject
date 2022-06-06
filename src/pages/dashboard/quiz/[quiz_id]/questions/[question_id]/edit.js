import DashboardArea from "@/components/DashboardArea";
import StandardLayout from "@/components/layouts/StandardLayout";
import CustomRichText from "@/components/RichText";
import { Button, Checkbox, FormControl, FormErrorMessage, FormHelperText, FormLabel, HStack, Input, Stack, Textarea, VStack } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";

const formSchema = yup.object().shape({
    question: yup.string()
        .required("Question is required.")
        .min(30, "Question must be at least 30 characters!"),
    answer1: yup.string()
        .required("Answer 1 is required. Because you must add at least 1 answer.")
})

export default function EditQuestionPage() {
    const router = useRouter();
    const {quiz_id, question_id} = router.query;

    const { control, register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(formSchema),
        defaultValues: {
            question: "Lorem ipsum dolor sit amet.",
            answer1: "Answer 1 example question text",
            answer1IsTrue: false,
            answer2: "Answer 2 example question text. This answer is longer than answer 1. Also this is a correct answer :)",
            answer2IsTrue: true,
            answer3: "Answer 3 example question text with lorem ipsum",
            answer3IsTrue: false,
            answer4: "Answer 4 example question text. A question can have more than one correct answer.",
            answer4IsTrue: true,
        }
    });
    const onSubmit = data => console.log(`${quiz_id}, ${question_id}, ${data}`);
    return (
        <StandardLayout>
            <DashboardArea title={"Soru Düzenle"} description={"Bu sayfadan eklemiş olduğunuz bir soruyu düzenleyebilirsiniz."} showGoBackButton>
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
                        </FormControl>

                        <Stack direction={{ base: "column", md: "row" }}>
                            <FormControl id={"answer1"} isInvalid={errors.answer1}>
                                <FormLabel>Answer 1</FormLabel>
                                <Textarea placeholder="Answer text" type="text" {...register("answer1")} />
                                <FormErrorMessage>{errors.answer1 && errors.answer1.message}</FormErrorMessage>
                            </FormControl>
                            <FormControl id={"answer1IsTrue"} isInvalid={errors.answer1IsTrue} maxW={{ base: "100%", md: "40%" }}>
                                <FormLabel>Is answer 1 is a correct answer?</FormLabel>
                                <Checkbox {...register("answer1IsTrue")}>Check this box if this is a correct answer.</Checkbox>
                                <FormErrorMessage>{errors.answer1IsTrue && errors.answer1IsTrue.message}</FormErrorMessage>
                            </FormControl>
                        </Stack>

                        <Stack direction={{ base: "column", md: "row" }}>
                            <FormControl id={"answer2"} isInvalid={errors.answer2}>
                                <FormLabel>Answer 2</FormLabel>
                                <Textarea placeholder="Answer text" type="text" {...register("answer2")} />
                                <FormErrorMessage>{errors.answer2 && errors.answer2.message}</FormErrorMessage>
                            </FormControl>
                            <FormControl id={"answer2IsTrue"} isInvalid={errors.answer2IsTrue} maxW={{ base: "100%", md: "40%" }}>
                                <FormLabel>Is answer 2 is a correct answer?</FormLabel>
                                <Checkbox {...register("answer2IsTrue")}>Check this box if this is a correct answer.</Checkbox>
                                <FormErrorMessage>{errors.answer2IsTrue && errors.answer2IsTrue.message}</FormErrorMessage>
                            </FormControl>
                        </Stack>

                        <Stack direction={{ base: "column", md: "row" }}>
                            <FormControl id={"answer3"} isInvalid={errors.answer3}>
                                <FormLabel>Answer 3</FormLabel>
                                <Textarea placeholder="Answer text" type="text" {...register("answer3")} />
                                <FormErrorMessage>{errors.answer3 && errors.answer3.message}</FormErrorMessage>
                            </FormControl>
                            <FormControl id={"answer3IsTrue"} isInvalid={errors.answer3IsTrue} maxW={{ base: "100%", md: "40%" }}>
                                <FormLabel>Is answer 3 is a correct answer?</FormLabel>
                                <Checkbox {...register("answer3IsTrue")}>Check this box if this is a correct answer.</Checkbox>
                                <FormErrorMessage>{errors.answer3IsTrue && errors.answer3IsTrue.message}</FormErrorMessage>
                            </FormControl>
                        </Stack>

                        <Stack direction={{ base: "column", md: "row" }}>
                            <FormControl id={"answer4"} isInvalid={errors.answer4}>
                                <FormLabel>Answer 4</FormLabel>
                                <Textarea placeholder="Answer text" type="text" {...register("answer4")} />
                                <FormErrorMessage>{errors.answer4 && errors.answer4.message}</FormErrorMessage>
                            </FormControl>
                            <FormControl id={"answer4IsTrue"} isInvalid={errors.answer4IsTrue} maxW={{ base: "100%", md: "40%" }}>
                                <FormLabel>Is answer 4 is a correct answer?</FormLabel>
                                <Checkbox {...register("answer4IsTrue")}>Check this box if this is a correct answer.</Checkbox>
                                <FormErrorMessage>{errors.answer4IsTrue && errors.answer4IsTrue.message}</FormErrorMessage>
                            </FormControl>
                        </Stack>

                        <Button isFullWidth colorScheme={"purple"} type={"submit"} onClick={handleSubmit((onSubmit))}>Update</Button>
                    </VStack>
                </form>
            </DashboardArea>
        </StandardLayout>
    )
}
