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
import { MdOutlineAdd, MdOutlineDeleteForever, MdOutlineModeEditOutline } from "react-icons/md";
import CustomTable from "../../components/CustomTable";
import React, { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useSelector } from "react-redux";
import { authValue } from "@/store/slices/auth";
import { useMutation, useQuery } from "react-query";
import { ApiService } from "@/services/api.service";


const CreateQuiz = () => {
    const auth = useSelector(authValue);
    const router = useRouter();
    const { data: data2, isSuccess, isError } = useQuery('createdQuizzesByUser', async () => {
        return await ApiService.quizQueries.getAllQuizzesByUserId();
    }, { enabled: (auth?.isReady && auth?.user?.isAdmin) });

    const removeQuiz = useMutation(async id => await ApiService.quizQueries.removeQuiz(id));

    const data = React.useMemo(() => data2?.data?.data?.map((item, index) => {
        return {
            col1: item.title,
            col2: item.category.title,
            questionCount: item.questions.length,
            createdAt: new Date(item.createdAt).toUTCString(),
            manage: {
                itemId: item._id,
                edit: "/edit",
                remove: "/remove"
            }
        };
    }), [data2?.data]
    );

    const columns = React.useMemo(
        () => [

            {
                Header: 'Quiz Title',
                accessor: 'col1',
                width: 35
            },
            {
                Header: "Question Count",
                accessor: "questionCount",
                width: 10
            },
            {
                Header: 'Category',
                accessor: 'col2',
                width: 20
            },
            {
                Header: "Created At",
                accessor: 'createdAt',
                width: 20
            },
            {
                Header: "Manage",
                accessor: "manage",
                width: 15,
                Cell: ({ cell }) => (
                    (cell.row.values.manage ?
                        <HStack>
                            {
                                cell.row.values.manage.edit &&
                                <IconButton colorScheme='purple' aria-label='Edit Content' icon={<MdOutlineModeEditOutline />}
                                    onClick={() => router.push(`/dashboard/quiz/${cell.row.values.manage.itemId}/edit`)}
                                />
                            }
                            {cell.row.values.manage.remove &&
                                <IconButton colorScheme='red' aria-label='Remove ' icon={<MdOutlineDeleteForever />} />}
                        </HStack>
                        : null)
                )
            }
        ],
        [router]
    );

    return (
        <StandardLayout>
            <DashboardArea title={"Quiz Oluştur"}
                description={"Bu sayfadan quiz oluşturabilir, daha önce oluşturulan quizleri görebilirsiniz."}>
                <VStack spacing={6} align={"stretch"}>
                    {(auth?.isReady && auth?.user?.isAdmin) ? (
                        <>
                            <Button alignSelf={"end"} leftIcon={<MdOutlineAdd />}
                                onClick={() => router.push("/dashboard/create-quiz/create")}>
                                Create a Quiz
                            </Button>
                            <CustomTable data={data ? data : []} columns={columns} />
                        </>

                    ) : null}
                </VStack>
            </DashboardArea>
        </StandardLayout>
    );
};

export default CreateQuiz;