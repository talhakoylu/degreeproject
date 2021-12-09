import '../styles/globals.css'
import {ChakraProvider, extendTheme} from "@chakra-ui/react";

import 'swiper/swiper-bundle.min.css'
import 'swiper/swiper.min.css'

const theme = extendTheme({
    colors: {
        specialColors: {
            crimson: '#D7263D',
            portland_orange: {
                100: '#F68262',
                200: '#F67754',
                300: '#F5704B',
                400: '#F56A43',
                500: '#F46036',
                600: '#F35427',
                700: '#F34F20',
                800: '#F54817',
                900: '#F23500',
            },
            space_cadet: {
                500: '#2E294E',
                900: '#1F1750',
            },
            persian_green: {
                500: '#1B998B',
                600: '#118C7D',
            },
            june_bud: '#C5D86D',
            red_salsa: '#F94144',
            orange_red: '#F3722C',
            yellow_orange_color_wheel: '#F8961E',
            maize_crayola: '#F9C74F',
            pistachio: '#90BE6D',
            zomp: '#43AA8B',
            queen_blue: {
                500: '#577590',
                900: '#2E608C',
                wOpacity04: 'rgba(87,117,144, 0.4)'
            },
        }
    }
});

function MyApp({Component, pageProps}) {
    return (
        <ChakraProvider theme={theme}>
            <Component {...pageProps} />
        </ChakraProvider>
    )
}

export default MyApp
