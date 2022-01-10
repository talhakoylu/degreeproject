import StandardLayout from "../../../components/layouts/StandardLayout";
import DashboardArea from "../../../components/DashboardArea";
import * as yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {
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

const formSchema = yup.object().shape({
    title: yup.string()
        .required("Title is required.")
        .min(15, "Title must be at least 15 characters.")
        .max(255, "Title can be up to 255 characters."),
    description: yup.string()
        .required("Description is required."),
    category: yup.string()
        .required("Category is required."),

})

const QuizCreatePage = () => {

    const {register, handleSubmit, formState: {errors}} = useForm({
        resolver: yupResolver(formSchema)
    });
    const onSubmit = data => console.log(data);

    return (
        <StandardLayout>
            <DashboardArea title={"Quiz Oluşturma"}
                           description={"Oluşturmak istediğiniz quiz için başlık, açıklama ve görsel ekleyin." +
                           " Daha sonrasında oluşturduğunuz sınavı düzenle diyerek soru ekleyebilirsiniz."}
            showGoBackButton={true}
            >
                <form>
                    <VStack spacing={2} align={"stretch"}>
                        <SimpleGrid columns={1} spacing={6}>

                            <FormControl id={"title"} isInvalid={errors.title}>
                                <FormLabel>Quiz Title</FormLabel>
                                <Input placeholder="Enter a title" type="title" {...register("title")}/>
                                <FormErrorMessage>{errors.title && errors.title.message}</FormErrorMessage>
                                <FormHelperText>
                                    Sınavınız için bir başlık belirleyin.
                                </FormHelperText>
                            </FormControl>

                            <FormControl id={"description"} isInvalid={errors.description}>
                                <FormLabel>Description</FormLabel>
                                <Textarea height={150} placeholder="Explain your quiz" {...register("description")}/>
                                <FormErrorMessage>{errors.description && errors.description.message}</FormErrorMessage>
                                <FormHelperText>
                                    Write a description about this quiz you created.
                                </FormHelperText>
                            </FormControl>

                            <FormControl id={"category"} isInvalid={errors.category}>
                                <FormLabel>Category</FormLabel>
                                <Select placeholder='Select a category' {...register("category")}>
                                    <option value='1'>Category 1</option>
                                    <option value='2'>Category 2</option>
                                    <option value='3'>Category 3</option>
                                </Select>
                                <FormErrorMessage>{errors.category && errors.category.message}</FormErrorMessage>
                                <FormHelperText>
                                    Select a category to your quiz.
                                </FormHelperText>
                            </FormControl>

                            <FormControl id={"coverImage"} isInvalid={errors.coverImage}>
                                <FormLabel>Cover Image</FormLabel>
                                <Input accept="image/jpeg, image/gif, image/png" pt={1} placeholder="Upload an image." type="file" {...register("coverImage")}/>
                                <FormErrorMessage>{errors.coverImage && errors.coverImage.message}</FormErrorMessage>
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
                </form>

            </DashboardArea>
        </StandardLayout>
    )
}

export default QuizCreatePage