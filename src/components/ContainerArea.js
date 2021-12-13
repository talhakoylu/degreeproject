import {Box, Button, Container, HStack, IconButton, Image, Text, VStack} from "@chakra-ui/react";

export default function ContainerArea({
                                          title,
                                          toolbar,
                                          children,
                                          borderColor = "specialColors.portland_orange.500",
                                          ...props
                                      }) {
    return (
        <>
            <Container maxW={"container.xl"}>
                {title && (
                    <HStack justify={"space-between"} align={"center"} {...props}>
                        <Box borderLeft={"4px"} borderColor={borderColor} paddingLeft={2}>
                            <Text fontSize='2xl' fontWeight={"semibold"}>{title}</Text>
                        </Box>

                        {toolbar ? <div>{toolbar}</div> : null}
                    </HStack>
                )}

                {children}

            </Container>
        </>
    )
}