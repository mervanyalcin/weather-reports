import { configureStore } from "@reduxjs/toolkit";
import allcity from "./AllCity";
import currentCityName from "./CurrentCity";

const store = configureStore({
  reducer: {
    allcity,
    currentCityName,
  },
});

export default store;
