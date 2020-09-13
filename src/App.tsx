import React, { useEffect } from "react";
import "./App.css";
import { fetchRates } from "./redux/ratesSlice";
import store from "./redux/store";
import { useSelector } from "react-redux";
import Table from "./components/Table";
import Exchange from "./components/Exchange";
import { RootState } from "./redux/store";
import { setCurrencies } from "./redux/currencySlice";

function App() {
  const {rates,currency} = useSelector((state: RootState) => state);

  useEffect(() => {
    store.dispatch(fetchRates());
  }, []);
  useEffect(() => {
    store.dispatch(setCurrencies(rates));
  }, [rates]);
  
  return (
    <div className="App">
      <Table rates={rates} />
      <Exchange rates={rates} currency={currency} />
    </div>
  );
}

export default App;
