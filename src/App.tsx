import React, { useEffect } from "react";
import "./App.css";
import { fetchCurrencies } from "./redux/currencySlice";
import store from "./redux/store";
import { useSelector } from "react-redux";
import Table from "./components/Table";
import { RootState } from "./redux/store";

function App() {
  useEffect(() => {
    store.dispatch(fetchCurrencies());
  }, []);
  const data = useSelector((state: RootState) => state.currencies);
  return (
    <div className="App">
      <Table data={data} />
    </div>
  );
}

export default App;
