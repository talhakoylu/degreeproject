import {Button, HStack} from "@chakra-ui/react";

export default function MemberArea(){
    return(
        <HStack spacing='12px'>
            <Button colorScheme='teal'>
                sign-up
            </Button>
            <Button colorScheme='teal' variant='outline'>
                login
            </Button>
        </HStack>
    )
}