import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "./loginSlice";
import { CartState } from "./cartSlice";

export interface OderState {
  id: string;
  CartState: CartState;
  discountCode: string;
  discountValue: number;
  pay: number;
  User: User;
}
const initialState: OderState = {
  id: "",
  CartState: {
    cartItems: [],
    totalQuantity: 0,
    totalAmount: 0,
  },
  discountCode: "",
  discountValue: 0,
  pay: 0,
  User: {
    name: "",
    email: "",
    image: "",
    career: "",
    age: 0,
    phone: "",
    gender: "",
  },
};
const oderSlice = createSlice({
  name: "oder",
  initialState,
  reducers: {
    addUser(state, action: PayloadAction<User>) {
      state.User = action.payload;
    },

    addDiscount(state, action: PayloadAction<{ discountCode: string; discountValue: number }>) {
      state.discountCode = action.payload.discountCode;
      state.discountValue = action.payload.discountValue;
    },
    addCartState(state, action: PayloadAction<{ CartState: CartState; pay: number }>) {
      state.CartState = action.payload.CartState;
      state.pay = action.payload.pay;
    },
    idOrderUpdate(state, action: PayloadAction<{ id: string }>) {
      state.id = action.payload.id;
    },
  },
});

export const { addUser, addDiscount, addCartState, idOrderUpdate } = oderSlice.actions;
export default oderSlice.reducer;
