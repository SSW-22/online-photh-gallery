import { createSlice } from "@reduxjs/toolkit";

const initialModalState = {
  isOpen: false,
  modalTitle: "",
  modalType: "",
  modalText: "",
};

const modalSlice = createSlice({
  name: "modal",
  initialState: initialModalState,
  reducers: {
    toggleModal(state, action) {
      const prevModal = state;
      prevModal.isOpen = action.payload;
    },
    addModalTitle(state, action) {
      const prevModal = state;
      prevModal.modalTitle = action.payload;
    },
    addModalText(state, action) {
      const prevModal = state;
      prevModal.modalText = action.payload;
    },
    addModalType(state, action) {
      const prevModal = state;
      prevModal.modalType = action.payload;
    },
  },
});

export const modalActions = modalSlice.actions;

export default modalSlice.reducer;
