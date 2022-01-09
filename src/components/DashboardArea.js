import {Avatar, Box, Container, Heading, Stack, Text} from "@chakra-ui/react";
import NavLink from "./NavLink";
import {useRouter} from "next/router";
import {
    MdSettings,
    MdOutlineVpnKey,
    MdCheck,
    MdOutlineAdd,
    MdBuild,
    MdManageAccounts, MdAccountCircle
} from "react-icons/md";


export default function DashboardArea({title, description, children}) {
    const router = useRouter()
    return (
        <Container maxW={"container.xl"}>
            <Stack spacing={4} direction={{base: "column", md: "row"}} align={"start"}>

                <Stack spacing={3} align={"center"} width={{base: "100%", md: "auto"}} maxW={{base: "100%", md: "25%"}}
                       backgroundColor={"white"} border={"1px"}
                       borderColor={"lightgrey"}
                       rounded={"md"} p={4}>
                    <Avatar bg='blue.100' icon={<MdManageAccounts fontSize='4.5rem'/>} size={"2xl"}/>
                    <Text>Name Surname </Text>
                    <NavLink href={"/dashboard"} exact={true} pathName={"Dashboard Home Page"} icon={MdBuild}/>
                    <NavLink href={"/dashboard/user-settings"} exact={true} pathName={"User Settings"}
                             icon={MdManageAccounts}/>
                    <NavLink href={"/dashboard/change-password"} exact={true} pathName={"Change Password"}
                             icon={MdOutlineVpnKey}/>
                    <NavLink href={"/dashboard/completed-quizzes"} exact={true} pathName={"Completed Quizzes"}
                             icon={MdCheck}/>
                    <NavLink href={"/dashboard/create-quiz"} exact={true} pathName={"Create a Quiz"}
                             icon={MdOutlineAdd}/>
                </Stack>

                <Box flex={1} backgroundColor={"white"} border={"1px"} borderColor={"lightgrey"} rounded={"md"} mt={4}
                     p={4}>
                    {title &&
                    <Stack spacing={2} mb={6}>
                        <Heading size={"lg"}>{title}</Heading>
                        {description && <Text>{description}</Text>}
                    </Stack>
                    }
                    {children}
                </Box>
            </Stack>
        </Container>
    )
}