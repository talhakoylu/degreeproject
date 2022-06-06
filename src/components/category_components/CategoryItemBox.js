import {Box, Button, Text} from "@chakra-ui/react";
import {useRouter} from "next/router";

export default function CategoryItemBox({title, path, image}) {
    const router = useRouter();
    return (
        <Box onClick={() => router.push(path)} backgroundImage={image} backgroundRepeat={"no-repeat"}
             backgroundSize={"cover"} boxShadow={"md"} w={"100%"} height={"100%"} rounded={"md"} overflow={"hidden"}
             cursor={"pointer"}
        >
            <Box height={"100%"} width={"100%"} py={4} background={"specialColors.purpleGradientBackground.normal"}
                 display={"flex"} alignItems={"center"} justifyContent={"center"}
                 _hover={{background: "specialColors.purpleGradientBackground.hover"}}>
                <Text fontSize='xl' textAlign={"center"} fontWeight={"semibold"} p={3} color={"white"}>{title}</Text>
            </Box>
        </Box>
    )
}