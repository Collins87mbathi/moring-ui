import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: "",
  state: {
    error: false,
    isFetching: false,
    success: false,
  },
  user: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setIsFetching: (state) => {
      state.state.isFetching = true;
    },
    setLoginFaiure: (state) => {
      state.state.isFetching = false;
      state.state.error = true;
    },
    setLoginSuccess: (state, action) => {
      state.state.isFetching = false;
      state.token = action.payload.token;
      state.user = { ...action.payload.user, authenticated: true };
      state.state.success = true;
    },
    setRegisterSuccess: (state, action) => {
      state.state.isFetching = false;
      state.token = action.payload.token;
      state.user = { ...action.payload.user, authenticated: true };
      state.state.success = true;
    },
    setUpdateAccount: (state, action) => {
      state.state.isFetching = false;
      state.user = { ...action.payload.user, authenticated: true };
      state.state.success = true;
    },
    logout: (state) => {
      state.state.isFetching = false;
      state.token = "";
      state.user = null;
      state.state.success = false;
    },
  },
});

export const {
  setLoginFaiure,
  setUpdateAccount,
  setIsFetching,
  setLoginSuccess,
  logout,
  setRegisterSuccess,
} = userSlice.actions;
export default userSlice.reducer;
