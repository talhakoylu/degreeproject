import {
    Button,
    FormControl, FormErrorMessage,
    FormLabel,
    Input,
    VStack
} from "@chakra-ui/react";
import * as yup from 'yup';
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { yupResolver } from "@hookform/resolvers/yup";
import Head from "next/head";
import FullScreenLayout from "../../components/layouts/FullScreenLayout";
import EntryBox from "../../components/EntryBox";
import { login, setTokenToStorage, useLoginService } from "@/services/auth.service";
import { authValue } from "@/store/slices/auth";
import { useSelector } from 'react-redux';
import { useEffect } from "react";

const formSchema = yup.object().shape({
    email: yup.string()
        .email("Bu email formatı geçerli bir format değildir!")
        .required("Bu alan boş bırakılamaz."),
    password: yup.string()
        .required("Password is required.")
});


const LoginPage = () => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(formSchema)
    });

    const auth = useSelector(authValue);
    const router = useRouter();

    const { loginRequest } = useLoginService();
    const onSubmit = async (data) => {
        await loginRequest(data);
        router.replace('/');
    };

    useEffect(() => {
        if (auth.isLoggedIn) {
            router.replace('/')
        }
    }, [auth.isLoggedIn, router]);

    return (
        <FullScreenLayout>
            <Head>
                <title>Login Page</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>

            <EntryBox
                title={"Giriş Yap"}
                description={"Giriş yaparak bir etkinlik başlatabilir, sonuçları inceleyebilir veya hesabını yönetebilirsin."}>
                <form>
                    <VStack spacing={2} align={"stretch"}>

                        <FormControl id={"email"} isInvalid={errors.email}>
                            <FormLabel htmlFor='email'>Email</FormLabel>
                            <Input variant='flushed' type='email'
                                placeholder={"john.doe@example.com"} {...register("email")} />
                            <FormErrorMessage>{errors.email && errors.email.message}</FormErrorMessage>
                        </FormControl>

                        <FormControl id={"password"} isInvalid={errors.password}>
                            <FormLabel>Password</FormLabel>
                            <Input variant='flushed' placeholder="************"
                                type="password" {...register("password")} />
                            <FormErrorMessage>{errors.password && errors.password.message}</FormErrorMessage>
                        </FormControl>

                        <Button alignSelf={"end"} type={"submit"} onClick={handleSubmit((onSubmit))}
                            justifySelf={"center"} colorScheme='blue' rounded={"3xl"}>
                            Login
                        </Button>
                    </VStack>
                </form>
            </EntryBox>
        </FullScreenLayout>
    );
};

export default LoginPage;