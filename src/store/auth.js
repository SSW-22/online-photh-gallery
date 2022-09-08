import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
  displayName: "",
  email: "",
  uid: "",
  isAuth: false,
};

const authSlice = createSlice({
  name: "authentication",
  initialState: initialAuthState,
  reducers: {
    login(state, action) {
      let loginAuth = state;
      loginAuth = {
        displayName: action.payload.displayName,
        email: action.payload.email,
        uid: action.payload.uid,
        isAuth: true,
      };
      return loginAuth;
    },
    logout(state) {
      let logoutAuth = state;
      logoutAuth = {
        displayName: "",
        email: "",
        uid: "",
        isAuth: false,
      };
      return logoutAuth;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
