import { createSlice } from "@reduxjs/toolkit";

const initialNavState = {
  isOpen: true,
};

const navSlice = createSlice({
  name: "nav",
  initialState: initialNavState,
  reducers: {
    toggleNav(state, action) {
      const prevNav = state;
      prevNav.isOpen = action.payload;
    },
  },
});

export const navActions = navSlice.actions;

export default navSlice.reducer;
