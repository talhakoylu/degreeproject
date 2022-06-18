import DashboardArea from "@/components/DashboardArea";
import StandardLayout from "@/components/layouts/StandardLayout";
import CustomRichText from "@/components/RichText";
import { Alert, AlertDescription, AlertIcon, Box, Button, FormControl, FormErrorMessage, FormHelperText, FormLabel, HStack, Icon, IconButton, Image, Input, Link, Select, SimpleGrid, Stack, Tab, TabList, TabPanel, TabPanels, Text }
  from "@chakra-ui/react";
import dynamic from 'next/dynamic';
const Tabs = dynamic(import('@chakra-ui/react').then(mod => mod.Tabs), { ssr: false }); // disable ssr

import { useRouter } from "next/router";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { FiEdit } from 'react-icons/fi';
import React, { useEffect, useState } from "react";
import { MdOutlineDeleteForever, MdOutlineModeEditOutline } from "react-icons/md";
import CustomTable from "@/components/CustomTable";
import { useMutation, useQuery } from "react-query";
import { ApiService } from "@/services/api.service";
import { authValue } from "@/store/slices/auth";
import { useSelector } from 'react-redux';
import { DeleteAction } from "@/components/Actions";

const formSchema = yup.object().shape({
  title: yup.string()
    .required("Title is required.")
    .min(15, "Title must be at least 15 characters.")
    .max(255, "Title can be up to 255 characters."),
  description: yup.string()
    .required("Description is required.")
    .min(50, "Description must be at least 50 characters!"),
  category: yup.string()
    .required("Category is required."),

});

const DashboardQuizEdit = () => {
  const router = useRouter();
  const query = router.query;
  const [imageExists, setImageExists] = useState(false);

  const auth = useSelector(authValue);
  const quizDetails = useQuery('quizDetailsForUpdate', async () => await ApiService.quizQueries.getQuizDetailById(query.quiz_id), { enabled: (auth.isReady && auth.user.isAdmin && (query?.quiz_id ? true : false)) });

  const categoryList = useQuery('getAllCategoriesForQuizCreate', async () => await ApiService.categoryQueries.getAllCategories(), { enabled: (auth.isReady && auth.user.isAdmin && (query?.quiz_id ? true : false)) });

  const { control, register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(formSchema)
  });

  const quizMutation = useMutation(async data => {
    return await ApiService.quizQueries.updateQuiz(data.id, data.data);
  });

  const imageMutation = useMutation(async (data) => {
    return await ApiService.quizQueries.addCoverImage(data.file, data.id);
  });

  const removeQuestion = useMutation(async data => await ApiService.quizQueries.removeQuestion(data.quizId, data.questionId));

  const onSubmit = async submitData => {
    if (categoryList.isSuccess && quizDetails.isSuccess) {
      const { _id: categoryId, title, slug } = categoryList?.data?.data?.data?.find(item => item._id === submitData.category);
      submitData.category = {
        categoryId,
        title,
        slug
      };
      const imageFilesLength = submitData.image.length;
      const coverImage = new FormData();
      if (imageFilesLength > 0) {
        coverImage.append('image', submitData.image[0]);
        setImageExists(true);
      }
      delete submitData.image;

      await quizMutation.mutateAsync({ id: quizDetails?.data?.data?.data?._id, data: submitData });
      if (imageFilesLength > 0) {
        await imageMutation.mutateAsync({ file: coverImage, id: quizDetails?.data?.data?.data?._id });
      }
    }
  };

  if (imageExists) {
    if (quizMutation.isSuccess && imageMutation.isSuccess) {
      router.replace('/dashboard/create-quiz');
    }
  } else if (quizMutation.isSuccess) {
    router.replace('/dashboard/create-quiz');
  }

  useEffect(() => {
    if (quizDetails.isSuccess && categoryList.isSuccess) {
      reset({
        title: quizDetails?.data?.data?.data?.title,
        category: quizDetails?.data?.data?.data?.category.categoryId,
        description: quizDetails?.data?.data?.data?.description
      });
    }

  }, [quizDetails.isSuccess, categoryList.isSuccess, quizDetails.data, reset]);

  if (quizDetails.isError) {
    router.push('/dashboard/create-quiz');
  }

  const data = React.useMemo(() => quizDetails?.data?.data?.data?.questions.map((item, index) => {
    return {
      id: index + 1,
      question: item.questionText.replace(/<\/?[^>]+(>|$)/g, ""),
      manage: {
        edit: '/edit',
        questionId: item._id,
        remove: '/'
      }
    };
  }),
    [quizDetails?.data?.data?.data?.questions]
  );

  const columns = React.useMemo(
    () => [
      {
        Header: "#",
        accessor: 'id',
        width: 10
      },
      {
        Header: 'Question',
        accessor: 'question',
      },
      {
        Header: "Manage",
        accessor: "manage",
        width: 25,
        Cell: ({ cell }) => (

          (cell.row.values.manage ?
            <HStack>
              {
                cell.row.values.manage.edit &&
                <IconButton colorScheme='purple' aria-label='Edit Content' icon={<MdOutlineModeEditOutline />}
                  onClick={() => router.push(`/dashboard/quiz/${query?.quiz_id}/questions/${cell.row.values.manage.questionId}/edit`)}
                />
              }
              {cell.row.values.manage.remove &&
                <DeleteAction onDelete={async () => {
                  await removeQuestion.mutateAsync({quizId: query.quiz_id, questionId: cell.row.values.manage.questionId});
                  quizDetails.refetch();
              }}><IconButton colorScheme='red' aria-label='Remove ' icon={<MdOutlineDeleteForever />} /></DeleteAction>}
            </HStack>
            : null)
        )
      }
    ],
    []
  );

  return (
    <StandardLayout>
      <DashboardArea showGoBackButton="true" title={"Quiz Düzenleme"} description={"Bu sayfada, oluşturmuş olduğunuz bir sınavı düzenleyebilir ve yeni soru eklemesi yapabilirsiniz."}>

        {auth?.isReady && auth?.user?.isAdmin ?
          <Tabs variant='enclosed'>

            {(quizDetails.isSuccess && quizDetails.data.data.data.questions.length < 2) && <Alert my={3} status="warning">
              <AlertIcon />
              <p>Sınavınınızın ana sayfada listelenmesi için eklenmesi gereken minimum soru adedi: <strong> 2</strong>. Eklenmiş soru adedi: {quizDetails.data.data.data.questions.length}</p>
            </Alert>}

            <TabList>
              <Tab>Quiz İçeriği</Tab>
              <Tab>Sorular & Soru Ekleme</Tab>
            </TabList>
            <TabPanels>

              {/* quiz edit tab */}
              <TabPanel px={0}>
                <Stack spacing={4}>
                  <Stack direction={{ base: "column", md: "row" }}>
                    <FormControl id={"title"} isInvalid={errors.title}>
                      <FormLabel>Quiz Title</FormLabel>
                      <Input placeholder="Enter a title" type="text" {...register("title")} />
                      <FormErrorMessage>{errors.title && errors.title.message}</FormErrorMessage>
                    </FormControl>

                    <FormControl id={"category"} isInvalid={errors.category} maxW={{ base: "100%", md: "35%" }} justifySelf="end">
                      <FormLabel>Category</FormLabel>
                      <Select placeholder='Select a category' {...register("category")}>
                        {categoryList.isSuccess && categoryList?.data?.data?.data?.map((item, index) => {
                          return <option key={index} value={item._id}>{item.title}</option>;
                        })}
                      </Select>
                      <FormErrorMessage>{errors.category && errors.category.message}</FormErrorMessage>
                    </FormControl>
                  </Stack>

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
                  </FormControl>

                  <HStack spacing={4}>
                    <FormControl id={"image"} isInvalid={errors.image}>
                      <FormLabel>Cover Image</FormLabel>
                      <Input accept="image/jpeg, image/gif, image/png" pt={1} placeholder="Upload an image." type="file" {...register("image")} />
                      <FormErrorMessage>{errors.image && errors.image.message}</FormErrorMessage>
                      {(quizDetails.isSuccess && quizDetails.data?.data?.data?.coverImage) ?
                        <Text pt={1}>Current cover image:
                          <Link pl={1} color='teal.500' href={'http://localhost:8080/' + quizDetails.data?.data?.data?.coverImage} isExternal>
                            click here to see
                          </Link>
                        </Text> : null
                      }
                    </FormControl>

                    <Box alignSelf={"stretch"}>
                      <Button type={"submit"} onClick={handleSubmit((onSubmit))} colorScheme='green' height={"100%"} px={34} leftIcon={<FiEdit />}>
                        Update
                      </Button>
                    </Box>
                  </HStack>

                </Stack>
              </TabPanel>

              {/* Add question tab */}
              <TabPanel px={0}>
                <Button my={4} isFullWidth colorScheme={"blue"} onClick={() => router.push(`/dashboard/quiz/${query?.quiz_id}/questions/add`)}>Soru Ekle</Button>
                <CustomTable mt={4} data={data ? data : []} columns={columns} sx={{
                  overflowX: "auto"
                }} />
              </TabPanel>
            </TabPanels>
          </Tabs> :
          <Alert status='warning'>
            <AlertIcon />
            <AlertDescription>Sayfa kontrol ediliyor.</AlertDescription>
          </Alert>
        }
      </DashboardArea>
    </StandardLayout>
  );
};

export default DashboardQuizEdit;
