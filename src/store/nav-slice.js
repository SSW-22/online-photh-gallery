import { createSlice } from "@reduxjs/toolkit";

const initialNavState = {
  isOpen: false,
};

const navSlice = createSlice({
  name: "nav",
  initialState: initialNavState,
  reducers: {
    toggleNav(state) {
      const prevNav = state;
      prevNav.isOpen = !prevNav.isOpen;
    },
  },
});

export const navActions = navSlice.actions;

export default navSlice.reducer;
