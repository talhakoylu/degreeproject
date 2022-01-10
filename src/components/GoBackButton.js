import {Button} from "@chakra-ui/react";
import {Router, useRouter} from "next/router";
import {MdArrowBack} from "react-icons/md";

export default function GoBackButton(){
    const router = useRouter();
    return(
        <Button colorScheme='gray' rounded={"lg"} onClick={()=>router.back()} leftIcon={<MdArrowBack/>}>Go Back</Button>
    )
}