import ContainerArea from "../ContainerArea";
import {Box, HStack, IconButton, Text} from "@chakra-ui/react";
import {MdNavigateBefore, MdNavigateNext} from "react-icons/md";
import {useRef} from "react";
import {Swiper, SwiperSlide} from "swiper/react";
import CategoryItemBox from "./CategoryItemBox";
import {CategoriesData} from "../../../data/CategoriesData";

export default function Categories(){
    const prevRefCategories = useRef(null);
    const nextRefCategories = useRef(null);
    return(
        <ContainerArea
            title={"Kategoriler"}
            toolbar={
                <HStack spacing={4}>
                    <IconButton aria-label='Previous' colorScheme={"specialColors.portland_orange"}
                                fontSize={"2rem"} ref={prevRefCategories} icon={<MdNavigateBefore/>}/>
                    <IconButton aria-label='Next Slide' colorScheme={"specialColors.portland_orange"}
                                fontSize={"2rem"} ref={nextRefCategories} icon={<MdNavigateNext/>}/>
                </HStack>
            }
        >
            <Swiper
                    onInit={(swiper) => {
                        swiper.params.navigation.prevEl = prevRefCategories.current;
                        swiper.params.navigation.nextEl = nextRefCategories.current;
                        swiper.navigation.init();
                        swiper.navigation.update();
                    }}

                    breakpoints={{
                        // default
                        0: {
                            slidesPerView: 1,
                            spaceBetween: 18,
                            slidesPerColumn: 2,
                            slidesPerColumnFill: 'row',
                            slidesPerGroup: 1
                        },
                        // when window width is >= 440px
                        440: {
                            slidesPerView: 2,
                            spaceBetween: 18,
                            slidesPerColumn: 2,
                            slidesPerColumnFill: 'row',
                            slidesPerGroup: 2
                        },
                        // when window width is >= 768px
                        768: {
                            slidesPerView: 3,
                            spaceBetween: 18,
                            slidesPerColumn: 2,
                            slidesPerColumnFill: 'row',
                            slidesPerGroup: 3
                        },
                        // when window width is >= 950px
                        950: {
                            slidesPerView: 4,
                            spaceBetween: 18,
                            slidesPerColumn: 2,
                            slidesPerColumnFill: 'row',
                            slidesPerGroup: 4
                        },
                        // when window width is >= 1080px
                        1080: {
                            slidesPerView: 5,
                            spaceBetween: 18,
                            slidesPerColumn: 2,
                            slidesPerColumnFill: 'row',
                            slidesPerGroup: 5
                        }
                    }}
            >

                {CategoriesData.map((item, index)=>{
                    return(
                        <SwiperSlide key={index}>
                            <CategoryItemBox title={item.title} path={`/category/${item.path}`} image={item.image}/>
                        </SwiperSlide>
                    )
                })}

            </Swiper>
        </ContainerArea>
    )
}