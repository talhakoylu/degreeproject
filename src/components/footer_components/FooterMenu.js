import {Button, HStack} from "@chakra-ui/react";
import FooterMenuItem from "./FooterMenuItem";

export default function FooterMenu({data}){
    return(
        <HStack spacing={8}>

            {data.map((item, index) => <FooterMenuItem data={item} key={index}/>)}

        </HStack>
    )
}