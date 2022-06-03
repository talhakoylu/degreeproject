import { Avatar, Box, Container, Divider, Heading, Stack, Text, VStack } from "@chakra-ui/react";
import NavLink from "./NavLink";
import { useRouter } from "next/router";
import {
    MdSettings,
    MdOutlineVpnKey,
    MdCheck,
    MdOutlineAdd,
    MdBuild,
    MdManageAccounts, MdAccountCircle, MdHome
} from "react-icons/md";
import { links } from "../pages/dashboard";
import GoBackButton from "./GoBackButton";
import { authValue } from "@/store/slices/auth";
import { useSelector } from 'react-redux';


export default function DashboardArea({ title, description, children, showGoBackButton = false }) {
    const router = useRouter();

    const auth = useSelector(authValue);

    return (
        <Container maxW={"container.xl"}>
            <Stack spacing={4} direction={{ base: "column", md: "row" }} align={"stretch"}>

                <VStack spacing={showGoBackButton ? 4 : 0} maxW={{ base: "100%", md: "25%" }} order={{ base: 1, md: 0 }} mt={{ base: 2, md: 0 }}>
                    <GoBackButton display={showGoBackButton ? "flex" : "none"} />
                    <Stack spacing={3} align={"center"} width={{ base: "100%", md: "auto" }}
                        backgroundColor={"white"} border={"1px"}
                        borderColor={"lightgrey"}
                        rounded={"md"} p={4}>
                        <Avatar bg='blue.100' icon={<MdManageAccounts fontSize='4.5rem' />} size={"2xl"} />
                        <Text>Name Surname </Text>

                        <NavLink href={"/dashboard"} exact={true} pathName={"Dashboard Home Page"} icon={MdHome} />
                        {links.map((item, index) => {
                            if (!item.adminOnly) {
                                return <NavLink key={index} href={item.pathUrl} exact={item.exact} pathName={item.pathName} icon={item.icon} />;
                            } else if (item.adminOnly && auth?.user?.isAdmin) {
                                return <NavLink key={index} href={item.pathUrl} exact={item.exact} pathName={item.pathName} icon={item.icon} />;
                            }
                        })}

                    </Stack>
                </VStack>



                <Box flex={1} backgroundColor={"white"} border={"1px"} borderColor={"lightgrey"} rounded={"md"} mt={4}
                    p={4}>
                    {title &&
                        <Stack spacing={2} mb={6}>
                            <Heading size={"lg"}>{title}</Heading>
                            {description && <Text>{description}</Text>}
                            <Divider borderColor={"gray.400"} py={2} />
                        </Stack>

                    }
                    {children}
                </Box>
            </Stack>
        </Container>
    );
}