import { useContext, useEffect, useState } from "react";
import "./Home.css";
import { CoinContext } from "../../Context/CoinContext";
import {Link} from 'react-router-dom'

const Home = () => {
  const { allCoin, currency } = useContext(CoinContext);
  const [displayCoin, setDisplayCoin] = useState([]);
  const [input, setInput] = useState("");

  const inputHandler = (event) => {
    setInput(event.target.value);
    if (event.target.value === "") {
      setDisplayCoin(allCoin);
    }
  };

  const searchHandler = async (event) => {
    event.preventDefault();
    const coins = await allCoin.filter((item) => {
      return item.name.toLowerCase().includes(input.toLocaleLowerCase());
    });
    setDisplayCoin(coins);
  };
  useEffect(() => {
    setDisplayCoin(allCoin);
  }, [allCoin]);
  return (
    <>
      <div className="home">
        <div className="hero">
          <h1>
            Largest <br /> Crypto Marketplace
          </h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Repellendus, animi nesciunt placeat, dignissimos, ut tenetur omnis
            numquam sed a repellat iusto magni saepe iste?
          </p>
          <form onSubmit={searchHandler}>
            <input
              onChange={inputHandler}
              list="coinlist"
              value={input}
              type="text"
              placeholder="search crypto"
              required
            />

            <datalist id='coinlist'>
              {allCoin.map((item,index)=>(<option key={index} value={item.name}/> ))}
            </datalist>
            <button type="submit">Search</button>
          </form>
        </div>
        <div className="crypto-table">
          <div className="table-layout">
            <p>#</p>
            <p>Coins</p>
            <p>Price</p>
            <p style={{ textAlign: "center" }}>24H Change</p>
            <p className="market-cap">Market Cap</p>
          </div>
          {displayCoin.slice(0, 10).map((item, index) => (
            <Link to={`/coin/${item.id}`} className="table-layout" key={index}>
              <p>{item.market_cap_rank}</p>
              <div>
                <img src={item.image} alt="" />
                <p>{item.name + "-" + item.symbol}</p>
              </div>
              <p>
                {currency.symbol} {item.current_price.toLocaleString()}
              </p>
              <p
                className={
                  item.price_change_percentage_24h > 0 ? "green" : "red"
                }
              >
                {Math.floor(item.price_change_percentage_24h * 100) / 100}
              </p>
              <p className="market-cap">
                {currency.symbol} {item.market_cap.toLocaleString()}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
