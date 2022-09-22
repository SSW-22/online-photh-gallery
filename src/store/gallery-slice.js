import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import checkUserGallery from "../firebase/checkUserGallery";

const initialGalleryState = {
  gallery: {
    name: "",
    title: "",
    images: [],
    thumbnailBgColor: "",
    thumbnailTextColor: "",
    status: "", // none | draft | hosted
  },
  status: "idle", // "idle" | "loading" | "succeeded" | "failed"
  error: null,
};

export const checkGallery = createAsyncThunk(
  "post/checkGallery",
  async (uid) => {
    try {
      const response = await checkUserGallery(uid);
      // console.log(response);
      return response;
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  }
);

const gallerySlice = createSlice({
  name: "gallery",
  initialState: initialGalleryState,
  reducers: {
    addTitle(state, action) {
      const previousData = state;
      previousData.gallery.title = action.payload;
    },
    addName(state, action) {
      const previousData = state;
      previousData.gallery.name = action.payload;
    },
    addThumbnailBgColor(state, action) {
      const previousData = state;
      previousData.gallery.thumbnailBgColor = action.payload;
    },
    addThumbnailTextColor(state, action) {
      const previousData = state;
      previousData.gallery.thumbnailTextColor = action.payload;
    },
    addImage(state, action) {
      const newImage = action.payload;
      const existImages = state.gallery.images.find(
        (image) => image.id === newImage.id
      );
      if (!existImages) {
        state.gallery.images.push({
          id: newImage.id,
          title: newImage.title,
          description: newImage.description,
          imgUrl: newImage.imgUrl,
          date: newImage.date,
        });
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(checkGallery.pending, (state) => {
        const previousData = state;
        previousData.status = "loading";
      })
      .addCase(checkGallery.fulfilled, (state, action) => {
        const previousData = state;
        previousData.status = "succeeded";
        previousData.gallery.status = action.payload.status;
        previousData.gallery.images = action.payload.images || [];
        previousData.gallery.thumbnailBgColor =
          action.payload.thumbnailBgColor || "";
        previousData.gallery.thumbnailTextColor =
          action.payload.thumbnailTextColor || "";
        previousData.gallery.title = action.payload.title || "";
        previousData.gallery.name = action.payload.name || "";
      })
      .addCase(checkGallery.rejected, (state, action) => {
        const previousData = state;
        previousData.state = "failed";
        previousData.error = action.error.message;
      });
  },
});

export const galleryActions = gallerySlice.actions;

export default gallerySlice.reducer;
