import {Button, Input, InputGroup} from "@chakra-ui/react";

export default function SearchBar(){
    return(
        <InputGroup width={{base: "100%", md: "50%"}}>
            <Input variant='filled'
                   sx={{
                       bgColor: "specialColors.queen_blue.wOpacity04",
                       _hover: {
                           backgroundColor: "specialColors.space_cadet.900"
                       }
                   }}
                   placeholder='Enter a keyword...' roundedRight={0}/>
            <Button roundedLeft={0} colorScheme={"specialColors.persian_green"}>Search</Button>
        </InputGroup>
    )
}