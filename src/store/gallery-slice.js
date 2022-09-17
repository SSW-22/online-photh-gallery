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
    addTitle(state, action) {
      const inputTitle = state;
      // inputTitle = action.payload;
      inputTitle.title = action.payload;
      return inputTitle;
    },
    addName(state, action) {
      const inputName = state;
      inputName.name = action.payload;
      return inputName;
    },
    addThumbnailBgColor(state, action) {
      const inputBgColor = state;
      inputBgColor.thumbnailBgColor = action.payload;
      return inputBgColor;
    },
    addThumbnailTextColor(state, action) {
      const inputTextColor = state;
      inputTextColor.thumbnailTextColor = action.payload;
      return inputTextColor;
    },
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
