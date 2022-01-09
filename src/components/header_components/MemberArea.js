import {Button, HStack} from "@chakra-ui/react";
import {MdBuild} from "react-icons/md";
import {useRouter} from "next/router";

export default function MemberArea() {
    const router = useRouter();
    const value = false
    return (
        <div>
            {
                value ?
                    <HStack spacing='12px'>
                        <Button colorScheme='teal' onClick={() => router.push("/dashboard/register")}>
                            sign-up
                        </Button>
                        <Button onClick={()=>router.push("/dashboard/login")} colorScheme={"specialColors.portland_orange"}>
                            login
                        </Button>
                    </HStack>
                    :
                    <Button leftIcon={<MdBuild/>} onClick={()=>router.push("/dashboard")} colorScheme='pink' variant='solid'>
                        Dashboard
                    </Button>
            }
        </div>
    )
}