import CustomTable from "@/components/CustomTable";
import DashboardArea from "@/components/DashboardArea";
import StandardLayout from "@/components/layouts/StandardLayout";
import { ApiService } from "@/services/api.service";
import { Box, HStack, IconButton, Text, VStack } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { MdRemoveRedEye } from "react-icons/md";
import { useQuery } from "react-query";

export default function GameResultDetailsPage() {
    const router = useRouter();
    const gameDetailsQuery = useQuery('getGameDetailsById', async () => await ApiService.gameQueries.getGameDetailsById(router.query.game_id).then(res => res.data), { enabled: router.isReady });

    if (gameDetailsQuery.isSuccess) {
        console.log(gameDetailsQuery.data);
    }

    const tableData = React.useMemo(() => gameDetailsQuery.data?.data?.participants?.map((item, index) => {
        return {
            col1: item.fullName,
            email: item.email,
            manage: {
                itemId: item.userId,
                details: "/details",
            }
        };
    }), [gameDetailsQuery.data?.data]
    );

    const columns = React.useMemo(
        () => [

            {
                Header: 'Full Name',
                accessor: 'col1',
                width: 45
            },
            {
                Header: `Email`,
                accessor: 'email',
                width: 45

            },
            {
                Header: "Details",
                accessor: "manage",
                width: 10,
                Cell: ({ cell }) => (
                    (cell.row.values.manage ?
                        <HStack>
                            {
                                cell.row.values.manage.details &&
                                <IconButton colorScheme='purple' aria-label='Edit Content' icon={<MdRemoveRedEye />}
                                    onClick={() => router.push(`/dashboard/game-result/${router.query.game_id}/${cell.row.values.manage.itemId}/details`)}
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
            <DashboardArea title={"Oyun Detayı"} description={"Bu sayfadan oluşturmuş olduğunuz oyuna katılan katılımcıların listesine ulaşabilirsiniz."} showGoBackButton>
                {gameDetailsQuery.isSuccess &&
                    <VStack>
                        <HStack width={"full"} justifyContent={"space-around"} px={4}>
                            <Box width={"full"}>
                                <Text fontWeight={"bold"}>Quiz Title:</Text>
                                <Text> {gameDetailsQuery.data.data.quizTitle}</Text>
                            </Box>
                            <Box width={"full"}>
                                <Text fontWeight={"bold"}>Game Key:</Text>
                                <Text>{gameDetailsQuery.data.data.uniqueGameKey}</Text>
                            </Box>
                            <Box width={"auto"} minWidth={"15%"}>
                                <Text fontWeight={"bold"}>Participant Count:</Text>
                                <Text>{gameDetailsQuery.data.data.participants.length}</Text>
                            </Box>
                        </HStack>
                        <CustomTable data={tableData ? tableData : []} columns={columns} />
                    </VStack>
                }
            </DashboardArea>
        </StandardLayout>
    );
}