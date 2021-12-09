import {Box, Button, Container, HStack, Input, InputGroup, Stack, Text} from "@chakra-ui/react";
import Header from "../partials/Header";
import Footer from "../partials/Footer";

export default function StandartLayout({children}) {
    return (
        <>
            <Header/>

                {children}

            <Footer/>
        </>
    )
}