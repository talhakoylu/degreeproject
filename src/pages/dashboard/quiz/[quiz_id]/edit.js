import DashboardArea from "@/components/DashboardArea";
import StandardLayout from "@/components/layouts/StandardLayout";
import CustomRichText from "@/components/RichText";
import { Box, Button, FormControl, FormErrorMessage, FormHelperText, FormLabel, HStack, Icon, IconButton, Input, Select, SimpleGrid, Stack, Tab, TabList, TabPanel, TabPanels}
from "@chakra-ui/react";
import dynamic from 'next/dynamic'
const Tabs = dynamic(import('@chakra-ui/react').then(mod => mod.Tabs), { ssr: false }) // disable ssr

import { useRouter } from "next/router";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { FiEdit } from 'react-icons/fi'
import React from "react";
import { MdOutlineDeleteForever, MdOutlineModeEditOutline } from "react-icons/md";
import CustomTable from "@/components/CustomTable";

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

})

const DashboardQuizEdit = () => {
  const router = useRouter();
  const query = router.query;
  console.log(query);
  const { control, register, handleSubmit, setValue, formState: { errors } } = useForm({
    resolver: yupResolver(formSchema),
    defaultValues: {
      title: "Example Category Title For Editing Page",
      category: 2,
      description: "<p><strong>Lorem</strong> Ipsum, dizgi ve baskı endüstrisinde kullanılan mıgır metinlerdir. Lorem Ipsum, adı bilinmeyen bir matbaacının bir hurufat numune kitabı oluşturmak üzere bir yazı galerisini alarak karıştırdığı 1500'lerden beri endüstri standardı sahte metinler olarak kullanılmıştır. Beşyüz yıl boyunca varlığını sürdürmekle kalmamış, aynı zamanda pek değişmeden elektronik dizgiye de sıçramıştır. 1960'larda Lorem Ipsum pasajları da içeren Letraset yapraklarının yayınlanması ile ve yakın zamanda Aldus PageMaker gibi Lorem Ipsum sürümleri içeren masaüstü yayıncılık yazılımları ile popüler olmuştur.</p>",
    }
  });
  const onSubmit = data => console.log(data);


  const data = React.useMemo(
    () => [
      {
        id: 1,
        question: 'Lorem ipsum dolor sit amet',
        manage: {
          edit: "/edit",
          remove: "/"
        }
      },
      {
        id: 2,
        question: 'Lorem ipsum dolor sit ametLorem ipsum dolor sit ametLorem ipsum dolor sit amet. Lorem ipsum dolor sit ametLorem ipsum dolor sit ametLorem ipsum dolor sit amet',
        manage: {
          edit: "/edit",
          remove: "/"
        }
      },
      {
        id: 3,
        question: 'Lorem ipsum dolor sit ametLorem ipsum dolor sit ametLorem ipsum dolor sit amet',
        manage: {
          edit: "/edit",
          remove: "/"
        }
      },
    ],
    []
  )

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
                  onClick={() => router.push(`/dashboard/quiz/${quiz_id}/questions/${cell.row.values.id}/edit`)}
                />
              }
              {cell.row.values.manage.remove &&
                <IconButton colorScheme='red' aria-label='Remove ' icon={<MdOutlineDeleteForever />} />}
            </HStack>
            : null)
        )
      }
    ],
    []
  )

  return (
    <StandardLayout>
      <DashboardArea showGoBackButton="true" title={"Quiz Düzenleme"} description={"Bu sayfada, oluşturmuş olduğunuz bir sınavı düzenleyebilir ve yeni soru eklemesi yapabilirsiniz."}>

        <Tabs variant='enclosed'>
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
                      <option value='1'>Category 1</option>
                      <option value='2'>Category 2</option>
                      <option value='3'>Category 3</option>
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
                  <FormControl id={"coverImage"} isInvalid={errors.coverImage}>
                    <FormLabel>Cover Image</FormLabel>
                    <Input accept="image/jpeg, image/gif, image/png" pt={1} placeholder="Upload an image." type="file" {...register("coverImage")} />
                    <FormErrorMessage>{errors.coverImage && errors.coverImage.message}</FormErrorMessage>
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
              <Button my={4} isFullWidth colorScheme={"blue"} onClick={() => router.push(`/dashboard/quiz/${quiz_id}/questions/add`)}>Soru Ekle</Button>
              <CustomTable mt={4} data={data} columns={columns} sx={{
                overflowX: "auto"
              }} />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </DashboardArea>
    </StandardLayout>
  );
};

export default DashboardQuizEdit;
