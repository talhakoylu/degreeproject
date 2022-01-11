// import {Button} from "@chakra-ui/react";
import {Button as MantineButton} from '@mantine/core';

import {Router, useRouter} from "next/router";
import {MdArrowBack} from "react-icons/md";

export default function GoBackButton({buttonLibrary, display, ...props}) {
    const router = useRouter();

    return (
        <MantineButton size={"lg"} sx={{
            fontSize: "1rem",
            display: display,
            alignItems: "center",
            justifyContent: "center"
        }} fullWidth={true} variant="gradient"
                       gradient={{from: 'gray', to: 'violet'}} onClick={() => router.back()}
                       leftIcon={<MdArrowBack size={16} {...props}/>}>Go Back</MantineButton>

        // <Button width={"100%"} display={display} colorScheme='gray' rounded={"lg"} onClick={() => router.back()}
        //         leftIcon={<MdArrowBack/>} {...props}>Go Back</Button>
    )
}