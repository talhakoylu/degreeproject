import {Button, Container, HStack, Text} from "@chakra-ui/react";
import FooterMenu from "../footer_components/FooterMenu";

const menuLinks = [
    {
        path: "/about-us",
        title: "About Us"
    },
    {
        path: "/contact-us",
        title: "Contact Us"
    }
]

export default function Footer(){
    return(
        <Container maxW={"container.xl"} my={8}>
            <HStack justify={"space-between"} color={"gray.500"}>
                <Text>Tüm Hakları Saklıdır.</Text>
                <FooterMenu data={menuLinks} />
            </HStack>
        </Container>
    )
}