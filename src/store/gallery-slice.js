import { createSlice } from "@reduxjs/toolkit";

const initialGalleryState = {
  status: "none", // draft, hosted
  thumbnailBgColor: "",
  thumbnailTextColor: "",
  title: "",
  name: "",
  images: [],
};

const authSlice = createSlice({
  name: "gallery",
  initialState: initialGalleryState,
  reducers: {
    addImage(state, action) {
      const newImage = action.payload;
      const existImages = state.images.find(
        (image) => image.id === newImage.id
      );
      if (!existImages) {
        state.images.push({
          id: newImage.id,
          title: newImage.title,
          description: newImage.description,
          imgUrl: newImage.imgUrl,
        });
      }
    },
  },
});

export const galleryActions = authSlice.actions;

export default authSlice.reducer;
