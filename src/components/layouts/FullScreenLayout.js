import {Box, Button, Stack} from "@chakra-ui/react";
import {MdHome} from "react-icons/md";
import {useRouter} from "next/router";

const bgImage = "/assets/images/background3.png";

export default function FullScreenLayout({backgroundImage = bgImage, showHomePageButton = true, children, ...props}){
    const router = useRouter();
    return(
        <Box minHeight={"100vh"} backgroundImage={backgroundImage} backgroundSize={"contain"}
             display={"flex"} flexDirection={"column"}  justifyContent={"center"} py={{base: 0, lg: 0}} {...props}>

            {/*Home Page Button*/}
            {showHomePageButton ? <Button position={{md: "absolute"}} top={{md: 5}} left={{md: 5}} my={{base: 5, md: 0}}
                     rounded={"3xl"} leftIcon={<MdHome fontSize={"1.5rem"}/>} onClick={() => router.push("/")}>
                Home Page
            </Button> : null}

            {children}
        </Box>
    )
}