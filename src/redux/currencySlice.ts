import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ratesType } from "../types";

const currencySlice = createSlice({
  name: "currency",
  initialState: [] as string[],
  reducers: {
    setCurrencies: (state,action:PayloadAction<ratesType>)=>{
        const rates = action.payload.map((rate)=>{
            return [rate.base_ccy,rate.ccy];
        });
        const ratesSet = new Set(rates.flat());
        return [...ratesSet];
    }
  },
});
export const {setCurrencies} = currencySlice.actions;

export default currencySlice;
