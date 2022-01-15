import { QuestionData } from "@/../data/QuestionData";
import ContainerArea from "@/components/ContainerArea";
import CustomButton from "@/components/CustomButton";
import StandardLayout from "@/components/layouts/StandardLayout";
import SidebarBox from "@/components/SidebarBox";
import { Box, Button, Heading, HStack, Image, SimpleGrid, Stack, Tab, TabList, TabPanel, TabPanels, Text, VStack } from "@chakra-ui/react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { VscDebugStart, VscReport } from 'react-icons/vsc'
const Tabs = dynamic(import('@chakra-ui/react').then(mod => mod.Tabs), { ssr: false }) // disable ssr


export default function QuizDetailPage() {
    const router = useRouter();
    return (
        <StandardLayout >
            <ContainerArea>
                <Stack direction={{ base: "column-reverse", md: "row" }} marginTop={8} spacing={4} align={"start"}>

                    <VStack width={{ base: "100%", md: "full" }}>
                        <Tabs variant='soft-rounded' colorScheme='purple'>
                            <VStack>
                                <Box width={"100%"} backgroundColor={"white"} rounded={"md"} border={"1px solid"} borderColor={"gray.300"} borderLeft={"5px solid"} borderLeftColor={"purple.300"} paddingX={5} paddingY={3}>

                                    <VStack align={"start"}>
                                        <Heading as='h1' size='md'>
                                            Example Quiz Title 2. This title must be long for the test of the title This title must be long for the test of the title
                                        </Heading>

                                        <Text fontSize={"sm"} textColor={"gray.500"}>
                                            Created by <strong>John Doe</strong> on <strong>14.01.2022</strong> for the <strong>Example 1</strong> category.
                                        </Text>

                                        <TabList>
                                            <Tab>Details</Tab>
                                            <Tab>Questions</Tab>
                                        </TabList>
                                    </VStack>
                                </Box>

                                <Box width={"100%"} backgroundColor={"white"} rounded={"md"} border={"1px solid"} borderColor={"gray.300"} >
                                    <TabPanels>
                                        <TabPanel sx={{
                                            "ul": {
                                                paddingLeft: "2.5rem"
                                            }
                                        }}>
                                            <p><strong>Lorem Ipsum</strong>, dizgi ve baskı endüstrisinde kullanılan mıgır metinlerdir. Lorem Ipsum, adı bilinmeyen bir matbaacının bir hurufat numune kitabı oluşturmak üzere bir yazı galerisini alarak karıştırdığı 1500'lerden beri endüstri standardı sahte metinler olarak kullanılmıştır. Beşyüz yıl boyunca varlığını sürdürmekle kalmamış, aynı zamanda pek değişmeden elektronik dizgiye de sıçramıştır.</p><p><br /></p><p> </p><blockquote>1960'larda Lorem Ipsum pasajları da içeren Letraset yapraklarının yayınlanması ile ve yakın zamanda Aldus PageMaker gibi Lorem Ipsum sürümleri içeren masaüstü yayıncılık yazılımları ile popüler olmuştur.</blockquote><p>&nbsp;</p><h2><strong><em><u>Typography</u></em></strong></h2><h5 className="ql-align-center">To manage Typography options, the theme object supports the following keys:</h5><ul><li>fonts&nbsp;(font families)</li><li>fontSizes</li><li>fontWeights</li><li>lineHeights</li><li>letterSpacings</li></ul>
                                        </TabPanel>

                                        <TabPanel>
                                            <VStack align={"stretch"}>
                                                {QuestionData.questions.map((item, index) => {
                                                    return (
                                                        <div key={index}>
                                                            <VStack align={"stretch"}>
                                                                <HStack backgroundColor={"orange.100"} px={4} py={2} rounded={"md"}>
                                                                    <Text width={"10%"} textColor={"red.800"} fontWeight={600}>Question {index + 1}</Text>
                                                                    <Text width={"90%"} textColor={"gray.700"} fontWeight={500}>{item.question}</Text>
                                                                </HStack>
                                                                {item.answer1 && <Box>
                                                                    <HStack backgroundColor={"gray.100"} mx={5} px={4} py={2} rounded={"md"}>
                                                                        <Text width={"10%"} textColor={"gray.800"} fontWeight={600}>Answer 1</Text>
                                                                        <Text width={"90%"} textColor={"gray.700"} fontWeight={500}>{item.answer1}</Text>
                                                                    </HStack>
                                                                </Box>}
                                                                {item.answer2 && <Box>
                                                                    <HStack backgroundColor={"gray.100"} mx={5} px={4} py={2} rounded={"md"}>
                                                                        <Text width={"10%"} textColor={"gray.800"} fontWeight={600}>Answer 2</Text>
                                                                        <Text width={"90%"} textColor={"gray.700"} fontWeight={500}>{item.answer2}</Text>
                                                                    </HStack>
                                                                </Box>}
                                                                {item.answer3 && <Box>
                                                                    <HStack backgroundColor={"gray.100"} mx={5} px={4} py={2} rounded={"md"}>
                                                                        <Text width={"10%"} textColor={"gray.800"} fontWeight={600}>Answer 3</Text>
                                                                        <Text width={"90%"} textColor={"gray.700"} fontWeight={500}>{item.answer3}</Text>
                                                                    </HStack>
                                                                </Box>}
                                                                {item.answer4 && <Box>
                                                                    <HStack backgroundColor={"gray.100"} mx={5} px={4} py={2} rounded={"md"}>
                                                                        <Text width={"10%"} textColor={"gray.800"} fontWeight={600}>Answer 4</Text>
                                                                        <Text width={"90%"} textColor={"gray.700"} fontWeight={500}>{item.answer4}</Text>
                                                                    </HStack>
                                                                </Box>}

                                                            </VStack>
                                                        </div>
                                                    )
                                                })}
                                            </VStack>
                                        </TabPanel>
                                    </TabPanels>
                                </Box>
                            </VStack>

                        </Tabs>
                    </VStack>

                    <VStack width={{ base: "100%", md: "25%" }} align={"flex-start"} >

                        <Image src="/assets/images/3.jpg" borderRadius={"md"} boxSize={"100%"} height={"180px"} objectFit={"cover"} alt="Quiz Cover Image" />

                        <SidebarBox title={"Bir Oyun Oluştur"} description={"Bu sınava ait sorulardan oluşan bir oyun oluşturabilirsiniz."} buttonOnClick={() => router.push("/")} buttonText={"Oyun Oluştur"} icon={<VscDebugStart />} />
                        <SidebarBox title={"Bu Sınavı Bildir"} description={"Bu sınavın içeriğinden bağımsız olduğunu, kuralları ihlal ettiğini ve sistemde bulunmaması gerektiğini düşünüyorsan bunu bize bildirebilirsin."} buttonText={"Bildir!"} buttonIconBackgroundHover={"red.500"} buttonIconBackground={"red.300"} buttonOnClick={() => router.push("/")} icon={<VscReport />} />
                    </VStack>
                </Stack>

            </ContainerArea>
        </StandardLayout>
    )
}