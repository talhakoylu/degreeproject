import {Box, Button, HStack, IconButton, Image, Text, VStack} from "@chakra-ui/react";
import {MdNavigateBefore, MdNavigateNext} from "react-icons/md";
import ContainerArea from "../ContainerArea";
import {useRef} from "react";
import {Swiper, SwiperSlide} from "swiper/react";
import {QuizzesData} from "../../../data/QuizzesData";
import Card from "../Card";
import SwiperCore, {Navigation, Pagination} from "swiper";

SwiperCore.use([Pagination, Navigation]);


export default function PickedQuizzesForYou() {
    const prevRefBoard = useRef(null);
    const nextRefBoard = useRef(null);
    return (
        <ContainerArea
            title={"Sizin İçin Seçtiklerimiz"}
            toolbar={
                <HStack spacing={4}>
                    <IconButton aria-label='Previous Slide' colorScheme={"specialColors.portland_orange"}
                                fontSize={"2rem"} ref={prevRefBoard} icon={<MdNavigateBefore/>}/>

                    <IconButton aria-label='Previous Slide' colorScheme={"specialColors.portland_orange"}
                                fontSize={"2rem"} ref={nextRefBoard} icon={<MdNavigateNext/>}/>
                </HStack>
            }
            mt={3}
        >
            <Swiper slidesPerView={2} spaceBetween={36}
                    onInit={(swiper) => {
                        swiper.params.navigation.prevEl = prevRefBoard.current;
                        swiper.params.navigation.nextEl = nextRefBoard.current;
                        swiper.navigation.init();
                        swiper.navigation.update();
                    }}

                    breakpoints={{
                        // default
                        0: {
                            slidesPerView: 1,
                            spaceBetween: 20
                        },
                        // when window width is >= 768px
                        768: {
                            slidesPerView: 2,
                            spaceBetween: 36
                        }
                    }}
            >
                {QuizzesData.map((item, index) => {
                    return (
                        <SwiperSlide key={index}>
                            <Card bodyLink title={item.title} description={item.description} image={item.image} path={`/quiz/${item.id}/${item.path}`} category={item.category.title}/>
                        </SwiperSlide>
                    )
                })}
            </Swiper>
        </ContainerArea>
    )
}