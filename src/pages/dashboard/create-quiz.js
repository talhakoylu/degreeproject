import StandardLayout from "../../components/layouts/StandardLayout";
import DashboardArea from "../../components/DashboardArea";
import {
    Button,
    HStack,
    IconButton,
    Table,
    TableCaption,
    Tbody,
    Td,
    Tfoot,
    Th,
    Thead,
    Tr,
    VStack
} from "@chakra-ui/react";
import {MdOutlineAdd, MdOutlineDeleteForever, MdOutlineModeEditOutline} from "react-icons/md";
import CustomTable from "../../components/CustomTable";
import React from "react";
import {useRouter} from "next/router";


const CreateQuiz = () => {
    const router = useRouter();
    const data = React.useMemo(
        () => [
            {
                id: 1,
                col1: 'Lorem ipsum dolor sit ametLorem ipsum dolor sit ametLorem ipsum dolor sit amet',
                col2: 'WorldWorldWorldWorldWorld',
                manage: {
                    edit: "/edit",
                }
            },
            {
                id: 2,
                col1: 'react-table',
                col2: 'rocks',
            },
            {
                id: 215,
                col1: 'whatever',
                col2: 'you want',
                manage: {
                    edit: "/edit",
                    remove: "/remove"
                }
            },
        ],
        []
    )

    const columns = React.useMemo(
        () => [
            {
                Header: "#",
                accessor: 'id',
                width: 10
            },
            {
                Header: 'Quiz Title',
                accessor: 'col1',
                width: 45
            },
            {
                Header: 'Category',
                accessor: 'col2',
                width: 30
            },
            {
                Header: "Manage",
                accessor: "manage",
                width: 15,
                Cell: ({cell}) => (
                    (cell.row.values.manage ?
                        <HStack>
                            {cell.row.values.manage.edit && <IconButton colorScheme='purple' aria-label='Edit Content' icon={<MdOutlineModeEditOutline/>}/>}
                            {cell.row.values.manage.remove && <IconButton colorScheme='red' aria-label='Remove ' icon={<MdOutlineDeleteForever/>}/>}
                        </HStack>
                        : null)
                )
            }
        ],
        []
    )

    return (
        <StandardLayout>
            <DashboardArea title={"Quiz Oluştur"}
                           description={"Bu sayfadan quiz oluşturabilir, daha önce oluşturulan quizleri görebilirsiniz."}>
                <VStack spacing={6} align={"stretch"}>

                    <Button alignSelf={"end"} leftIcon={<MdOutlineAdd/>} onClick={()=>router.push("/dashboard/create-quiz/create")}>
                        Create a Quiz
                    </Button>

                    <CustomTable data={data} columns={columns}/>


                </VStack>
            </DashboardArea>
        </StandardLayout>
    )
}

export default CreateQuiz