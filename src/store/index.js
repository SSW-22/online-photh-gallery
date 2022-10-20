import { configureStore } from "@reduxjs/toolkit";
import galleryReducer from "./gallery-slice";
import authReducer from "./auth";
import modalReducer from "./modalSlice";
import navSlice from "./nav-slice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    gallery: galleryReducer,
    modal: modalReducer,
    nav: navSlice,
  },
});

export default store;
