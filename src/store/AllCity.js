import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allcities: [],
};

const allcity = createSlice({
  name: "allcity",
  initialState,
  reducers: {
    setAllCities: (state, action) => {
      state.allcities = action.payload;
    },
  },
});

export const { setAllCities } = allcity.actions;
export default allcity.reducer;