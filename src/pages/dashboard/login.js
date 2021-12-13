import {Box, Button} from "@chakra-ui/react";
import {MdArrowBack} from "react-icons/md";

const LoginPage = () => {
    return (
        <Box minHeight={"100vh"} display={"flex"} position={"relative"} flexDir={"column"}
             backgroundImage={"/assets/images/background3.png"} backgroundSize={"contain"}
             alignItems={"center"} justifyContent={"center"}>
            <Button backgroundColor={"white"} rounded={"3xl"} px={6} top={5} left={5} position={"absolute"}
                    leftIcon={<MdArrowBack fontSize={"1.5rem"}/>}>
                Return to Back
            </Button>
            <Box p={4} minHeight={800} backgroundColor={"white"}>
                xd
            </Box>
        </Box>
    )
}

export default LoginPage