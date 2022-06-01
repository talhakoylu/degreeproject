import '../styles/globals.css';
import { ChakraProvider, createStandaloneToast, extendTheme } from "@chakra-ui/react";
import { MantineProvider } from '@mantine/core';
import { QueryClient, QueryClientProvider } from 'react-query';
import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper.min.css';
import { useState } from 'react';
import { Provider } from 'react-redux';
import { store } from '@/store';
import { getAuthToken } from '@/services/auth.service';
import axios from 'axios';
import AuthProvider from '@/components/AuthProvider';
import { globalConstants } from '@/global_constants';
const toast = createStandaloneToast();


export const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: false,
      },
    },
  });
  
  axios.defaults.baseURL = globalConstants.api;
  
  axios.interceptors.request.use((config) => {
    const jwtToken = getAuthToken();
    if (jwtToken !== null) {
      config.headers["Authorization"] = `Bearer ${jwtToken}`;
    }
    return config;
  });
  
  axios.interceptors.response.use(
    (response) => {
        if(response?.data?.message){
            toast({
              description: response?.data?.message,
              status: 'success',
              duration: 4000,
              isClosable: true,
            });
        }
        
      return response;
    },
    function (error) {
        if(error?.response?.data?.message){
            toast({
              title: error?.response?.data?.errorName,
              description: error?.response?.data?.message,
              status: 'error',
              duration: 4000,
              isClosable: true,
            });
        }

      if (error.response.status && error.response.status === 401) {
        // window.location.replace("/login");
      }
      return Promise.reject(error);
    }
  );

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
                wOpacity06: 'rgba(31,23,80, 0.6)',
                wOpacity08: 'rgba(31,23,80, 0.8)',
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
            zomp: {
                500: '#43AA8B',
            },
            queen_blue: {
                500: '#577590',
                900: '#2E608C',
                wOpacity04: 'rgba(87,117,144, 0.4)',
                wOpacity08: 'rgba(87,117,144, 0.8)',
            },
            purpleGradientBackground: {
                normal: 'linear-gradient(0deg, rgba(50,4,253,0.7455357142857143) 0%, rgba(153,7,250,0.5) 100%)',
                hover: 'linear-gradient(0deg, rgba(36,0,195,0.7987570028011204) 0%, rgba(113,5,185,0.7763480392156863) 100%)'
            }
        }
    }
});


function MyApp({ Component, pageProps }) {
    return (
        <Provider store={store}>
        <MantineProvider
            withGlobalStyles
            withNormalizeCSS
            theme={{
                /** Put your mantine theme override here */
                colorScheme: 'light',
            }}
        >
            <ChakraProvider theme={theme}>
              <AuthProvider>
                <QueryClientProvider client={queryClient}>
                    <Component {...pageProps} />
                </QueryClientProvider>
              </AuthProvider>
            </ChakraProvider>
        </MantineProvider>
        </Provider>
    );
}

export default MyApp;
