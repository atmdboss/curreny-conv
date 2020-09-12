import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export const fetchRates = createAsyncThunk("fetchRates", async () => {
  const response = await fetch(
    "https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5",
  );
  const data = await response.json();
  return data;
});

export type ratesType = {
  ccy: string,
  base_ccy: string,
  buy: string,
  sale: string
}[]

const ratesSlice = createSlice({
  name: "rates",
  initialState: [] as ratesType,
  reducers: {
    // standard reducer logic, with auto-generated action types per reducer
  },
  extraReducers: {
    [fetchRates.fulfilled.toString()]: (
      state,
      action: PayloadAction<ratesType>,
    ) => action.payload,
  },
});

export default ratesSlice;
