import React from "react";
import FullScreenLayout from "@/components/layouts/FullScreenLayout";
import withAuth from "@/HOC/withAuth";
import { Box, HStack, Text, VStack } from "@chakra-ui/react";


const GameQuizPage = () => {

    return (
        <FullScreenLayout>
            <Box marginX={"auto"} bg={"white"} rounded={"md"} minW={{base: "full", md: 900}} minH={500} overflow={"hidden"}>
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
                                <Text width={"10%"} textColor={"gray.800"} fontWeight={600}>Answer 1</Text>
                                <Text width={"90%"} textColor={"gray.700"} fontWeight={500}>item.answer1</Text>
                            </HStack>
                        </Box>
                        <Box>
                            <HStack backgroundColor={"gray.100"} mx={5} px={4} py={2} rounded={"md"}>
                                <Text width={"10%"} textColor={"gray.800"} fontWeight={600}>Answer 2</Text>
                                <Text width={"90%"} textColor={"gray.700"} fontWeight={500}>item.answer2</Text>
                            </HStack>
                        </Box>
                        <Box>
                            <HStack backgroundColor={"gray.200"} mx={5} px={4} py={2} rounded={"md"}>
                                <Text width={"10%"} textColor={"gray.800"} fontWeight={600}>Answer 3</Text>
                                <Text width={"90%"} textColor={"gray.700"} fontWeight={500}>item.answer3</Text>
                            </HStack>
                        </Box>
                        <Box>
                            <HStack backgroundColor={"gray.100"} mx={5} px={4} py={2} rounded={"md"}>
                                <Text width={"10%"} textColor={"gray.800"} fontWeight={600}>Answer 4</Text>
                                <Text width={"90%"} textColor={"gray.700"} fontWeight={500}>item.answer4</Text>
                            </HStack>
                        </Box>

                    </VStack>
                </VStack>
            </Box>
        </FullScreenLayout>
    );
};

export default GameQuizPage;