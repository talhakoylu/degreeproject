import { Button, HStack, IconButton } from "@chakra-ui/react";
import { MdBuild } from "react-icons/md";
import { useRouter } from "next/router";
import { MdLogout } from 'react-icons/md';
import { authValue } from "@/store/slices/auth";
import { useSelector } from 'react-redux';
import { useLogoutService } from "@/services/auth.service";


export default function MemberArea() {
    const router = useRouter();
    const auth = useSelector(authValue);
    const { logoutRequest } = useLogoutService();
    const handleClick = async () => {
        await logoutRequest();
        if (router.pathname.startsWith('/dashboard')) {
            router.replace('/');
        }
    };

    return (
        <div>
            {
                !auth.isLoggedIn ?
                    <HStack spacing='12px'>
                        <Button colorScheme='teal' onClick={() => router.push("/dashboard/register")}>
                            sign-up
                        </Button>
                        <Button onClick={() => router.push("/dashboard/login")} colorScheme={"specialColors.portland_orange"}>
                            login
                        </Button>
                    </HStack>
                    :
                    <HStack spacing={4}>
                        <Button leftIcon={<MdBuild />} onClick={() => router.push("/dashboard")} colorScheme='pink' variant='solid'>
                            Dashboard
                        </Button>
                        <IconButton variant={"unstyled"} fontSize={24} aria-label="Log out" icon={<MdLogout />} onClick={handleClick} />
                    </HStack>
            }
        </div>
    );
}