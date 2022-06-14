import StandardLayout from "../../components/layouts/StandardLayout";
import DashboardArea from "../../components/DashboardArea";
import CustomTable from "@/components/CustomTable";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { authValue } from "@/store/slices/auth";
import { useQuery } from "react-query";
import { ApiService } from "@/services/api.service";
import { Alert, AlertIcon, HStack, IconButton } from "@chakra-ui/react";
import { MdOutlineDeleteForever, MdOutlineModeEditOutline, MdRemoveRedEye } from "react-icons/md";
import React from "react";


const CompletedQuizzes = () => {
    const auth = useSelector(authValue);
    const router = useRouter();

    const resultQuery = useQuery('allResultsByUser', async () => await ApiService.resultQueries.getAllResultsByUser(), { enabled: (auth?.isReady) ? true : false });

    const data = React.useMemo(() => resultQuery?.data?.data?.data?.map((item, index) => {
        return {
            col1: item.quizTitle,
            result: `${item.correctCount} / ${item.answeredCount} / ${item.questionCount}`,
            solvedAt: new Date(item.createdAt).toLocaleString(),
            manage: {
                itemId: item._id,
                details: "/details",
            }
        };
    }), [resultQuery?.data?.data]
    );

    const columns = React.useMemo(
        () => [

            {
                Header: 'Quiz Title',
                accessor: 'col1',
                width: 45
            },
            {
                Header: `Correct / Total`,
                accessor: 'result',
                width: 20

            },
            {
                Header: "Solved At",
                accessor: 'solvedAt',
                width: 25
            },
            {
                Header: "Details",
                accessor: "manage",
                width: 15,
                Cell: ({ cell }) => (
                    (cell.row.values.manage ?
                        <HStack>
                            {
                                cell.row.values.manage.details &&
                                <IconButton colorScheme='purple' aria-label='Edit Content' icon={<MdRemoveRedEye />}
                                    onClick={() => router.push(`/dashboard/quiz-result/${cell.row.values.manage.itemId}/details`)}
                                />
                            }
                        </HStack>
                        : null)
                )
            }
        ],
        [router]
    );

    return (
        <StandardLayout>
            <DashboardArea title={"Tamamlanmış Sınavlar"} description={"Daha öncesinde tamamlamış olduğunuz sınavlara ait sonuçları bu sayfada inceleyebilirsiniz."}>
                {resultQuery.isSuccess && <CustomTable data={data ? data : []} columns={columns} />}
                {resultQuery.isError && <Alert status='error'>
                    <AlertIcon />
                    Veriler getirilirken bir sorun oluştu.
                </Alert>}
                {resultQuery.isLoading && <Alert status='info'>
                    <AlertIcon />
                    Veriler yükleniyor.
                </Alert>}
            </DashboardArea>
        </StandardLayout>
    );
};

export default CompletedQuizzes;