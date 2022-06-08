import StandardLayout from "../../../components/layouts/StandardLayout";
import DashboardArea from "../../../components/DashboardArea";
import * as yup from "yup";

import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
    Alert,
    AlertDescription,
    AlertIcon,
    Button,
    Checkbox,
    FormControl,
    FormErrorMessage,
    FormHelperText,
    FormLabel,
    Input, Link, ListItem, Select,
    SimpleGrid,
    Stack, Text, Textarea, UnorderedList,
    VStack
} from "@chakra-ui/react";
import CustomRichText from "../../../components/RichText";
import { useSelector } from "react-redux";
import { authValue } from "@/store/slices/auth";
import { useRouter } from "next/router";
import { ApiService } from "@/services/api.service";
import { useMutation, useQuery } from "react-query";

const formSchema = yup.object().shape({
    title: yup.string()
        .required("Title is required.")
        .min(15, "Title must be at least 15 characters.")
        .max(255, "Title can be up to 255 characters."),
    description: yup.string()
        .required("Description is required.")
        .min(30, "Description must be at least 30 characters!"),
    category: yup.string()
        .required("Category is required."),

});


const QuizCreatePage = () => {

    const auth = useSelector(authValue);
    const router = useRouter();
    const { data, isSuccess, isError } = useQuery('getAllCategoriesForQuizCreate', async () => await ApiService.categoryQueries.getAllCategories(), { enabled: (auth.isReady && auth.user.isAdmin) });

    const quizMutation = useMutation(async data => {
        return await ApiService.quizQueries.createQuiz(data);
    });

    const imageMutation = useMutation(async (data) => {
        return await ApiService.quizQueries.addCoverImage(data.file, data.id);
    });

    const { control, register, handleSubmit, setValue, formState: { errors } } = useForm({
        resolver: yupResolver(formSchema)
    });

    const onSubmit = async submitData => {
        const { _id: categoryId, title, slug } = data.data.data.find(item => item._id === submitData.category);
        submitData.category = {
            categoryId,
            title,
            slug
        };
        const coverImage = new FormData();
        coverImage.append('image', submitData.image[0])
        submitData.image = undefined;
        const result = await quizMutation.mutateAsync(submitData);
        await imageMutation.mutateAsync({file: coverImage, id: result.data.data._id})
    };

    if(quizMutation.isSuccess && imageMutation.isSuccess){
        router.replace('/dashboard/create-quiz')
    }


    return (
        <StandardLayout>
            <DashboardArea title={"Quiz Oluşturma"}
                description={"Oluşturmak istediğiniz quiz için başlık, açıklama ve görsel ekleyin." +
                    " Daha sonrasında oluşturduğunuz sınavı düzenle diyerek soru ekleyebilirsiniz."}
                showGoBackButton={true}
            >
                {
                    auth.isReady && auth.user.isAdmin ? <form>
                        <VStack spacing={2} align={"stretch"}>
                            <SimpleGrid columns={1} spacing={6}>



                                <FormControl id={"title"} isInvalid={errors.title}>
                                    <FormLabel>Quiz Title</FormLabel>
                                    <Input placeholder="Enter a title" type="text" {...register("title")} />
                                    <FormErrorMessage>{errors.title && errors.title.message}</FormErrorMessage>
                                    <FormHelperText>
                                        Sınavınız için bir başlık belirleyin.
                                    </FormHelperText>
                                </FormControl>

                                <FormControl id={"description"} isInvalid={errors.description}>
                                    <FormLabel>Description</FormLabel>
                                    <Controller
                                        control={control}
                                        name="description"
                                        render={({ field: { onChange, onBlur, value, ref } }) => (
                                            <CustomRichText
                                                onChange={onChange}
                                                onBlur={onBlur}
                                                value={value}
                                            />
                                        )}
                                    />
                                    <FormErrorMessage>{errors.description && errors.description.message}</FormErrorMessage>
                                    <FormHelperText>
                                        Write a description about this quiz you created.
                                    </FormHelperText>
                                </FormControl>

                                <FormControl id={"category"} isInvalid={errors.category}>
                                    <FormLabel>Category</FormLabel>
                                    <Select placeholder='Select a category' {...register("category")}>
                                        {/* <option value='1'>Category 1</option>
                                        <option value='2'>Category 2</option>
                                        <option value='3'>Category 3</option> */}
                                        {isSuccess && data?.data?.data?.map((item, index) => {
                                            return <option key={index} value={item._id}>{item.title}</option>;
                                        })}
                                    </Select>
                                    <FormErrorMessage>{errors.category && errors.category.message}</FormErrorMessage>
                                    <FormHelperText>
                                        Select a category to your quiz.
                                    </FormHelperText>
                                </FormControl>

                                <FormControl id={"coverImage"} isInvalid={errors.image}>
                                    <FormLabel>Cover Image</FormLabel>
                                    <Input accept="image/jpeg, image/gif, image/png" pt={1} placeholder="Upload an image." type="file" {...register("image")} />
                                    <FormErrorMessage>{errors.image && errors.image.message}</FormErrorMessage>
                                    <FormHelperText>
                                        Upload a cover image for your quiz. Remember, this is important to engage the user and must be relevant to the quiz.
                                    </FormHelperText>
                                </FormControl>
                            </SimpleGrid>

                            <Button alignSelf={"end"} type={"submit"} onClick={handleSubmit((onSubmit))}
                                justifySelf={"center"} colorScheme='blue' rounded={"3xl"}>
                                Add a Quiz
                            </Button>
                        </VStack>
                    </form> :
                        <Alert status='error'>
                            <AlertIcon />
                            <AlertDescription>Bu işlem için yetkiniz bulunmamakta.</AlertDescription>
                        </Alert>
                }

            </DashboardArea>
        </StandardLayout>
    );
};

export default QuizCreatePage;