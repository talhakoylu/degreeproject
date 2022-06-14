import FullScreenLayout from "@/components/layouts/FullScreenLayout";
import { Box, Button, FormControl, FormErrorMessage, Heading, Input, Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr, VStack } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from 'yup';
import { keyframes } from '@emotion/react';
import { useMutation, useQuery } from "react-query";
import { ApiService } from "@/services/api.service";
import { useState } from "react";
import withAuth from "@/HOC/withAuth";
import { useRouter } from "next/router";

const formSchema = yup.object().shape({
    gameKey: yup.string()
        .required("The game key is requried.")
        .min(8, 'Game Key must be 8 characters.')
        .max(8, 'Game Key must be 8 characters.')
});

const JoinGamePage = () => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(formSchema)
    });
    const [gameData, setGameData] = useState();
    const router = useRouter();

    const findGameMutation = useMutation(async (gameKey) => await ApiService.gameQueries.findGameWithKey(gameKey));
    const joinToTheGameMutation = useMutation(async (data) => await ApiService.gameQueries.joinGame(data.quizId, data.gameId));

    const onSubmitFindButton = async data => {
        const upperCaseGameKey = data.gameKey.toUpperCase();
        await findGameMutation.mutateAsync(upperCaseGameKey);
    };

    const onSubmitJoinButton = async data => {
        await joinToTheGameMutation.mutateAsync({ quizId: data.quizId, gameId: data._id });
    };

    if (joinToTheGameMutation.isSuccess) {
        const data = joinToTheGameMutation.data.data.data;
        localStorage.setItem('gameData', JSON.stringify({
            quizId: data.gameResult.quizId,
            gameId: data.gameResult.gameId,
            resultId: data.gameResult._id,
        }));

        router.push('/quiz/game/game-quiz')
    }

    return (
        <FullScreenLayout alignItems={"center"}>
            <Heading textColor={"white"} size={"lg"}>Join a Game</Heading>

            <Box backgroundColor={"white"} py={3} px={4} rounded={"md"}>
                <form>
                    <VStack>
                        <FormControl id={"gameKey"} isInvalid={errors.gameKey}>
                            <Input type="text" size={"lg"} placeholder="Enter the game key" {...register("gameKey")}></Input>
                            <FormErrorMessage>{errors.gameKey && errors.gameKey.message}</FormErrorMessage>
                        </FormControl>

                        <Button type="submit" colorScheme={"orange"} onClick={handleSubmit(onSubmitFindButton)} isFullWidth>Find the Game</Button>
                    </VStack>
                </form>
            </Box>


            <Heading textColor={"white"} mt={4} size={"lg"}>Result</Heading>

            <Box backgroundColor={"white"} py={3} px={4} rounded={"md"} maxWidth={{ base: "90%", md: "60%" }}>
                <TableContainer>
                    <Table variant='simple'>
                        {(findGameMutation.isError && findGameMutation.error.response.status === 404) && <TableCaption color={'red'} mb={4}>No game found with this key.</TableCaption>}
                        <><Thead>
                            <Tr>
                                <Th>Quiz Title</Th>
                                <Th>Start Date</Th>
                                <Th>Last Accessible Date</Th>
                                <Th>Action</Th>
                            </Tr>
                        </Thead>
                            {findGameMutation.isSuccess && <Tbody>
                                {findGameMutation.data.data.data.map((item, key) => {
                                    const isQuizAccessibleForLast = (new Date(item.gameEnd).getTime() > new Date().getTime());
                                    const isQuizAccessibleForBegin = (new Date(item.gameStart).getTime() < new Date().getTime());
                                    return (
                                        <Tr key={key}>
                                            <Td>{item.quizTitle}</Td>
                                            <Td textColor={isQuizAccessibleForBegin ? 'black' : 'red'}>{new Date(item.gameStart).toLocaleString()}</Td>
                                            <Td textColor={isQuizAccessibleForLast ? 'black' : 'red'}>{new Date(item.gameEnd).toLocaleString()}</Td>
                                            <Td>
                                                <Button isDisabled={(!isQuizAccessibleForBegin || !isQuizAccessibleForLast) } onClick={() => onSubmitJoinButton(item)} isLoading={joinToTheGameMutation.isLoading} colorScheme={'whatsapp'}>Join</Button>
                                            </Td>
                                        </Tr>
                                    );
                                })}

                            </Tbody>}
                        </>
                    </Table>
                </TableContainer>
            </Box>

        </FullScreenLayout >
    );
};

export default withAuth(JoinGamePage);