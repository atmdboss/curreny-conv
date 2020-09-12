import { createSlice, PayloadAction } from "@reduxjs/toolkit";


export type ratesType = {
  ccy: string,
  base_ccy: string,
  buy: string,
  sale: string
}[]

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
