import { NameData } from "@/../data/NameData";
import FullScreenLayout from "@/components/layouts/FullScreenLayout";
import { Badge, Box, Button, Heading, HStack, Stack, VStack, Wrap, WrapItem } from "@chakra-ui/react";
import { keyframes } from "@emotion/react";
import { useEffect, useState } from "react";

const gradient = keyframes`
    0% { background-position: 0% 50%; },
    50% {background-position: 100% 50%;},
    100% {background-position: 0% 50%;},
`

export default function CreateGamePage() {
    const [participants, setParticipants] = useState([]);
  
      const [count, setCount] = useState(0);

    useEffect(() => {
        let counter = count;
        const interval = setInterval(() => {
        if (counter >= 300) {
            clearInterval(interval);
        } else {
            setParticipants([{
                name: NameData[Math.floor(Math.random() * 125)].Torrin
            }, ...participants])
            setCount(count => count + 1);
            counter++; // local variable that this closure will see
        }
        }, Math.floor(Math.random() * 1000 ));
        return () => clearInterval(interval); 
    }, [participants]);

    console.log(participants)

    return (
        <FullScreenLayout backgroundColor={"gray.700"} justifyContent={"flex-start"} alignItems={"center"}>
            <VStack minHeight={"100vh"} height={"100%"} justifyContent={"center"}>
                <HStack height={"15vh"} minWidth={"100%"} align={"center"} justify={"center"} py={4}>
                    <Heading size={"lg"} as="h3" textColor={"white"}>Game Key: </Heading>
                    <Box sx={{
                        background: "linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab)",
                        backgroundSize: "400% 400%",
                        animation: `${gradient} 3.5s ease infinite`,
                        color: "white",
                        fontWeight: 500,
                        fontSize: "1.5rem",
                        borderRadius: "md",
                    }} px={8} py={4}>123-Q2-22</Box>
                </HStack>
                <Box backgroundColor={"gray.700"} color={"white"} width={{ base: "80vw", md: "50vw" }} px={8} py={4} position={"relative"} overflow={"hidden"} rounded={"md"}>
                    <Stack direction={{ base: "column", md: "row" }}>
                        <Heading as="h5" size={"lg"} textColor={"white"} alignSelf={"center"}>Participants:</Heading>
                        <Button position={{ md: "absolute" }} colorScheme={"orange"} right={0} top={0} rounded={0} paddingX={10} paddingY={6} roundedBottomLeft={"md"}>Start</Button>
                    </Stack>
                    <Wrap minHeight={"30vh"} maxHeight={"60vh"} height={"100%"} overflow={"auto"} p={4} pl={0} mt={4}>
                        {participants.map((item, index) => {
                            return (<WrapItem key={index}>
                                <Badge px={4} py={2}>{item.name}</Badge>
                            </WrapItem>)
                        })}


                    </Wrap>
                </Box>
            </VStack>
        </FullScreenLayout>
    )
}