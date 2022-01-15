import { Box, Button, Image, Link, Text, VStack } from "@chakra-ui/react";
import NextLink from "next/link";
import { useRouter } from "next/router";

export default function Card({ title, description, image, path, minHeight = 400, category, titleLength = 75, descriptionLength = 200, boxShadow = "md", bodyLink = false, ...props }) {
    const router = useRouter();
    let titleCount = titleLength;
    let cardTitle = title.slice(0, titleCount) + (title.length > titleCount ? "..." : "");
    let descriptionCount = descriptionLength;
    let cardDescription = description.slice(0, descriptionCount) + (description.length > descriptionCount ? "..." : "");
    if (bodyLink === true) {
        return (
            <NextLink href={path} passHref>
                <Link _hover={{ textDecoration: "none" }}>
                    <Box bg={"white"} boxShadow={boxShadow} minHeight={minHeight} height={"100%"} w={"100%"}
                        rounded={"md"} overflow={"hidden"} position={"relative"} display={"flex"} flexDirection={"column"}>

                        {image && <Image src={image} width={"full"} height={200}
                            objectFit={"cover"}></Image>}

                        {category &&
                            <Box position={"absolute"} top={2} left={2} rounded={"md"} color={"white"}
                                backgroundColor={"rgba(17,17,17, 0.7)"} py={1} px={2}>{category}</Box>
                        }

                        <VStack my={3} px={4} spacing={4} flex={1}>
                            <VStack spacing={2} align={"start"} flex={1}>
                                <Text fontSize='2xl' fontWeight={"semibold"} lineHeight={"1.6rem"}>{cardTitle}</Text>

                                <Text textAlign={"justify"}>{cardDescription}</Text>
                            </VStack>

                            {path && <Button width={"full"} onClick={() => router.push(path)}>Teste Git</Button>}
                        </VStack>
                    </Box>
                </Link>
            </NextLink>
        )
    } else {
        return (
            <Box bg={"white"} boxShadow={boxShadow} minHeight={minHeight} height={"100%"} w={"100%"}
                rounded={"md"} overflow={"hidden"} position={"relative"} display={"flex"} flexDirection={"column"}>

                {image && <Image src={image} width={"full"} height={200}
                    objectFit={"cover"}></Image>}

                {category &&
                    <Box position={"absolute"} top={2} left={2} rounded={"md"} color={"white"}
                        backgroundColor={"rgba(17,17,17, 0.7)"} py={1} px={2}>{category}</Box>
                }

                <VStack my={3} px={4} spacing={4} flex={1}>
                    <VStack spacing={2} align={"start"} flex={1}>
                        <Text fontSize='2xl' fontWeight={"semibold"} lineHeight={"1.6rem"}>{cardTitle}</Text>

                        <Text textAlign={"justify"}>{cardDescription}</Text>
                    </VStack>

                    {path && <Button width={"full"} onClick={() => router.push(path)}>Teste Git</Button>}
                </VStack>
            </Box>
        )
    }
}