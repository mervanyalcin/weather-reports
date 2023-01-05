import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentCity: [],
};

const currentCityName = createSlice({
  name: "currentCityName",
  initialState,
  reducers: {
    setCurrentCity: (state, action) => {
      state.currentCity = action.payload;
    },
  },
});

export const { setCurrentCity } = currentCityName.actions;
export default currentCityName.reducer;