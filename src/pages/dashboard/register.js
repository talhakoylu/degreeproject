import FullScreenLayout from "../../components/layouts/FullScreenLayout";
import EntryBox from "../../components/EntryBox";
import {
    Button, Checkbox,
    FormControl,
    FormErrorMessage,
    FormHelperText,
    FormLabel,
    Input, Link, ListItem,
    SimpleGrid, Stack, Text, UnorderedList,
    VStack
} from "@chakra-ui/react";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import {Link as NextLink} from "next/link";
import Head from "next/head";

const formSchema = yup.object().shape({
    name: yup.string()
        .required("First name is required."),
    surname: yup.string()
        .required("Last name is required."),
    email: yup.string()
        .required("Email is required.")
        .email("Invalid email format."),
    birthDate: yup.string()
        .required('Birthday is required.')
        .matches(/^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/, 'Birthday must be a valid date in the format YYYY-MM-DD'),
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
            "Password must contain at least 1 symbol."),
    confirmPassword: yup.string()
        .required("Confirm password is required.")
        .oneOf([yup.ref('password')], "Password must match."),
    termsAndConditions: yup.bool()
        .oneOf([true], "Terms, Conditions and Privacy Policy must be accepted.")
})

export default function RegisterPage(){
    const {register, handleSubmit, formState: {errors}} = useForm({
        resolver: yupResolver(formSchema)
    });
    const onSubmit = data => console.log(data);
    return(
        <FullScreenLayout>
            <Head>
                <title>Sign Up Page</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
            </Head>
            <EntryBox title={"Kayıt Ol"} description={"Etkinlik oluşturmak, sonuçları incelemek ve daha fazlası için hesap oluştur."} maxW={800}>
                <form>
                    <VStack spacing={2} align={"stretch"}>

                        <SimpleGrid columns={{base: 1, md: 2}} spacing={6}>

                            <FormControl id={"name"} isInvalid={errors.name}>
                                <FormLabel htmlFor='name'>Name</FormLabel>
                                <Input variant='flushed' type='text'
                                       placeholder={"John"} {...register("name")}/>
                                <FormErrorMessage>{errors.name && errors.name.message}</FormErrorMessage>
                            </FormControl>

                            <FormControl id={"surname"} isInvalid={errors.surname}>
                                <FormLabel>Surname</FormLabel>
                                <Input variant='flushed' placeholder="Doe"
                                       type="text" {...register("surname")}/>
                                <FormErrorMessage>{errors.surname && errors.surname.message}</FormErrorMessage>
                            </FormControl>

                            <FormControl id={"email"} isInvalid={errors.email}>
                                <FormLabel htmlFor='email'>Email</FormLabel>
                                <Input variant='flushed' type='email'
                                       placeholder={"john.doe@example.com"} {...register("email")}/>
                                <FormErrorMessage>{errors.email && errors.email.message}</FormErrorMessage>
                            </FormControl>


                            <FormControl id={"birthDate"} isInvalid={errors.birthDate}>
                                <FormLabel htmlFor='birthDate'>Birth Date</FormLabel>
                                <Input variant='flushed' type='date'
                                       {...register("birthDate")}/>
                                <FormErrorMessage>{errors.birthDate && errors.birthDate.message}</FormErrorMessage>
                            </FormControl>

                            <FormControl id={"password"} isInvalid={errors.password}>
                                <FormLabel>Password</FormLabel>
                                <Input variant='flushed' placeholder="************"
                                       type="password" {...register("password")}/>
                                <FormErrorMessage>{errors.password && errors.password.message}</FormErrorMessage>
                                <FormHelperText>
                                    <Stack spacing={1}>
                                        <Text fontSize={"0.9rem"}>Password Rules</Text>
                                        <UnorderedList fontSize={"0.85rem"} pl={6}>
                                            <ListItem>Min 6, max 36 characters</ListItem>
                                            <ListItem>At least one uppercase and lowercase letters</ListItem>
                                            <ListItem>At least one number and symbol</ListItem>
                                        </UnorderedList>
                                    </Stack>
                                </FormHelperText>
                            </FormControl>

                            <FormControl id={"confirmPassword"} isInvalid={errors.confirmPassword}>
                                <FormLabel>Confirm Password</FormLabel>
                                <Input variant='flushed' placeholder="************"
                                       type="password" {...register("confirmPassword")}/>
                                <FormErrorMessage>{errors.confirmPassword && errors.confirmPassword.message}</FormErrorMessage>
                                <FormHelperText>
                                    <Stack spacing={1}>
                                        <Text fontSize={"0.9rem"}>Confirm Password Rules</Text>
                                        <UnorderedList fontSize={"0.85rem"} pl={6}>
                                            <ListItem>Passwords must match</ListItem>
                                        </UnorderedList>
                                    </Stack>
                                </FormHelperText>
                            </FormControl>

                            <FormControl id={"termsAndConditions"} isInvalid={errors.termsAndConditions}>
                                <Checkbox
                                    colorScheme={"gray"} {...register("termsAndConditions")} display={"flex"} alignItems={"center"}>
                                    <Text color={"gray"} fontSize={"0.9rem"}>
                                        I agree to {" "}
                                        <Link as={NextLink} href="#" fontWeight={"semibold"} color={"black"}>
                                            Terms & Conditions
                                        </Link> {" "} and {" "}
                                        <Link as={NextLink} href="#" fontWeight={"semibold"} color={"black"}>
                                            Privacy Policy
                                        </Link>
                                    </Text>
                                </Checkbox>
                                <FormErrorMessage>{errors.termsAndConditions && errors.termsAndConditions.message}</FormErrorMessage>
                            </FormControl>

                        </SimpleGrid>

                        <Button alignSelf={"end"} type={"submit"} onClick={handleSubmit((onSubmit))}
                                justifySelf={"center"} colorScheme='green' rounded={"3xl"}>
                            Sign Up
                        </Button>
                    </VStack>
                </form>
            </EntryBox>
        </FullScreenLayout>
    )
}