import React, { useEffect, useState } from "react";
import { BaseUrl } from "../Api";
import Loader from "./Loader";
import axios from "axios";
import Header from "./Header";
import "./styles/Coins.css";
import { Link } from "react-router-dom";

const Coins = () => {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [currency, setCurrency] = useState("usd");
  const [search, setSearch] = useState('');
  const currencySymbol = currency === "inr" ? "₹" : "$";
  useEffect(() => {
    const getCoinsData = async () => {
      const { data } = await axios.get(
        `${BaseUrl}/coins/markets?vs_currency=${currency}`
      );
      console.log(data);
      setCoins(data);
      setLoading(false);
    };
    getCoinsData();
  }, [currency]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Header />
          <div className="search-bar">
            <input
            type="text" 
            placeholder="search coins" 
            onChange={(e)=>setSearch(e.target.value)}
            />
          </div>
          <div className="btns">
            <button onClick={() => setCurrency("inr")}>INR</button>
            <button onClick={() => setCurrency("usd")}>USD</button>
          </div>

          {coins.filter((data)=>{
            if(data ==''){
              return data
            }else if(data.name.toLowerCase().includes(search.toLowerCase())){
              return data
            }
          }).map((coinData, i) => {
            return (
              <CoinCard
                coinData={coinData}
                i={i}
                currencySymbol={currencySymbol}
                id={coinData.id}
              />
            );
          })}
        </>
      )}
    </>
  );
};

const CoinCard = ({ coinData, i, currencySymbol, id }) => {
  const profit = coinData.price_change_percentage_24h > 0;

  return (
    <Link to={`/coin/${id}`} style={{ color: "#000", textDecoration: "none" }}>
      <div className="ex-cards" key={i}>
        <div className="image">
          <img height={"80px"} src={coinData.image} alt="" />
        </div>
        <div className="name">{coinData.name}</div>
        <div className="price">
          {currencySymbol}
          {coinData.current_price.toFixed(0)}
        </div>
        <div
          style={profit ? { color: "green" } : { color: "red" }}
          className="rank"
        >
          {profit
            ? "+" + coinData.price_change_percentage_24h.toFixed(2)
            : coinData.price_change_percentage_24h.toFixed(2)}
        </div>
      </div>
    </Link>
  );
};

export default Coins;
