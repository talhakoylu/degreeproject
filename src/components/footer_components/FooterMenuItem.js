import {Button} from "@chakra-ui/react";
import {useRouter} from "next/router";

export default function FooterMenuItem({data}){
    const router = useRouter();
    return(
        <Button variant={"link"} onClick={() => router.push(data.path)}>
            {data.title}
        </Button>
    )
}

