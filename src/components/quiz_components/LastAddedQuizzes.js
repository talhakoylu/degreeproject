import ContainerArea from "../ContainerArea";
import Card from "../Card";
import {LastAddedQuizzesData} from "../../../data/LastAddedQuizzesData";
import {SimpleGrid} from "@chakra-ui/react";

export default function LastAddedQuizzes() {
    return (
        <ContainerArea
            title={"En Son Eklenenler"}
            mb={4}
        >
            <SimpleGrid columns={{base: 1, sm: 2, lg: 3}} spacingX='20px' spacingY='30px'>
                {LastAddedQuizzesData.map((item, index) => {
                    return (
                        <Card bodyLink title={item.title} image={item.image} path={`/quiz/${item.id}/${item.path}`} description={item.description}
                              category={item.category.title} key={index} titleLength={60} descriptionLength={150} boxShadow={"lg"}/>
                    )
                })}
            </SimpleGrid>
        </ContainerArea>
    )
}