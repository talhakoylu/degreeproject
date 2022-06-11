import { QuestionData } from "@/../data/QuestionData";
import ContainerArea from "@/components/ContainerArea";
import CustomButton from "@/components/CustomButton";
import StandardLayout from "@/components/layouts/StandardLayout";
import SidebarBox from "@/components/SidebarBox";
import { Alert, AlertIcon, Box, Button, Heading, HStack, Image, SimpleGrid, Stack, Tab, TabList, TabPanel, TabPanels, Text, VStack } from "@chakra-ui/react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { VscDebugStart, VscReport } from 'react-icons/vsc';
const Tabs = dynamic(import('@chakra-ui/react').then(mod => mod.Tabs), { ssr: false }); // disable ssr
import { useQuery } from "react-query";
import axios from 'axios';
import { useEffect, useState } from 'react';

const questionItem = (item, index) => {
    return (
        <div key={index}>
            <VStack align={"stretch"}>
                <HStack backgroundColor={"orange.100"} px={4} py={2} rounded={"md"}>
                    <Text width={"10%"} textColor={"red.800"} fontWeight={600}>Question {index + 1}</Text>
                    <Text width={"90%"} as={"div"} textColor={"gray.700"} fontWeight={500}><div dangerouslySetInnerHTML={{__html: item.questionText}}></div></Text>
                </HStack>
                {item.answer1 && <Box>
                    <HStack backgroundColor={"gray.100"} mx={5} px={4} py={2} rounded={"md"}>
                        <Text width={"10%"} textColor={"gray.800"} fontWeight={600}>Answer 1</Text>
                        <Text width={"90%"} textColor={"gray.700"} fontWeight={500}>{item.answer1}</Text>
                    </HStack>
                </Box>}
                {item.answer2 && <Box>
                    <HStack backgroundColor={"gray.100"} mx={5} px={4} py={2} rounded={"md"}>
                        <Text width={"10%"} textColor={"gray.800"} fontWeight={600}>Answer 2</Text>
                        <Text width={"90%"} textColor={"gray.700"} fontWeight={500}>{item.answer2}</Text>
                    </HStack>
                </Box>}
                {item.answer3 && <Box>
                    <HStack backgroundColor={"gray.100"} mx={5} px={4} py={2} rounded={"md"}>
                        <Text width={"10%"} textColor={"gray.800"} fontWeight={600}>Answer 3</Text>
                        <Text width={"90%"} textColor={"gray.700"} fontWeight={500}>{item.answer3}</Text>
                    </HStack>
                </Box>}
                {item.answer4 && <Box>
                    <HStack backgroundColor={"gray.100"} mx={5} px={4} py={2} rounded={"md"}>
                        <Text width={"10%"} textColor={"gray.800"} fontWeight={600}>Answer 4</Text>
                        <Text width={"90%"} textColor={"gray.700"} fontWeight={500}>{item.answer4}</Text>
                    </HStack>
                </Box>}

            </VStack>
        </div>
    );
};

export default function QuizDetailPage() {
    const router = useRouter();
    const [query, setQuery] = useState();
    useEffect(() => {
        if (router.isReady) {
            setQuery(router.query);
        }

    }, [router]);

    const { isLoading, isError, data, error } = useQuery('quizDetail', async () => {
        return await axios.get('http://localhost:8080/api/quiz/get-quiz-by-slug/' + query.quiz_slug).then(response => response.data.data);
    }, { enabled: query?.quiz_slug ? true : false });

    if (isLoading) {
        return (
            <StandardLayout >
                <ContainerArea>
                    <Alert status='info'>
                        <AlertIcon />
                        Yükleniyor
                    </Alert>
                </ContainerArea>
            </StandardLayout>
        );
    }

    if (isError) {
        return (
            <StandardLayout >
                <ContainerArea>
                    <Alert status='warning'>
                        <AlertIcon />
                        Hata
                    </Alert>
                </ContainerArea>
            </StandardLayout>
        );
    }

    if (data) {
        return (
            <StandardLayout >
                <ContainerArea>
                    <Stack direction={{ base: "column-reverse", md: "row" }} marginTop={8} spacing={4} align={"start"}>

                        <VStack width={{ base: "100%", md: "full" }}>
                            <Tabs variant='soft-rounded' colorScheme='purple' sx={{ minWidth: "100%" }}>
                                <VStack>
                                    <Box width={"100%"} backgroundColor={"white"} rounded={"md"} border={"1px solid"} borderColor={"gray.300"} borderLeft={"5px solid"} borderLeftColor={"purple.300"} paddingX={5} paddingY={3}>

                                        <VStack align={"start"}>
                                            <Heading as='h1' size='md'>
                                                {data.title}
                                            </Heading>

                                            <Text fontSize={"sm"} textColor={"gray.500"}>
                                                Created by <strong>{data.createdBy.fullName}</strong> on <strong>{new Date(data.createdAt).toLocaleDateString()}</strong> for the <strong>{data.category.title}</strong> category.
                                            </Text>

                                            <TabList>
                                                <Tab>Details</Tab>
                                                <Tab>Questions</Tab>
                                            </TabList>
                                        </VStack>
                                    </Box>

                                    <Box width={"100%"} backgroundColor={"white"} rounded={"md"} border={"1px solid"} borderColor={"gray.300"} >
                                        <TabPanels>
                                            <TabPanel sx={{
                                                "ul": {
                                                    paddingLeft: "2.5rem"
                                                },
                                            }}>
                                                <div dangerouslySetInnerHTML={{ __html: data.description }}></div>
                                            </TabPanel>

                                            <TabPanel>
                                                <VStack align={"stretch"}>
                                                    {data.questions.map(questionItem)}
                                                </VStack>
                                            </TabPanel>
                                        </TabPanels>
                                    </Box>
                                </VStack>

                            </Tabs>
                        </VStack>

                        <VStack width={{ base: "100%", md: "25%" }} align={"flex-start"} >

                            <Image src={`http://localhost:8080/${data.coverImage}`} borderRadius={"md"} boxSize={"100%"} height={"180px"} objectFit={"fill"} alt="Quiz Cover Image" />

                            <SidebarBox title={"Bir Oyun Oluştur"} description={"Bu sınava ait sorulardan oluşan bir oyun oluşturabilirsiniz."} buttonOnClick={() => router.push("/")} buttonText={"Oyun Oluştur"} icon={<VscDebugStart />} />
                            <SidebarBox title={"Bu Sınavı Bildir"} description={"Bu sınavın içeriğinden bağımsız olduğunu, kuralları ihlal ettiğini ve sistemde bulunmaması gerektiğini düşünüyorsan bunu bize bildirebilirsin."} buttonText={"Bildir!"} buttonIconBackgroundHover={"red.500"} buttonIconBackground={"red.300"} buttonOnClick={() => router.push("/")} icon={<VscReport />} />
                        </VStack>
                    </Stack>

                </ContainerArea>
            </StandardLayout>
        );
    } else {
        return null;
    }
}