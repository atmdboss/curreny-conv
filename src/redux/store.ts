import currencySlice from "./currencySlice";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
// import {} from "@types/react-redux";

const rootReducer = combineReducers({
  [currencySlice.name]: currencySlice.reducer,
})
const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
// store.subscribe(() => console.log(store.getState()));
export default store;
