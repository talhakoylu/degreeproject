import {Box, Heading, Stack, Text, VStack} from "@chakra-ui/react";

export default function EntryBox({title, description, children, maxW = 500, ...props}) {
    return (
        <Stack justify={"center"} align={"center"} p={2} mb={5}>
            <Box backgroundColor={"white"} p={10} rounded={"md"} width={"100%"} maxW={maxW} {...props}>
                <VStack spacing={6} align={"stretch"}>
                    {title || description ? <VStack spacing={6} align={"center"}>

                        {title && <Heading>
                            {title}
                        </Heading>
                        }

                        {description && <Text textAlign={"center"}>
                            {description}
                        </Text>
                        }
                    </VStack> : null}
                    {children}
                </VStack>
            </Box>
        </Stack>
    )
}