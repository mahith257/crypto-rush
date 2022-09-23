import { styled } from "@mui/material";
import React from "react";

export default function ChartButton({ children, selected, onClick }) {
    const CustomButton = styled("span")({
        border: "1px solid gold",
        borderRadius: 5,
        padding: 10,
        paddingLeft: 20,
        paddingRight: 20,
        fontFamily: "Montserrat",
        cursor: "pointer",
        backgroundColor: selected ? "gold" : "",
        color: selected ? "black" : "",
        fontWeight: selected ? 700 : 500,
        "&:hover": {
            backgroundColor: "gold",
            color: "black",
        },
        width: "22%",
    })
    return (
        <CustomButton onClick={onClick} >
            {children}
        </CustomButton>
    );
}
