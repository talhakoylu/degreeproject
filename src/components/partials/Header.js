import {Button, Container, HStack, Input, InputGroup, Stack} from "@chakra-ui/react";
import SearchBar from "../header_components/SearchBar";
import MemberArea from "../header_components/MemberArea";

export default function Header(){
    return(
        <Container maxW='container.xl'>
            <Stack spacing={{base: 4, md: 0}} bg={"specialColors.space_cadet.500"} w='100%' my={4} py={6} px={4}
                   rounded={7} color='white'
                   boxShadow='xl'
                   flexDirection={{base: "column", md: "row"}} justify={"space-between"}
                   align={"center"}
            >

                <div>LOGO</div>

                <SearchBar/>

                <MemberArea/>
            </Stack>
        </Container>
    )
}