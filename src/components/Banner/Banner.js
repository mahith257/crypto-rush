import { Container, styled, Typography } from "@mui/material";
import Carousel from "./Carousel";

export default function Banner() {

    const StyledDiv = styled("div")({
        backgroundImage: "url(./banner.jpg)"
    })

    const StyledContainer = styled(Container)({
        height: 400,
        display: "flex",
        flexDirection: "column",
        paddingTop: 25,
        justifyContent: "space-around",
    })
    
    return (
        <StyledDiv>
            <StyledContainer>
                <Typography variant="p" textAlign="center" fontFamily="Montserrat" letterSpacing={2}>Get all the info regarding your favorite Crypto Currency</Typography>
                <Carousel />
            </StyledContainer>
        </StyledDiv>
    );
}
