import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { modNum } from "../helpers";
import { ratesType } from "../types";

export const fetchRates = createAsyncThunk("fetchRates", async () => {
  const response = await fetch(
    "https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5",
  );
  const data = await response.json();
  return data;
});


const ratesSlice = createSlice({
  name: "rates",
  initialState: [] as ratesType,
  reducers: {
    updateRate:(state,action:PayloadAction<{type:string,ccy:string,baseCcy:string,value:string}>)=>{
      const newRates = state.map((rate)=>{
        return rate.ccy===action.payload.ccy && rate.base_ccy===action.payload.baseCcy 
        ? {...rate,[action.payload.type]:action.payload.value}
        : rate
      });
      return newRates;
    }
  },
  extraReducers: {
    [fetchRates.fulfilled.toString()]: (
      state,
      action: PayloadAction<ratesType>,
    ) => action.payload.map((rate)=>{
      return {...rate,buy:modNum(rate.buy),sale:modNum(rate.sale)}
    }),
  },
});

export const {updateRate} = ratesSlice.actions; 
export default ratesSlice;
