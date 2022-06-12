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

    // const [gameKey, setGameKey] = useState();
    const findGameMutation = useMutation(async (gameKey) => await ApiService.gameQueries.findGameWithKey(gameKey));

    const onSubmit = async data => {
        const lowerCaseGameKey = data.gameKey.toUpperCase();
        await findGameMutation.mutateAsync(lowerCaseGameKey);
    };

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

                        <Button type="submit" colorScheme={"orange"} onClick={handleSubmit(onSubmit)} isFullWidth>Find the Game</Button>
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
                                <Th>Last Accessible Time</Th>
                                <Th>Action</Th>
                            </Tr>
                        </Thead>
                            {findGameMutation.isSuccess && <Tbody>
                                {console.log(findGameMutation.data.data.data)}
                                {findGameMutation.data.data.data.map((item, key) => {
                                    const isQuizAccessible = (new Date(item.gameEnd).getTime() > new Date().getTime())
                                    console.log(isQuizAccessible);
                                    return (
                                        <Tr key={key}>
                                            <Td>{item.quizTitle}</Td>
                                            <Td textColor={isQuizAccessible ? 'black' : 'red'}>{new Date(item.gameEnd).toLocaleString()}</Td>
                                            <Td>
                                                <Button isDisabled={!isQuizAccessible} colorScheme={'whatsapp'}>Join</Button>
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
}

export default withAuth(JoinGamePage)