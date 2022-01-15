import CustomButton from "@/components/CustomButton";
import { Text, VStack } from "@chakra-ui/react";

export default function SidebarBox({ title, description, buttonOnClick, buttonText, icon, buttonIconBackground = undefined, buttonIconBackgroundHover = undefined, ...props }) {
    return (
        <VStack align={"flex-start"} {...props}>
            <Text fontWeight={500}>{title}</Text>
            <Text textColor={"gray.500"} lineHeight={1.4} textAlign={"justify"}>{description}</Text>
            <CustomButton text={buttonText} iconBackground={buttonIconBackground} iconBackgroundHover={buttonIconBackgroundHover} buttonOnClick={buttonOnClick} icon={icon} />

        </VStack>
    )
}