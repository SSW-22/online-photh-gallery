import { configureStore } from "@reduxjs/toolkit";
import galleryReducer from "./gallery-slice";
import authReducer from "./auth";

const store = configureStore({
  reducer: {
    auth: authReducer,
    gallery: galleryReducer,
  },
});

export default store;
