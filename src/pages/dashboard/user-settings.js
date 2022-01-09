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
})

const UserSettingsPage = ()=>{
    const {register, handleSubmit, formState: {errors}} = useForm({
        resolver: yupResolver(formSchema),
        defaultValues: {
            name: "John",
            surname: "Doe",
            email: "john.doe@example.com",
            birthDate: "2021-12-23"
        }
    });
    return(
        <StandardLayout>
            <DashboardArea title={"Kullanıcı Bilgilerini Düzenle"} description={"Kişisel bilgilerini bu sayfadan düzenleyebilirsin, bilgileri doğru girdiğinden emin ol!"}>
                <form>
                    <VStack spacing={7} align={"stretch"}>
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

                        </SimpleGrid>
                        <Button alignSelf={"stretch"} colorScheme={"green"}>Save</Button>
                    </VStack>
                </form>
            </DashboardArea>
        </StandardLayout>
    )
}

export default UserSettingsPage