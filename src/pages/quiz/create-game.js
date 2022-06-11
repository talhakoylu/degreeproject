import { NameData } from "@/../data/NameData";
import FullScreenLayout from "@/components/layouts/FullScreenLayout";
import { Badge, Box, Button, Heading, HStack, Stack, VStack, Wrap, WrapItem, FormControl, FormLabel, Input, FormErrorMessage, SimpleGrid } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from 'yup';
import { keyframes } from "@emotion/react";
import { useEffect, useState } from "react";

const formSchema = yup.object().shape({
    gameStart: yup.string()
    .required('Game start time is required.')
    .test(
        'not empty',
        'Starting time can not be empty',
        function(value) {
            return !!value;
        }
    )
    .test(
        "gameStartTest",
        "Starting time must be before end time",
        function(value){
            const {gameEnd} = this.parent;
            return isSameOrBefore(value, end_time);
        }
    ),
    gameEnd: yup.string()
        .required('Game end time is required.'),
})

const isSameOrBefore = (gameStart, gameEnd) => {
    return moment(gameStart, 'HH:mm').isSameOrBefore(moment(gameEnd, 'HH:mm'));
  }

const gradient = keyframes`
    0% { background-position: 0% 50%; },
    50% {background-position: 100% 50%;},
    100% {background-position: 0% 50%;},
`

export default function CreateGamePage() {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(formSchema)
    });

    
    // const [participants, setParticipants] = useState([]);
  
    //   const [count, setCount] = useState(0);

    // useEffect(() => {
    //     let counter = count;
    //     const interval = setInterval(() => {
    //     if (counter >= 300) {
    //         clearInterval(interval);
    //     } else {
    //         setParticipants([{
    //             name: NameData[Math.floor(Math.random() * 125)].Torrin
    //         }, ...participants])
    //         setCount(count => count + 1);
    //         counter++; // local variable that this closure will see
    //     }
    //     }, Math.floor(Math.random() * 1000 ));
    //     return () => clearInterval(interval); 
    // }, [participants]);

    // console.log(participants)

    return (
        <FullScreenLayout backgroundColor={"gray.700"} justifyContent={"flex-start"} alignItems={"center"}>
            <VStack minHeight={"100vh"} height={"100%"} justifyContent={"center"}>
                
                <Box backgroundColor={"gray.700"} color={"white"} width={{ base: "80vw", md: "30vw" }} px={8} py={8} position={"relative"} overflow={"hidden"} rounded={"md"}>
                <VStack direction={{ base: "column", md: "row" }}>

                    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={12}>
                    <FormControl id={"gameStart"} isInvalid={errors.gameStart}>
                                <FormLabel htmlFor='gameStart'>Game Start Date</FormLabel>
                                <Input variant='flushed' type='date'
                                    {...register("gameStart")} />
                                <FormErrorMessage>{errors.gameStart && errors.gameStart.message}</FormErrorMessage>
                            </FormControl>
                    <FormControl id={"gameStart"} isInvalid={errors.gameStart}>
                                <FormLabel htmlFor="gameStart">Game Start Hour</FormLabel>
                                <Input variant='flushed' type='datetime-local' 
                                    {...register("gameStart")}/>
                                <FormErrorMessage>{errors.gameStart && errors.gameStart.message}</FormErrorMessage>
                            </FormControl>
                    <FormControl id={"gameEnd"} isInvalid={errors.gameEnd} >
                                <FormLabel htmlFor='gameEnd'>Game End Date</FormLabel>
                                <Input variant='flushed' type='date'
                                    {...register("gameEnd")} />
                                <FormErrorMessage>{errors.gameEnd && errors.gameEnd.message}</FormErrorMessage>
                            </FormControl> 
                            <FormControl id={"gameEnd"} isInvalid={errors.gameEnd}>
                                <FormLabel htmlFor="gameEnd">Game End Hour</FormLabel>
                                <Input variant='flushed' type='datetime-local' 
                                    {...register("gameEnd")}/>
                                <FormErrorMessage>{errors.gameEnd && errors.gameEnd.message}</FormErrorMessage>
                            </FormControl>
                    </SimpleGrid>
                    </VStack>
                    <HStack align={"center"} justify={"center"} marginTop={4} paddingY={6}>
                        <Button position={{ md: "absolute" }} colorScheme={"orange"} align={"center"} justify={"center"} rounded={"md"} marginTop={6} paddingX={10} paddingY={6}>Genarate the Game Key</Button>
                    </HStack>  
                </Box>
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
                    }} px={8} py={4}>123-Q2-22</Box>
                </VStack>
                <VStack>
                <Button position={{ md: "absolute" }} colorScheme={"orange"} align={"center"} justify={"center"} rounded={"md"} paddingX={16} paddingY={6}>Start</Button>
                </VStack>
            </VStack>
        </FullScreenLayout>
    )
}