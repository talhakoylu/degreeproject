import { DeleteAction } from "@/components/Actions";
import CustomTable from "@/components/CustomTable";
import DashboardArea from "@/components/DashboardArea";
import StandardLayout from "@/components/layouts/StandardLayout";
import { ApiService } from "@/services/api.service";
import { authValue } from "@/store/slices/auth";
import { Button, HStack, IconButton, VStack } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { MdOutlineAdd, MdOutlineDeleteForever, MdOutlineModeEditOutline } from "react-icons/md";
import { useMutation, useQuery } from "react-query";
import { useSelector } from "react-redux";

export default function ManageCategoriesPage() {

    const auth = useSelector(authValue);
    const router = useRouter();
    const getCategoryListQuery = useQuery('getCategoryList', async () => {
        return await ApiService.categoryQueries.getAllCategories();
    }, { enabled: (auth?.isReady && auth?.user?.isAdmin) });

    const removeCategory = useMutation(async id => await ApiService.categoryQueries.removeCategory(id));

    const data = React.useMemo(() => getCategoryListQuery.data?.data?.data?.map((item, index) => {
        return {
            col1: item.title,
            col2: item.description.replace(/<\/?[^>]+(>|$)/g, ""),
            manage: {
                itemId: item._id,
                edit: "/edit",
                remove: "/remove"
            }
        };
    }), [getCategoryListQuery?.data?.data]
    );

    const columns = React.useMemo(
        () => [

            {
                Header: 'Category Title',
                accessor: 'col1',
                width: 45
            },
            {
                Header: "Description",
                accessor: "col2",
                width: 40
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
                                    onClick={() => router.push(`/dashboard/category/${cell.row.values.manage.itemId}/edit`)}
                                />
                            }
                            {cell.row.values.manage.remove &&
                                <DeleteAction onDelete={async () => {
                                    await removeCategory.mutateAsync(cell.row.values.manage.itemId);
                                    getCategoryListQuery.refetch();
                                }}><IconButton colorScheme='red' aria-label='Remove ' icon={<MdOutlineDeleteForever />} /></DeleteAction>}
                        </HStack>
                        : null)
                )
            }
        ],
        [router]
    );

    return (
        <StandardLayout>
            <DashboardArea title={"Kategori Yönetimi"}
                description={"Bu sayfa aracılığıyla kategori ekleyebilir, oluşturulmuş olan kategorileri düzenleyebilirsiniz."}>
                <VStack spacing={6} align={"stretch"}>
                    {(auth?.isReady && auth?.user?.isAdmin) ? (
                        <>
                            <Button alignSelf={"end"} leftIcon={<MdOutlineAdd />}
                                onClick={() => router.push("/dashboard/category/create")}>
                                Create a Category
                            </Button>
                            <CustomTable data={data ? data : []} columns={columns} />
                        </>

                    ) : null}
                </VStack>
            </DashboardArea>
        </StandardLayout>
    );
}

