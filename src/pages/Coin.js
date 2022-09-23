import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios"
import { SingleCoin } from "../config/api";
import { useCryptoContext } from "../context/CryptoContext";
import { LinearProgress, styled, Typography } from "@mui/material";
import CoinInfo from "../components/CoinInfo";
import parse from "html-react-parser";
import { numberWithCommas } from "../components/Banner/Carousel";

export default function Coin() {
  const { id } = useParams()
  const [coin, setCoin] = useState()
  const { currency, symbol } = useCryptoContext()

  const fetchCoin = async () => {
    const { data } = await axios.get(SingleCoin(id))
    setCoin(data)
    // console.log(data)
  }

  useEffect(() => {
    fetchCoin()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currency])

  const StyledDiv = styled("div")(({ theme }) => ({
    display: "flex",
    [theme.breakpoints.down("md")]: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    }
  }))

  const Sidebar = styled("div")(({ theme }) => ({
    width: "30%",
    [theme.breakpoints.down("md")]: {
      width: "100%"
    },
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: 25,
    borderRight: "2px solid grey"
  }))

  const HeadingTypography = styled(Typography)({
    fontWeight: "bold",
    marginBottom: "20px", 
    fontFamily: "Montserrat"
  })

  const MarketDataDiv = styled("div")(({ theme }) => ({
    alignSelf: "start",
    padding: 25,
    paddingTop: 10,
    width: "100%",
    [theme.breakpoints.down("md")]: {
      display: "flex",
      justifyContent: "space-around",
    },
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      alignItems: "center",
    },
    [theme.breakpoints.down("xs")]: {
      alignItems: "start",
    },
  }))

  let description = `${coin?.description.en.split(". ")[0]}`

  if(!coin){
    return (
      <LinearProgress sx={{backgroundColor: "gold"}} />
    )
  }

  return (
    <StyledDiv>
      <Sidebar>
        <img 
          src={coin?.image.large}
          alt={coin?.name}
          height="200"
          style={{ marginBottom: 20}}
        />
        <HeadingTypography variant="h3">{coin?.name}</HeadingTypography>
        <Typography variant="subtitle1" sx={{width: "100%", textAlign: "justify", fontFamily: "Montserrat", padding: "0px 20px 15px"}}>{parse(description)}</Typography>
        <MarketDataDiv>
          <span style={{display: "flex"}}>
            <HeadingTypography variant="h5">
                Rank:
            </HeadingTypography>
            &nbsp; &nbsp;
            <Typography
              variant="h5"
              style={{
                fontFamily: "Montserrat",
              }}
            >
              {numberWithCommas(coin?.market_cap_rank)}
            </Typography>
          </span>
          <span style={{ display: "flex" }}>
            <HeadingTypography variant="h5">
              Current Price:
            </HeadingTypography>
            &nbsp; &nbsp;
            <Typography
              variant="h5"
              style={{
                fontFamily: "Montserrat",
              }}
            >
              {symbol}{" "}
              {numberWithCommas(
                coin?.market_data.current_price[currency.toLowerCase()]
              )}
            </Typography>
          </span>
          <span style={{ display: "flex" }}>
            <HeadingTypography variant="h5">
              Market Cap:
            </HeadingTypography>
            &nbsp; &nbsp;
            <Typography
              variant="h5"
              style={{
                fontFamily: "Montserrat",
              }}
            >
              {symbol}{" "}
              {numberWithCommas(
                coin?.market_data.market_cap[currency.toLowerCase()]
                  .toString()
                  .slice(0, -6)
              )}
              M
            </Typography>
          </span>
        </MarketDataDiv>
      </Sidebar>
      <CoinInfo coin = {coin} />
    </StyledDiv>
  )
}
