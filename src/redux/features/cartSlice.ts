import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

export interface CartState {
  cartItems: CartItem[];
  totalQuantity: number;
  totalAmount: number;
}
const initialState: CartState = {
  cartItems: [],
  totalQuantity: 0,
  totalAmount: 0,
};
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    removeItem(state, action: PayloadAction<number>) {
      const id = action.payload;
      const existingItem = state.cartItems.find((item: CartItem) => item.id === id);

      if (existingItem) {
        if (existingItem && existingItem.quantity === 1) {
          state.cartItems = state.cartItems.filter((item) => item.id !== id);
          state.totalQuantity--;
        } else {
          existingItem.quantity--;
        }
      } else {
      }
      state.totalAmount = state.cartItems.reduce(
        (total, item) => total + Number(item.price) * 1,
        0
      );
    },
    addItem(state, action: PayloadAction<CartItem>) {
      const newItem = action.payload;
      const existingItem = state.cartItems.find((item) => item.id === newItem.id);

      if (!existingItem) {
        state.cartItems.push({
          id: newItem.id,
          name: newItem.name,
          price: newItem.price,
          image: newItem.image,
          quantity: 1,
        });
        state.totalQuantity++;
        toast.success("Thêm sản phẩm vào giỏ hàng thành công");
      } else {
        toast.success("Sản phẩm đã được thêm vào giỏ hàng");
      }
      state.totalAmount = state.cartItems.reduce(
        (total, item) => total + Number(item.price) * 1,
        0
      );
    },

    deleteItem(state, action: PayloadAction<number>) {
      const id = action.payload;
      const existingItem = state.cartItems.find((item) => item.id === id);
      if (existingItem) {
        state.cartItems = state.cartItems.filter((item) => item.id !== id);
        state.totalQuantity = state.totalQuantity - existingItem.quantity;
      }

      state.totalAmount = state.cartItems.reduce(
        (total, item) => total + Number(item.price) * Number(item.quantity),
        0
      );
    },

    completeOrder(state) {
      (state.cartItems = []), (state.totalQuantity = 0), (state.totalAmount = 0);
    },
  },
});

export const { addItem, removeItem, deleteItem, completeOrder } = cartSlice.actions;
export default cartSlice.reducer;
