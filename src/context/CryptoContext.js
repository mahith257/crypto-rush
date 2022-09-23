import React, { createContext, useContext, useEffect, useState } from "react";

const CryptoContext = createContext()

export const CryptoContextProvider = ({ children }) => {
    
    const [currency, setCurrency] = useState("INR")
    const [symbol, setSymbol] = useState("₹")

    useEffect(() => {
        if(currency === "INR"){
            setSymbol("₹")
        }else if(currency === "USD"){
            setSymbol("$")
        }
    }, [currency])

    console.log("state: ", currency, symbol)
    return (
        <CryptoContext.Provider value={{ currency, symbol, setCurrency }}>
            { children }
        </CryptoContext.Provider>
    );
};

export const useCryptoContext = () => {
    const context = useContext(CryptoContext)

    return context
}
