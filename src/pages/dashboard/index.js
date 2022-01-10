import StandardLayout from "../../components/layouts/StandardLayout";
import {MdCheck, MdOutlineAdd, MdOutlineVpnKey, MdSettings} from "react-icons/md";
import ContainerArea from "../../components/ContainerArea";
import {Avatar, Box, Button, Icon, SimpleGrid} from "@chakra-ui/react";
import {useRouter} from "next/router";
import Head from "next/head";

export const links = [
    {
        pathName: "Settings",
        pathUrl: "/dashboard/user-settings",
        icon: MdSettings,
        boxColor: "cyan",
        description: "açıklama",
        exact: true
    },
    {
        pathName: "Change Password",
        pathUrl: "/dashboard/change-password",
        icon: MdOutlineVpnKey,
        boxColor: "purple",
        description: "açıklama",
        exact: true
    },
    {
        pathName: "Completed Quizzes",
        pathUrl: "/dashboard/completed-quizzes",
        icon: MdCheck,
        boxColor: "pink",
        description: "açıklama",
        exact: true
    },
    {
        pathName: "Create a Quiz",
        pathUrl: "/dashboard/create-quiz",
        icon: MdOutlineAdd,
        boxColor: "orange",
        description: "açıklama",
        exact: false
    },
]


const DashboardIndexPage = () => {
    const router = useRouter();
    return (
        <StandardLayout>
            <Head>
                <title>Dashboard Home Page</title>
            </Head>
            <ContainerArea title={"Dashboard Home Page"}>
                <SimpleGrid columns={{base:1,md:2, lg: 3}} spacing={4} flex={1} backgroundColor={"white"} border={"1px"}
                            borderColor={"lightgrey"} rounded={"md"} mt={4} p={4}>
                    {links.map((item, index) => {
                        return (
                            <Box as={Button} display={"flex"} flexDirection={"column"} colorScheme={item.boxColor}
                                 height={"auto"} key={index}
                                 onClick={() => router.push(item.pathUrl)} rounded={"md"}
                                 p={4} boxShadow={"inner"}
                            >
                                <Avatar boxShadow={"md"} bgColor={item.boxColor + ".400"} icon={<Icon as={item.icon}/>}
                                        size={"lg"} mb={2}/>
                                {item.pathName}
                                <Box backgroundColor={item.boxColor + ".600"} mt={2} p={2} rounded={"md"}
                                     boxShadow={"inner"}>{item.description}</Box>
                            </Box>

                        )
                    })}
                </SimpleGrid>
            </ContainerArea>
        </StandardLayout>
    )
}

export default DashboardIndexPage