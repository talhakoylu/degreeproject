import StandardLayout from "../../components/layouts/StandardLayout";
import DashboardArea from "../../components/DashboardArea";
import {Button, Table, TableCaption, Tbody, Td, Tfoot, Th, Thead, Tr, VStack} from "@chakra-ui/react";
import {MdOutlineAdd} from "react-icons/md";


const CreateQuiz = ()=>{
    return(
        <StandardLayout>
            <DashboardArea title={"Quiz Oluştur"} description={"Bu sayfadan quiz oluşturabilir, daha önce oluşturulan quizleri görebilirsiniz."}>
                <VStack spacing={6} align={"stretch"}>

                    <Button alignSelf={"end"} leftIcon={<MdOutlineAdd/>}>
                        Create a Quiz
                    </Button>

                    <Table variant='striped' colorScheme='teal'>
                        <TableCaption>Imperial to metric conversion factors</TableCaption>
                        <Thead>
                            <Tr>
                                <Th>To convert</Th>
                                <Th>into</Th>
                                <Th isNumeric>multiply by</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            <Tr>
                                <Td>inches</Td>
                                <Td>millimetres (mm)</Td>
                                <Td isNumeric>25.4</Td>
                            </Tr>
                            <Tr>
                                <Td>feet</Td>
                                <Td>centimetres (cm)</Td>
                                <Td isNumeric>30.48</Td>
                            </Tr>
                            <Tr>
                                <Td>yards</Td>
                                <Td>metres (m)</Td>
                                <Td isNumeric>0.91444</Td>
                            </Tr>
                        </Tbody>
                        <Tfoot>
                            <Tr>
                                <Th>To convert</Th>
                                <Th>into</Th>
                                <Th isNumeric>multiply by</Th>
                            </Tr>
                        </Tfoot>
                    </Table>
                </VStack>
            </DashboardArea>
        </StandardLayout>
    )
}

export default CreateQuiz