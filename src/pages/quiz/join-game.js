import FullScreenLayout from "@/components/layouts/FullScreenLayout";
import { Box, Button, FormControl, FormErrorMessage, Heading, Input, VStack } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from 'yup';
import { keyframes } from '@emotion/react';

const formSchema = yup.object().shape({
    gameKey: yup.string()
        .required("The game key is requried."),
    email: yup.string()
        .email("This is not a valid format for email!")
        .required("The email is required."),
})

export default function JoinGamePage() {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(formSchema)
    });
    const onSubmit = data => console.log(data);

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

                        <FormControl id={"email"} isInvalid={errors.email}>
                            <Input type="email" size={"lg"} placeholder="Enter your email" {...register("email")}></Input>
                            <FormErrorMessage>{errors.email && errors.email.message}</FormErrorMessage>
                        </FormControl>

                        <Button type="submit" colorScheme={"orange"} onClick={handleSubmit(onSubmit)} isFullWidth>Join</Button>
                    </VStack>
                </form>

            </Box>
        </FullScreenLayout >
    )
}