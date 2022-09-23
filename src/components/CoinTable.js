import { useEffect, useState } from "react";
import axios from "axios";
import { CoinList } from "../config/api";
import { useCryptoContext } from "../context/CryptoContext";
import { Container, createTheme, LinearProgress, Pagination, styled, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, ThemeProvider, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { numberWithCommas } from "./Banner/Carousel";

export default function CoinTable() {

    const [coins, setCoins] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [search, setSearch] = useState("")
    const [page, setPage] = useState(1)
    const navigate = useNavigate()

    const { currency, symbol } = useCryptoContext()

    const fetchCoinList = async () => {
        setIsLoading(true)
        const { data } = await axios.get(CoinList(currency))
        setCoins(data)
        // console.log(data)
        setIsLoading(false)
    }

    const darkTheme  = createTheme({
        palette: {
            mode: "dark"
        }
    })

    useEffect(() => {
        fetchCoinList()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currency])

    const handleSearch = () => {
        let filteredCoins = coins.filter(coin => {
            return coin.name.toLowerCase().includes(search) || coin.symbol.toLowerCase().includes(search)
        })

        return filteredCoins
    }

    const StyledTableRow = styled(TableRow)({
        cursor: "pointer",
        backgroundColor: "#16171a",
        fontFamily: "Montserrat",
        "&:hover": {
            backgroundColor: "#131111"
        }
    })

    const CustomPagination = styled(Pagination)({
        padding: 20,
        width: "100%",
        display: "flex",
        justifyContent: "center",
        ul : {
            "& .MuiPaginationItem-root": {
                color: "gold"
              }
        }
    })
    return (
        <ThemeProvider theme={darkTheme}>
            <Container sx={{textAlign: "center"}}>
            <Typography
                variant="h4"
                style={{ margin: 18, fontFamily: "Montserrat" }}
                >
                Cryptocurrency Prices by Market Cap
            </Typography>
            <TextField label="Search for Crypto..." variant="outlined" sx={{ marginBottom: "10px", width: "100%"}} onChange={(e) => setSearch(e.target.value) }></TextField>
            <TableContainer>
                { isLoading && <LinearProgress sx={{ backgroundColor: "gold" }} />}
                <Table>
                    <TableHead style={{ backgroundColor: "#EEBC1D" }}>
                        <TableRow>
                            {["Coin", "Price", "24h Change", "Market Cap"].map((head) => (
                                <TableCell
                                style={{
                                    color: "black",
                                    fontWeight: "700",
                                    fontFamily: "Montserrat",
                                }}
                                key={head}
                                align={head === "Coin" ? "left" : "right"}
                                >
                                {head}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {handleSearch().slice((page - 1) * 10, (page - 1) * 10 + 10).map(row => {
                            const profit = row.price_change_percentage_24h > 0
                            return (
                                <StyledTableRow onClick={() => navigate(`./coin/${row.id}`)} key={row.name}>
                                    <TableCell style={{display:"flex", gap: 15}} component="th" scope="row" align="left"> 
                                    <img
                                        src={row?.image}
                                        alt={row.name}
                                        height="50"
                                        style={{ marginBottom: 10 }}
                                    />
                                    <div
                                        style={{ display: "flex", flexDirection: "column" }}
                                    >
                                        <span
                                        style={{
                                            textTransform: "uppercase",
                                            fontSize: 22,
                                        }}
                                        >
                                        {row.symbol}
                                        </span>
                                        <span style={{ color: "darkgrey" }}>
                                        {row.name}
                                        </span>
                                    </div>
                                    </TableCell>
                                    <TableCell align="right">
                                        {symbol}{" "}
                                        {numberWithCommas(row.current_price.toFixed(2))}
                                    </TableCell>
                                    <TableCell
                                        align="right"
                                        style={{
                                            color: profit > 0 ? "rgb(14, 203, 129)" : "red",
                                            fontWeight: 500,
                                        }}
                                        >
                                        {profit && "+"}
                                        {row.price_change_percentage_24h.toFixed(2)}%
                                        </TableCell>
                                        <TableCell align="right">
                                        {symbol}{" "}
                                        {numberWithCommas(
                                            row.market_cap.toString().slice(0, -6)
                                        )}
                                        M
                                    </TableCell>
                                </StyledTableRow>
                            )
                        })}        
                    </TableBody>
                </Table>
            </TableContainer>
            <CustomPagination 
                count={parseInt(handleSearch()?.length / 10)}
                onChange= {(e, val) => {
                    setPage(val)
                    window.scroll(0,450)
                }}
                page = {page}
            />
            </Container>
        </ThemeProvider>
    );
}
