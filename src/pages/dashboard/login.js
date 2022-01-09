import {
    Box,
    Button,
    FormControl, FormErrorMessage,
    FormHelperText,
    FormLabel,
    Heading,
    Input,
    Stack,
    Text,
    VStack
} from "@chakra-ui/react";
import {MdHome} from "react-icons/md";
import * as yup from 'yup';
import {useForm} from "react-hook-form";
import {useRouter} from "next/router";
import {yupResolver} from "@hookform/resolvers/yup";
import Head from "next/head";
import FullScreenLayout from "../../components/layouts/FullScreenLayout";
import EntryBox from "../../components/EntryBox";

const formSchema = yup.object().shape({
    email: yup.string()
        .email("Bu email formatı geçerli bir format değildir!")
        .required("Bu alan boş bırakılamaz."),
    password: yup.string()
        .required("Password is required.")
        .min(6, "Password must be at least 6 characters.")
        .max(36, "Password can be up to 36 characters.")
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])/,
            "Password must contain at least 1 uppercase and lowercase letters.")
        .matches(
            /^(?=.*[0-9])/,
            "Password must contain at least 1 number.")
        .matches(
            /^(?=.*[!@_#\$%\^&\*])/,
            "Password must contain at least 1 symbol.")
})


const LoginPage = () => {
    const {register, handleSubmit, formState: {errors}} = useForm({
        resolver: yupResolver(formSchema)
    });
    const onSubmit = data => console.log(data);
    return (
        <FullScreenLayout>
            <Head>
                <title>Login Page</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
            </Head>

            <EntryBox
                title={"Giriş Yap"}
                description={"Giriş yaparak bir etkinlik başlatabilir, sonuçları inceleyebilir veya hesabını yönetebilirsin."}>
                <form>
                    <VStack spacing={2} align={"stretch"}>

                        <FormControl id={"email"} isInvalid={errors.email}>
                            <FormLabel htmlFor='email'>Email</FormLabel>
                            <Input variant='flushed' type='email'
                                   placeholder={"john.doe@example.com"} {...register("email")}/>
                            <FormErrorMessage>{errors.email && errors.email.message}</FormErrorMessage>
                        </FormControl>

                        <FormControl id={"password"} isInvalid={errors.password}>
                            <FormLabel>Password</FormLabel>
                            <Input variant='flushed' placeholder="************"
                                   type="password" {...register("password")}/>
                            <FormErrorMessage>{errors.password && errors.password.message}</FormErrorMessage>
                        </FormControl>

                        <Button alignSelf={"end"} type={"submit"} onClick={handleSubmit((onSubmit))}
                                justifySelf={"center"} colorScheme='blue' rounded={"3xl"}>
                            Submit
                        </Button>
                    </VStack>
                </form>
            </EntryBox>
        </FullScreenLayout>
    )
}

export default LoginPage