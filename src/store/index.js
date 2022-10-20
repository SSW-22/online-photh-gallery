import { configureStore } from "@reduxjs/toolkit";
import galleryReducer from "./gallery-slice";
import authReducer from "./auth";
import modalReducer from "./modalSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    gallery: galleryReducer,
    modal: modalReducer,
  },
});

export default store;
