import { NameData } from "@/../data/NameData";
import FullScreenLayout from "@/components/layouts/FullScreenLayout";
import { Badge, Box, Button, Heading, HStack, Stack, VStack, Wrap, WrapItem, FormControl, FormLabel, Input, FormErrorMessage, SimpleGrid } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from 'yup';
import { keyframes } from "@emotion/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useMutation } from "react-query";
import { ApiService } from "@/services/api.service";

const formSchema = yup.object().shape({
    gameStart: yup.string()
        .required('Game start time is required.'),
    gameEnd: yup.string()
        .required('Game end time is required.')
});


const gradient = keyframes`
    0% { background-position: 0% 50%; },
    50% {background-position: 100% 50%;},
    100% {background-position: 0% 50%;},
`;

export default function CreateGamePage() {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(formSchema)
    });
    const [gameKey, setGameKey] = useState({gameKey: 'The key will appear here', gameKeyGenerated: false})
    const router = useRouter();
    const createGameMutation = useMutation(async data => await ApiService.gameQueries.createGame(data.quizId, data.data))

    const onSubmit = async data => {
        if(router.isReady){
            await createGameMutation.mutateAsync({quizId: router.query.quiz_id, data}).then(res => setGameKey({gameKey: res.data.data.uniqueGameKey, gameKeyGenerated: true}))
        }
    };

    return (
        <FullScreenLayout backgroundColor={"gray.700"} justifyContent={"flex-start"} alignItems={"center"}>
            <VStack minHeight={"100vh"} height={"100%"} justifyContent={"center"}>
                <form>
                    <Box backgroundColor={"gray.700"} color={"white"} width={{ base: "80vw", md: "40vw" }} px={8} py={8} position={"relative"} overflow={"hidden"} rounded={"md"}>
                        <VStack direction={{ base: "column", md: "row" }}>

                            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={12}>
                                <FormControl id={"gameStart"} isInvalid={errors.gameStart}>
                                    <FormLabel htmlFor='gameStart'>Game Start Date</FormLabel>
                                    <Input variant='flushed' type='datetime-local'
                                        {...register("gameStart")} />
                                    <FormErrorMessage>{errors.gameStart && errors.gameStart.message}</FormErrorMessage>
                                </FormControl>
                                <FormControl id={"gameEnd"} isInvalid={errors.gameEnd}>
                                    <FormLabel htmlFor="gameEnd">Game End Date</FormLabel>
                                    <Input variant='flushed' type='datetime-local'
                                        {...register("gameEnd")} />
                                    <FormErrorMessage>{errors.gameEnd && errors.gameEnd.message}</FormErrorMessage>
                                </FormControl>
                            </SimpleGrid>
                        </VStack>
                        <HStack align={"center"} justify={"center"} marginTop={4} paddingY={6}>
                            <Button position={{ md: "absolute" }} type="submit" colorScheme={"orange"} rounded={"md"} marginTop={6} paddingX={6} paddingY={6} onClick={handleSubmit(onSubmit)} isDisabled={gameKey.gameKeyGenerated}>Genarate the Game Key</Button>
                        </HStack>
                    </Box>
                </form>
                <VStack height={"15vh"} minWidth={"100%"} align={"center"} justify={"center"} py={4}>
                    <Heading size={"lg"} as="h3" textColor={"white"}>Game Key</Heading>
                    <Box sx={{
                        background: "linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab)",
                        backgroundSize: "400% 400%",
                        animation: `${gradient} 3.5s ease infinite`,
                        color: "white",
                        fontWeight: 500,
                        fontSize: "1.5rem",
                        borderRadius: "md",
                    }} px={8} py={4}>{gameKey.gameKey}</Box>
                </VStack>
                <VStack>
                </VStack>
            </VStack>
        </FullScreenLayout>
    );
}