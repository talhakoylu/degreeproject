import StandardLayout from "../../components/layouts/StandardLayout";
import DashboardArea from "../../components/DashboardArea";
import * as yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {
    Button,
    Checkbox,
    FormControl,
    FormErrorMessage,
    FormHelperText,
    FormLabel,
    Input, Link, ListItem,
    SimpleGrid,
    Stack, Text, UnorderedList,
    VStack
} from "@chakra-ui/react";
import {Link as NextLink} from "next/link";

const formSchema = yup.object().shape({
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
    oldPassword: yup.string()
        .required("Old password is required.")
})

const ChangePasswordPage = ()=>{
    const {register, handleSubmit, formState: {errors}} = useForm({
        resolver: yupResolver(formSchema)
    });
    const onSubmit = data => console.log(data);
    return(
        <StandardLayout>
            <DashboardArea title={"Şifre Değiştirme"} description={"Bu sayfada şifrenizi güncelleyebilirsiniz."}>
                <form>
                    <VStack spacing={2} align={"stretch"}>

                        <SimpleGrid columns={1} spacing={6} maxW={"35%"}>

                            <FormControl id={"oldPassword"} isInvalid={errors.oldPassword}>
                                <FormLabel>Old Password</FormLabel>
                                <Input variant='flushed' placeholder="************"
                                       type="password" {...register("oldPassword")}/>
                                <FormErrorMessage>{errors.oldPassword && errors.oldPassword.message}</FormErrorMessage>
                                <FormHelperText>
                                   Eski şifrenizi giriniz.
                                </FormHelperText>
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



                        </SimpleGrid>

                        <Button alignSelf={"end"} type={"submit"} onClick={handleSubmit((onSubmit))}
                                justifySelf={"center"} colorScheme='blue' rounded={"3xl"}>
                            Change Password
                        </Button>
                    </VStack>
                </form>
            </DashboardArea>
        </StandardLayout>
    )
}

export default ChangePasswordPage