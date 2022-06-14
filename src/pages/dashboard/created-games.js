import CustomTable from "@/components/CustomTable";
import DashboardArea from "@/components/DashboardArea";
import StandardLayout from "@/components/layouts/StandardLayout";
import { ApiService } from "@/services/api.service";
import { Alert, AlertIcon, HStack, IconButton } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { MdRemoveRedEye } from "react-icons/md";
import { useQuery } from "react-query";

export default function CreatedGamesPages() {
    const router = useRouter()
    
    const {isSuccess, isFetching, isError, data} = useQuery('getAllGamesByUser', async () => await ApiService.gameQueries.getAllGamesByUser().then(response => response.data))

    const tableData = React.useMemo(() => data?.data?.map((item, index) => {
        return {
            col1: item.quizTitle,
            gameKey: item.uniqueGameKey,
            participantCount: item.participants.length,
            startedAt: new Date(item.gameStart).toLocaleString(),
            finishedAt: new Date(item.gameEnd).toLocaleString(),
            manage: {
                itemId: item._id,
                details: "/details",
            }
        };
    }), [data?.data]
    );

    const columns = React.useMemo(
        () => [

            {
                Header: 'Quiz Title',
                accessor: 'col1',
                width: 30
            },
            {
                Header: `Game Key`,
                accessor: 'gameKey',
                width: 15

            },
            {
                Header: `Participant Count`,
                accessor: 'participantCount',
                width: 13

            },
            {
                Header: "Started At",
                accessor: 'startedAt',
                width: 15
            },
            {
                Header: "Finished At",
                accessor: 'finishedAt',
                width: 14
            },
            {
                Header: "Details",
                accessor: "manage",
                width: 8,
                Cell: ({ cell }) => (
                    (cell.row.values.manage ?
                        <HStack>
                            {
                                cell.row.values.manage.details &&
                                <IconButton colorScheme='purple' aria-label='Edit Content' icon={<MdRemoveRedEye />}
                                    onClick={() => router.push(`/dashboard/game-result/${cell.row.values.manage.itemId}/details`)}
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
            <DashboardArea title={"Oluşturulmuş Oyunlar"}
                description={"Bu sayfada oluşturmuş olduğunuz oyunları görebilir, sonuçlarını inceleyebilirsiniz."}>
                    {isSuccess && <CustomTable data={tableData ? tableData : []} columns={columns} />}
                    {isFetching && <Alert status="info"><AlertIcon /> Veriler yükleniyor.</Alert>}
                    {isError && <Alert status="error"><AlertIcon /> Bir hata meydana geldi.</Alert>}
            </DashboardArea>
        </StandardLayout>
    );
}