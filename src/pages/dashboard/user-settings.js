import StandardLayout from "../../components/layouts/StandardLayout";
import DashboardArea from "../../components/DashboardArea";
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
import * as yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import { useMutation } from "react-query";
import { ApiService } from "@/services/api.service";
import { useRouter } from "next/router";
import { authValue } from "@/store/slices/auth";
import { useSelector } from 'react-redux';

const formSchema = yup.object().shape({
    firstName: yup.string()
        .required("First name is required."),
    lastName: yup.string()
        .required("Last name is required."),
    email: yup.string()
        .required("Email is required.")
        .email("Invalid email format."),
    birthdate: yup.string()
        .required('Birthday is required.')
        .matches(/^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/, 'Birthday must be a valid date in the format YYYY-MM-DD'),
})

const UserSettingsPage = ()=>{

    const auth = useSelector(authValue);

    const {register, handleSubmit, formState: {errors}} = useForm({
        resolver: yupResolver(formSchema),
        defaultValues: {
            firstName: auth?.user?.firstName,
            lastName: auth?.user?.lastName,
            email: auth?.user?.email,
            birthdate: auth?.user?.birthdate
        }
    });

    const router = useRouter();

    const mutation = useMutation(async (data) => {
        await ApiService.userQueries.update(data);
    });

    const onSubmit = data => {
        data.confirmPassword = undefined;
        const result = mutation.mutateAsync(data);
        console.log(result);
    };

    if (mutation.isSuccess) {
        router.replace('/');

    }

    return(
        <StandardLayout>
            <DashboardArea title={"Kullanıcı Bilgilerini Düzenle"} description={"Kişisel bilgilerini bu sayfadan düzenleyebilirsin, bilgileri doğru girdiğinden emin ol!"}>
                <form>
                    <VStack spacing={7} align={"stretch"}>
                        <SimpleGrid columns={{base: 1, md: 2}} spacing={6}>

                            <FormControl id={"firstName"} isInvalid={errors.firstName}>
                                <FormLabel htmlFor='firstName'>Name</FormLabel>
                                <Input variant='flushed' type='text'
                                       placeholder={"John"} {...register("firstName")}/>
                                <FormErrorMessage>{errors.firstName && errors.firstName.message}</FormErrorMessage>
                            </FormControl>

                            <FormControl id={"lastName"} isInvalid={errors.lastName}>
                                <FormLabel>Surname</FormLabel>
                                <Input variant='flushed' placeholder="Doe"
                                       type="text" {...register("lastName")}/>
                                <FormErrorMessage>{errors.lastName && errors.lastName.message}</FormErrorMessage>
                            </FormControl>

                            <FormControl id={"email"} isInvalid={errors.email}>
                                <FormLabel htmlFor='email'>Email</FormLabel>
                                <Input variant='flushed' type='email'
                                       placeholder={"john.doe@example.com"} {...register("email")}/>
                                <FormErrorMessage>{errors.email && errors.email.message}</FormErrorMessage>
                            </FormControl>


                            <FormControl id={"birthdate"} isInvalid={errors.birthdate}>
                                <FormLabel htmlFor='birthdate'>Birth Date</FormLabel>
                                <Input variant='flushed' type='date'
                                       {...register("birthdate")}/>
                                <FormErrorMessage>{errors.birthdate && errors.birthdate.message}</FormErrorMessage>
                            </FormControl>

                        </SimpleGrid>
                        <Button onClick={handleSubmit((onSubmit))}
                        alignSelf={"stretch"} colorScheme={"green"}>Save</Button>
                    </VStack>
                </form>
            </DashboardArea>
        </StandardLayout>
    )
}

export default UserSettingsPage