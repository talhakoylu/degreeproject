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
                        <Card title={item.title} image={item.image} path={item.path} description={item.description}
                              category={item.category.title} key={index} titleLength={60} descriptionLength={150}/>
                    )
                })}
            </SimpleGrid>
        </ContainerArea>
    )
}