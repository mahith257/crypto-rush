import { styled } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import AliceCarousel from "react-alice-carousel";
import { Link } from "react-router-dom";
import { TrendingCoins } from "../../config/api";
import { useCryptoContext } from "../../context/CryptoContext";

export function numberWithCommas(x){
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

export default function Carousel() {
    const [trendingCoins, setTrendingCoins] = useState([])
    const { currency, symbol } = useCryptoContext()

    const fetchTrendingCoins = async () => {
        const { data } = await axios.get(TrendingCoins(currency))
        setTrendingCoins(data)
        // console.log(data)
    }

    useEffect(() => {
        fetchTrendingCoins()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currency])

    const StyledCarousel = styled("div")({
        height: "50%",
        display: "flex",
        alignItems: "center"
    })

    const CarouselItem = styled(Link)({
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        color: "white",
        textTransform: "capitalize",
        cursor: "pointer"
    })

    const items = trendingCoins.map((coin) => {
        let profit = coin.price_change_percentage_24h >= 0
        return (
            <CarouselItem to={`./coin/${coin.id}`}>
                <img 
                    src={coin?.image}
                    alt={coin?.name}
                    height="80"
                    style={{ marginBottom: 10 }}
                />
                <span>
                    {coin?.symbol}
                    &nbsp;
                    <span
                        style={{
                        color: profit > 0 ? "rgb(14, 203, 129)" : "red",
                        fontWeight: 500,
                        }}
                    >
                        {profit && "+"}
                        {coin?.price_change_percentage_24h?.toFixed(2)}%
                    </span>
                </span>
                <span style={{ fontSize: 22, fontWeight: 500}}>
                    {symbol} {numberWithCommas(coin?.current_price.toFixed(2))}
                </span>
            </CarouselItem>
        )
    })

    const responsive = {
        0: {
            items: 2
        },
        512: {
            items: 4
        }
    }

    return (
        <StyledCarousel>
            <AliceCarousel
                mouseTracking 
                infinite
                autoPlayInterval={1000}
                animationDuration={1500}
                disableDotsControls
                disableButtonsControls
                responsive={responsive}
                autoPlay
                items={items}
            />
        </StyledCarousel>
    );
}
