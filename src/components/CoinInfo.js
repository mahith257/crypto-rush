import React, { useEffect, useState } from "react";
import { useCryptoContext } from "../context/CryptoContext";
import axios from "axios"
import { HistoricalChart } from "../config/api";
import { CircularProgress, createTheme, styled, ThemeProvider } from "@mui/material";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from 'chart.js';
import { chartDays } from "../config/data";
import ChartButton from "./ChartButton";
Chart.register(...registerables);

export default function CoinInfo({ coin }) {
    const [historicalData, setHistoricalData] = useState()
    const [days, setDays] = useState(1)
    const { currency } = useCryptoContext()

    const fetchHistoricalData = async () => {
        const { data } = await axios.get(HistoricalChart(coin.id, days, currency))
        setHistoricalData(data.prices)
        // console.log(data)
    }

    // console.log(historicalData)

    useEffect(() => {
        fetchHistoricalData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currency, days])

    const darkTheme = createTheme({
        palette: {
            mode: "dark"
        }
    })

    const ContainerDiv = styled("div")(({ theme }) => ({
        width: "75%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 40,
        [theme.breakpoints.down("md")]: {
            width: "100%",
            marginTop: 0,
            padding: 20,
            paddingTop: 0,
        },
    }))

    return (
        <ThemeProvider theme={darkTheme}>
            <ContainerDiv>
                {!historicalData && <CircularProgress sx={{ color: "gold"}} size={250} thickness={1} />}
                {historicalData && 
                <>
                    <Line 
                        data={{
                            labels: historicalData.map((c) => {
                                let date = new Date(c[0])
                                let time =  date.getHours() > 12
                                            ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                                            : `${date.getHours()}:${date.getMinutes()} AM`;
                                return days === 1 ? time : date.toLocaleDateString()
                            }),
                            datasets: [{data: historicalData.map(c => c),label: `Price ( Past ${days} Days ) in ${currency}`,
                                        borderColor: "#EEBC1D",}]
                        }}
                        options={{
                            elements: {
                            point: {
                                radius: 1,
                            },
                            },
                        }}
                    />
                    <div style={{ display: "flex", width: "100%", justifyContent: "space-around", marginTop: "20px"}}>
                        {chartDays.map(day => (
                            <ChartButton key={day.value} onClick = {() => setDays(day.value)} selected = {days === day.value}>{day.label}</ChartButton>
                        ))}
                    </div>    
                </>
                }
            </ContainerDiv>
        </ThemeProvider>
    );
}
