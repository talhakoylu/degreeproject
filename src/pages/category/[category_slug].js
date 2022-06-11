import ContainerArea from "@/components/ContainerArea";
import LastAddedQuizzes from "@/components/quiz_components/LastAddedQuizzes";
import { ApiService } from "@/services/api.service";
import { Alert, AlertIcon } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import StandardLayout from "../../components/layouts/StandardLayout";

const CategorySlug = () => {
    const router = useRouter();
    const { category_slug } = router.query;
    const quizzes = useQuery('getQuizzesByCategorySlug', async () => await ApiService.quizQueries.getAllQuizzesByCategorySlug(category_slug), { enabled: router.isReady });

    if (quizzes.isError) {
        return (
            <StandardLayout>
                <ContainerArea>
                    <Alert status='warning'>
                        <AlertIcon />
                        {quizzes.error.response.status === 404 ? <p>Bu kategoriye ait henüz eklenmiş bir sınav kaydı bulunmuyor.</p> : <p>Bir hata oluştu</p>}
                    </Alert>
                </ContainerArea>
            </StandardLayout>
        );
    }

    if (quizzes.isFetching) {
        return (
            <StandardLayout>
                <ContainerArea>
                    <Alert status='info'>
                        <AlertIcon />
                        Yükleniyor
                    </Alert>
                </ContainerArea>
            </StandardLayout>
        );
    }

    return (
        <StandardLayout>
            {quizzes.isSuccess && <LastAddedQuizzes data={quizzes.data.data.data} />}
        </StandardLayout>
    );
};

export default CategorySlug;