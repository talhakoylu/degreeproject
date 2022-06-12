import {Container, Stack, Link as ChakraLink} from "@chakra-ui/react";
import Link from 'next/link'
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

                <Link href="/" passHref>
                    <ChakraLink _hover={{
                        textDecoration: "none"
                    }}>LOGO</ChakraLink>
                </Link>

                {/* <SearchBar/> */}

                <MemberArea/>
            </Stack>
        </Container>
    )
}