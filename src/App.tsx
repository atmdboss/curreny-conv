import React, { useEffect, useState } from "react";
import "./App.css";
import { fetchRates } from "./redux/ratesSlice";
import store from "./redux/store";
import { useSelector } from "react-redux";
import CustomTable from "./components/Table";
import Exchange from "./components/Exchange";
import { RootState } from "./redux/store";
import { setCurrencies } from "./redux/currencySlice";
import Footer from "./components/Footer";
import Header from "./components/Header";
import ServerError from "./components/SeverError";

function App() {
  const { rates, currency } = useSelector((state: RootState) => state);
  const [hasServerError, setHasServerError] = useState(false);

  useEffect(() => {
    store.dispatch(fetchRates());
    const numOfApiCalls = localStorage.getItem("numOfCalls");
    if (numOfApiCalls) {
      if (Number(numOfApiCalls) === 4) {
        // imitate server error
        setHasServerError(true);
        localStorage.setItem("numOfCalls", "0");
      } else {
        localStorage.setItem(
          "numOfCalls",
          (Number(numOfApiCalls) + 1).toString()
        );
      }
    } else {
      localStorage.setItem("numOfCalls", "1");
    }
  }, []);
  useEffect(() => {
    store.dispatch(setCurrencies(rates));
  }, [rates]);

  return (
    <>
      <div className="App">
        <Header />
        {!hasServerError ? (
          <>
            <CustomTable rates={rates} />
            <Exchange rates={rates} currency={currency} />
          </>
        ) : (
          <ServerError />
        )}
      </div>
      <Footer />
    </>
  );
}

export default App;
