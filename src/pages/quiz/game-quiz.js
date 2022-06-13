import React, { useEffect, useState } from "react";
import FullScreenLayout from "@/components/layouts/FullScreenLayout";
import withAuth from "@/HOC/withAuth";
import { Box, Circle, HStack, Text, VStack } from "@chakra-ui/react";
import { ApiService } from "@/services/api.service";
import { useQuery } from "react-query";


const GameQuizPage = () => {

    const [gameData, setGameData] = useState();

    useEffect(() => {
        setGameData(() => JSON.parse(localStorage.getItem('gameData')));
    }, []);

    const getQuestionsQuery = useQuery('getQuestions', async () => await ApiService.gameQueries.getQuestions(gameData.quizId), {enabled: gameData ? true : false})
    
    if(getQuestionsQuery.isSuccess){
        console.log(getQuestionsQuery.data.data);
    }

    return (
        <FullScreenLayout>
            <Box marginX={"auto"} bg={"white"} rounded={"md"} minW={{ base: "full", md: 800 }} overflow={"hidden"}>
                <VStack spacing={6} width={"full"} px={4} py={3}>
                    <HStack spacing={0} width={"full"} justifyContent={"center"} alignItems={{ base: "start", md: "stretch" }} flexDirection={{ base: "column-reverse", md: "row" }}>
                        <Box width={"full"} fontWeight={"bold"}>Question 1</Box>
                        <Box minW={"15%"} height={"auto"}>timer</Box>
                    </HStack>

                    <Box rounded={"md"} px={6} py={4} bg={"purple.100"} width={"full"}>
                        Question Text
                    </Box>

                    <VStack spacing={4} align={"stretch"} width={"full"}>
                        <Box>
                            <HStack backgroundColor={"gray.200"} mx={5} px={4} py={2} rounded={"md"}>
                                <Circle bg={"gray.400"} textColor={"gray.800"} fontWeight={600} size={'40px'}>1</Circle>
                                <Text width={"90%"} textColor={"gray.700"} fontWeight={500}>item.answer1</Text>
                            </HStack>
                        </Box>
                    </VStack>
                </VStack>
            </Box>
        </FullScreenLayout>
    );
};

export default GameQuizPage;