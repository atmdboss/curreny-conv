import ratesSlice from "./ratesSlice";
import currencySlice from "./currencySlice";
import { configureStore, combineReducers } from "@reduxjs/toolkit";

const rootReducer = combineReducers({
  [ratesSlice.name]: ratesSlice.reducer,
  [currencySlice.name]: currencySlice.reducer,
})
const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
store.subscribe(() => console.log(store.getState()));
export default store;
