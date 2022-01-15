import { Box } from "@chakra-ui/react";

export default function CustomButton({text, icon, iconBackground = "orange.300", iconBackgroundHover = "purple.300", buttonOnClick,...props}){
    return(
        <Box as="button" sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            paddingY: "0.5rem",
            cursor: "pointer",
            borderRadius: "md",
            width: "100%",
            fontWeight: 600,
            color: "gray.500",
            transition: "0.2s all ease-out",
            ":hover": {
                color: "gray.800",
                "> div": {
                    backgroundColor: iconBackgroundHover,
                }
            }
        }} onClick={buttonOnClick} {...props}>
            <Box p={3} ml={0} mr={2} borderRadius={"md"} color={"white"} fontSize={"1.2rem"} backgroundColor={iconBackground} transition={"0.2s all ease-out"}>
                {icon}
            </Box>
            {text}
        </Box>
    )
}