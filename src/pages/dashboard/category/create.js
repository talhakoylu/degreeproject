import DashboardArea from "@/components/DashboardArea";
import StandardLayout from "@/components/layouts/StandardLayout";
import CustomRichText from "@/components/RichText";
import { ApiService } from "@/services/api.service";
import { authValue } from "@/store/slices/auth";
import { Alert, AlertDescription, AlertIcon, Button, FormControl, FormErrorMessage, FormHelperText, FormLabel, Input, SimpleGrid, VStack } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { useSelector } from "react-redux";
import * as yup from "yup";

const formSchema = yup.object().shape({
    title: yup.string()
        .required("Title is required.")
        .min(3, "Title must be at least 3 characters.")
        .max(70, "Title can be up to 70 characters."),
    description: yup.string()
        .required("Description is required.")
        .min(30, "Description must be at least 30 characters!")
});

export default function CreateCategoryPage() {
    const [imageExists, setImageExists] = useState(false);
    const router = useRouter();
    const auth = useSelector(authValue);

    const categoryMutation = useMutation(async data => await ApiService.categoryQueries.createCategory(data)
    );

    const imageMutation = useMutation(async (data) => await ApiService.categoryQueries.addCoverImage(data.file, data.id));

    const { control, register, handleSubmit, setValue, formState: { errors } } = useForm({
        resolver: yupResolver(formSchema)
    });

    const onSubmit = async submitData => {
        const imageFilesLength = submitData.image.length;
        const coverImage = new FormData();
        if (imageFilesLength > 0) {
            coverImage.append('image', submitData.image[0]);
            setImageExists(true);
        }
        delete submitData.image;

        console.log(submitData);

        const result = await categoryMutation.mutateAsync(submitData);
        if (imageFilesLength > 0) {
            await imageMutation.mutateAsync({ file: coverImage, id: result.data.data._id });
        }
    };

    useEffect(() => {
        if (imageExists) {
            if (categoryMutation.isSuccess && imageMutation.isSuccess) {
                router.replace('/dashboard/manage-categories');
            }
        } else if (categoryMutation.isSuccess) {
            router.replace('/dashboard/manage-categories');
        }
    }, [imageExists, imageMutation.isSuccess]);

    return (
        <StandardLayout>
            <DashboardArea title={"Kategori Ekle"} description={'Eklenecek yeni kategorinin detaylarını belirleyiniz.'} showGoBackButton>
                {
                    auth?.isReady && auth?.user?.isAdmin ? <form>
                        <VStack spacing={2} align={"stretch"}>
                            <SimpleGrid columns={1} spacing={6}>

                                <FormControl id={"title"} isInvalid={errors.title}>
                                    <FormLabel>Category Title</FormLabel>
                                    <Input placeholder="Enter a title" type="text" {...register("title")} />
                                    <FormErrorMessage>{errors.title && errors.title.message}</FormErrorMessage>
                                    <FormHelperText>
                                        Kategori için bir başlık belirleyin.
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
                                        Write a description about this category you created.
                                    </FormHelperText>
                                </FormControl>

                                <FormControl id={"coverImage"} isInvalid={errors.image}>
                                    <FormLabel>Cover Image</FormLabel>
                                    <Input accept="image/jpeg, image/gif, image/png" pt={1} placeholder="Upload an image." type="file" {...register("image")} />
                                    <FormErrorMessage>{errors.image && errors.image.message}</FormErrorMessage>
                                    <FormHelperText>
                                        Upload a cover image for the category. Remember, this is important to engage the user and must be relevant to the quiz.
                                    </FormHelperText>
                                </FormControl>
                            </SimpleGrid>

                            <Button alignSelf={"end"} type={"submit"} onClick={handleSubmit((onSubmit))}
                                justifySelf={"center"} colorScheme='blue' rounded={"3xl"}>
                                Add a Category
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
}

