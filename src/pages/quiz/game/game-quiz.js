import React, { useEffect, useState } from "react";
import FullScreenLayout from "@/components/layouts/FullScreenLayout";
import withAuth from "@/HOC/withAuth";
import { Box, Button, Circle, HStack, Text, VStack } from "@chakra-ui/react";
import { ApiService } from "@/services/api.service";
import { useMutation, useQuery } from "react-query";
import { useRouter } from "next/router";


const GameQuizPage = () => {
    const router = useRouter();
    const [gameData, setGameData] = useState();
    const [questionData, setQuestionData] = useState();
    const [currentQuestionNumber, setCurrentQuestionNumber] = useState();
    const [isQuizFinished, setIsQuizFinished] = useState(false);
    const [selectedAnswer, setSelectedAnswer] = useState('');
    const [isFinishButtonClicked, setIsFinishButtonClicked] = useState(false);

    useEffect(() => {
        // localStorage.setItem('gameData', JSON.stringify({"quizId":"62a23d25f8198e162f7a2bd7","gameId":"62a8545e54adf2fcfe3e73af","resultId":"62a8546754adf2fcfe3e73b7"}))
        setGameData(() => JSON.parse(localStorage.getItem('gameData')));
        setCurrentQuestionNumber(localStorage.getItem('currentQuestionNumber') ? localStorage.getItem('currentQuestionNumber') : 0);
    }, []);

    const getQuestionsQuery = useQuery('getQuestions', async () => await ApiService.gameQueries.getQuestions(gameData.quizId), { enabled: gameData ? true : false });
    const submitAnswerMutation = useMutation(async (data) => await ApiService.resultQueries.submitAnswer(data.resultId, data.data));

    useEffect(() => {
        console.log(currentQuestionNumber);
        if (getQuestionsQuery.isSuccess) {
            setQuestionData(getQuestionsQuery.data.data.data[currentQuestionNumber]);
            if (currentQuestionNumber > getQuestionsQuery.data.data.data.length - 1) {
                setIsQuizFinished(true);
            }
        }
    }, [getQuestionsQuery.isSuccess, currentQuestionNumber]);

    const onSubmitSave = async () => {
        const answer = questionData;
        answer.selectedAnswer = selectedAnswer === "-" ? "" : selectedAnswer;
        answer.questionId = answer._id;
        delete answer._id;
        console.log(answer);
        await submitAnswerMutation.mutateAsync({ resultId: gameData.resultId, data: answer });
    };

    useEffect(() => {
        if (submitAnswerMutation.isSuccess) {
            localStorage.setItem('currentQuestionNumber', parseInt(currentQuestionNumber) + 1);
            setCurrentQuestionNumber(localStorage.getItem("currentQuestionNumber"));
            setSelectedAnswer('');
            console.log("data", submitAnswerMutation.data);
        }
    }, [submitAnswerMutation.isSuccess]);



    const onSubmitFinish = () => {
        localStorage.removeItem('gameData');
        localStorage.removeItem('currentQuestionNumber');
        setGameData(undefined);
        setQuestionData(undefined);
        setIsFinishButtonClicked(true);
    };

    return (
        <FullScreenLayout>
            <Box marginX={"auto"} bg={"white"} rounded={"md"} minW={{ base: "full", md: 800 }} overflow={"hidden"}>
                {getQuestionsQuery.isFetching && <Text>Yükleniyor...</Text>}
                {(getQuestionsQuery.isSuccess && questionData) && <VStack spacing={6} width={"full"} px={4} py={3}>
                    <HStack spacing={0} width={"full"} justifyContent={"center"} alignItems={{ base: "start", md: "stretch" }} flexDirection={{ base: "column-reverse", md: "row" }}>
                        <Box width={"full"} fontWeight={"bold"}>Question {parseInt(currentQuestionNumber) + 1}</Box>
                        <Box minW={"15%"} height={"auto"} textAlign={"right"}>Kalan Süre: {questionData.timer}</Box>
                    </HStack>

                    <Box rounded={"md"} px={6} py={4} bg={"purple.100"} width={"full"}>
                        <div dangerouslySetInnerHTML={{ __html: questionData.questionText }}></div>
                    </Box>

                    <VStack spacing={4} align={"stretch"} width={"full"} px={4}>
                        {questionData.answer1 && <Box as={"button"} borderRadius={'lg'} borderColor={'red.200'} borderWidth={selectedAnswer === '1' ? "3px" : 0} textAlign={"left"} onClick={() => setSelectedAnswer('1')}>
                            <HStack backgroundColor={"gray.200"} px={4} py={2} rounded={"md"}>
                                <Circle bg={"gray.300"} textColor={"gray.800"} fontWeight={600} size={'40px'}>1</Circle>
                                <Text width={"90%"} textColor={"gray.700"} fontWeight={500}>{questionData.answer1}</Text>
                            </HStack>


                        </Box>}
                        {questionData.answer2 && <Box as={"button"} borderRadius={'lg'} borderColor={'red.200'} borderWidth={selectedAnswer === '2' ? "3px" : 0} textAlign={"left"} onClick={() => setSelectedAnswer('2')}>
                            <HStack backgroundColor={"gray.300"} px={4} py={2} rounded={"md"}>
                                <Circle bg={"gray.400"} textColor={"gray.800"} fontWeight={600} size={'40px'}>2</Circle>
                                <Text width={"90%"} textColor={"gray.700"} fontWeight={500}>{questionData.answer2}</Text>
                            </HStack>
                        </Box>}
                        {questionData.answer3 && <Box as={"button"} borderRadius={'lg'} borderColor={'red.200'} borderWidth={selectedAnswer === '3' ? "3px" : 0} textAlign={"left"} onClick={() => setSelectedAnswer('3')}>
                            <HStack backgroundColor={"gray.200"} px={4} py={2} rounded={"md"}>
                                <Circle bg={"gray.300"} textColor={"gray.800"} fontWeight={600} size={'40px'}>3</Circle>
                                <Text width={"90%"} textColor={"gray.700"} fontWeight={500}>{questionData.answer3}</Text>
                            </HStack>
                        </Box>}
                        {questionData.answer4 && <Box as={"button"} borderRadius={'lg'} borderColor={'red.200'} borderWidth={selectedAnswer === '4' ? "3px" : 0} textAlign={"left"} onClick={() => setSelectedAnswer('4')}>
                            <HStack backgroundColor={"gray.300"} px={4} py={2} rounded={"md"}>
                                <Circle bg={"gray.400"} textColor={"gray.800"} fontWeight={600} size={'40px'}>4</Circle>
                                <Text width={"90%"} textColor={"gray.700"} fontWeight={500}>{questionData.answer4}</Text>
                            </HStack>
                        </Box>}
                        <Box as={"button"} borderRadius={'lg'} borderColor={'red.200'} borderWidth={selectedAnswer === '-' ? "3px" : 0} textAlign={"left"} onClick={() => setSelectedAnswer('-')} backgroundColor={"yellow.400"} px={4} py={2} rounded={"md"}>
                            <Text width={"90%"} textColor={"gray.700"} fontWeight={500}>Boş geç</Text>
                        </Box>
                        <Text fontSize={"sm"} textAlign={"center"}>Sorular arası geçiş mümkün değildir.</Text>
                    </VStack>
                    <HStack pt={5} width={"full"} justifyContent={"stretch"}>
                        <Button colorScheme={"red"} mr={"auto"} onClick={onSubmitFinish}>Sınavdan Çık</Button>
                        <Button colorScheme={"green"} onClick={onSubmitSave} isLoading={submitAnswerMutation.isLoading} isDisabled={selectedAnswer === "" ? true : false}>Cevabı Kaydet</Button>
                    </HStack>
                </VStack>}

                {isQuizFinished && <VStack p={5}>
                    <Text>Sınav başarıyla tamamlandı. Sonucunuzu görmek için aşağıdaki butona basabilirsiniz.</Text>
                    <Button colorScheme={"blue"}>Sınav Sonucum</Button>
                </VStack>}

                {
                    (!gameData && isFinishButtonClicked) ?
                        <VStack>
                            <Text>Sınav başarıyla sonlandırıldı. Sonucunuzu görmek için aşağıdaki butona basabilirsiniz.</Text>
                            <Button colorScheme={"blue"}>Sınav Sonucum</Button>
                        </VStack> :
                        !gameData ?
                            <Text textAlign={"center"} p={4}>Bu sayfayı direkt giriş yaparak görüntüleyemezsiniz.</Text>
                            : null
                }

            </Box>
        </FullScreenLayout>
    );
};

export default GameQuizPage;