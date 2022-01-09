import {useRouter} from "next/router";
import Link from 'next/link';
import {HStack, Icon, Link as CUILink, Text} from '@chakra-ui/react'

export default function NavLink({href, exact = false, icon, pathName, ...props}){
    const {pathname} = useRouter();
    const isActive = exact ? pathname === href : pathname.startsWith(href)
    return(
        <Link href={href}>
            <CUILink sx={{
                ":hover":{
                    backgroundColor: isActive ? "pink.600" : "pink.100",
                    textDecoration: "none"
                },
                backgroundColor: isActive ? "pink.500" : "transparent",
                color: isActive ? "white" : "gray.800"
            }} rounded={"3xl"} py={1} px={4} {...props}>

                <HStack spacing={2} align={"center"} justify={"center"}>
                    {icon && <Icon as={icon} />}
                    {pathName && <Text>{pathName}</Text>}
                </HStack>
            </CUILink>
        </Link>
    )
}