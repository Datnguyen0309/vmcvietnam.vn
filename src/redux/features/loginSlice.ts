import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface User {
  name: string;
  email: string;
  image: string;
  age: number;
  phone: string;
  gender: string;
  career: string;
}

export interface LoginState {
  loginCheck: boolean;
  user: User;
}

const initialState: LoginState = {
  loginCheck: false,
  user: {
    name: "",
    email: "",
    image: "",
    age: 0,
    phone: "",
    gender: "",
    career: "",
  },
};

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setLoginStatus: (state, action: PayloadAction<LoginState>) => {
      state.loginCheck = action.payload.loginCheck;
      state.user = action.payload.user;
    },
    changeUserInfo: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.loginCheck = false;
      state.user = {
        name: "",
        email: "",
        image: "",
        age: 0,
        phone: "",
        gender: "",
        career: "",
      };
    },
  },
});

export const { setLoginStatus, logout, changeUserInfo } = loginSlice.actions;
export default loginSlice.reducer;
