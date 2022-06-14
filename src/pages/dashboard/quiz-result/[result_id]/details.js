import DashboardArea from "@/components/DashboardArea";
import StandardLayout from "@/components/layouts/StandardLayout";
import { ApiService } from "@/services/api.service";
import { Alert, AlertIcon, Box, Circle, HStack, Text, VStack } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";

const questionItem = (item, index) => {
    return (
        <VStack align={"stretch"} width={"full"} key={index}>
            <HStack backgroundColor={item.isGivenAnswerCorrect ? "green.200" : "red.200"} px={4} py={2} rounded={"md"}>
                <Text width={"10%"} textColor={"gray.800"} fontWeight={600}>Question {index + 1}</Text>
                <Text width={"90%"} as={"div"} textColor={"gray.700"} fontWeight={500}><div dangerouslySetInnerHTML={{ __html: item.questionText }}></div></Text>
            </HStack>
            {item.answer1 && <Box>
                <HStack backgroundColor={item.selectedAnswer === '1' ? 'purple.100' : "gray.100"} mx={5} px={4} py={2} rounded={"md"} >
                    <Circle bg={item.correctAnswer === '1' ? "orange" : "gray.400"} textColor={"gray.800"} fontWeight={600} size={'40px'}>1</Circle>
                    <Text width={"90%"} textColor={"gray.700"} fontWeight={500}>{item.answer1}</Text>
                </HStack>
            </Box>}
            {item.answer2 && <Box>
                <HStack backgroundColor={item.selectedAnswer === '2' ? 'purple.100' : "gray.100"} mx={5} px={4} py={2} rounded={"md"} >
                    <Circle bg={item.correctAnswer === '2' ? "orange" : "gray.400"} textColor={"gray.800"} fontWeight={600} size={'40px'}>2</Circle>
                    <Text width={"90%"} textColor={"gray.700"} fontWeight={500}>{item.answer2}</Text>
                </HStack>
            </Box>}
            {item.answer3 && <Box>
                <HStack backgroundColor={item.selectedAnswer === '3' ? 'purple.100' : "gray.100"} mx={5} px={4} py={2} rounded={"md"} >
                    <Circle bg={item.correctAnswer === '3' ? "orange" : "gray.400"} textColor={"gray.800"} fontWeight={600} size={'40px'}>3</Circle>
                    <Text width={"90%"} textColor={"gray.700"} fontWeight={500}>{item.answer3}</Text>
                </HStack>
            </Box>}
            {item.answer4 && <Box>
                <HStack backgroundColor={item.selectedAnswer === '4' ? 'purple.100' : "gray.100"} mx={5} px={4} py={2} rounded={"md"} >
                    <Circle bg={item.correctAnswer === '4' ? "orange" : "gray.400"} textColor={"gray.800"} fontWeight={600} size={'40px'}>4</Circle>
                    <Text width={"90%"} textColor={"gray.700"} fontWeight={500}>{item.answer4}</Text>
                </HStack>
            </Box>}

        </VStack>
    );
};

export default function QuizResultDetailsPage() {
    const router = useRouter();

    const resultQuery = useQuery('getQuizResultByIdBelongsUser', async () => ApiService.resultQueries.getQuizResultByIdBelongsUser(router.query.result_id), { enabled: router.isReady });

    const [result, setResult] = useState();

    useEffect(() => {
        if (resultQuery.isSuccess) {
            setResult(resultQuery.data.data.data);
        }
    }, [resultQuery.isSuccess]);


    return (
        <StandardLayout>
            <DashboardArea title={resultQuery.isSuccess ? `${result?.quizTitle} Sınavına Ait Detaylar` : "Sınav Detayları"} description={"Çözmüş olduğunuz sınava ait detayları bu sayfada görebilirsiniz."} showGoBackButton>
                {resultQuery.isSuccess &&
                    <VStack spacing={6}>
                        <Alert status='info' variant='left-accent'>
                            <AlertIcon />
                            <VStack alignItems={"flex-start"}>
                                <Text>Bu sınav süresinde <strong>{result?.questionCount}</strong> sorudan <strong>{result?.answers?.length}</strong> adet soru cevapladınız ve bunlardan <strong>{result?.answers?.filter(item => item.isGivenAnswerCorrect === true).length}</strong> adedi doğru.</Text>
                                <Text>Doğru cevaplamış olduğunuz sorular <strong>yeşil</strong>, yanlışlar ise <strong>kırmızı</strong> bir arka plan rengine sahiptir. Seçmiş olduğunuz şıklar ise <strong>mor arka plan</strong> ile çevrelenmiştir. Sorulara ait doğru cevap şıklarda <strong>turuncu</strong> renkli bir yuvarlak içindedir. Boş cevaplarınız da yanlış olarak kabul edilmiştir.</Text>
                            </VStack>
                        </Alert>
                        {result?.answers?.map((item, index) => questionItem(item, index))}
                    </VStack>
                }
                {resultQuery.isFetching &&
                    <Alert status={"info"}>
                        <AlertIcon /> Veriler yükleniyor.
                    </Alert>
                }
            </DashboardArea>
        </StandardLayout>
    );
}