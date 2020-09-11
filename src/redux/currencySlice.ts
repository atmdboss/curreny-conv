import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export const fetchCurrencies = createAsyncThunk("fetchCurrencies", async () => {
  const response = await fetch(
    "https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5",
  );
  const data = await response.json();
  return data;
});

export type currType = {
  ccy: string,
  base_ccy: string,
  buy: string,
  sale: string
}[]

const currencySlice = createSlice({
  name: "currencies",
  initialState: [] as currType,
  reducers: {
    // standard reducer logic, with auto-generated action types per reducer
  },
  extraReducers: {
    [fetchCurrencies.fulfilled.toString()]: (
      state,
      action: PayloadAction<currType>,
    ) => action.payload,
  },
});

export default currencySlice;
