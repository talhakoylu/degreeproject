import ContainerArea from "../ContainerArea";
import Card from "../Card";
import { LastAddedQuizzesData } from "../../../data/LastAddedQuizzesData";
import { SimpleGrid, Alert, AlertIcon, AlertTitle, AlertDescription } from "@chakra-ui/react";
import { useQuery } from "react-query";
import axios from 'axios';
import { globalConstants } from "@/global_constants";

export default function LastAddedQuizzes({data}) {
    // const { isLoading, isError, data, error } = useQuery('lastAddedQuizzes', async () => {
    //     return await axios.get('http://localhost:8080/api/quiz/find-all').then(response => response.data.data);
    // });

    // if (isLoading) {
    //     return (
    //         <ContainerArea
    //             title={"En Son Eklenenler"}
    //             mb={4}
    //         >
    //             <Alert status='info'>
    //                 <AlertIcon />
    //                 Yükleniyor
    //             </Alert>
    //         </ContainerArea>
    //     );
    // }

    // if (isError) {
    //     return (
    //         <ContainerArea
    //             title={"En Son Eklenenler"}
    //             mb={4}
    //         >
    //             <Alert status='danger'>
    //                 <AlertIcon />
    //                 Veriler getirilirken bir sorun oluştu.
    //             </Alert>
    //         </ContainerArea>
    //     );
    // }

    return (
        <ContainerArea
            title={"En Son Eklenenler"}
            mb={4}
        >
            <SimpleGrid columns={{ base: 1, sm: 2, lg: 3 }} spacingX='20px' spacingY='30px'>
                {data?.map((item, index) => {
                    return (
                        <Card bodyLink title={item.title} image={item.coverImage ? globalConstants.url + "/" + item.coverImage : "/assets/images/default.png"} path={`/quiz/${item.slug}`} description={item.description}
                            category={item.category.title} key={index} titleLength={60} descriptionLength={150} boxShadow={"lg"} />
                    );
                })}
            </SimpleGrid>
        </ContainerArea>
    );
}