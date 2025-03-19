import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export interface CartItem {
  product_id: number;
  name?: string;
  price_unit: number;
  image?: string;
  quantity: number;
  is_reward_line?: boolean;
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
    addItem(state, action: PayloadAction<CartItem>) {
      const newItem = action.payload;
      const existingItem = state.cartItems.find((item) => item.product_id === newItem.product_id);

      if (!existingItem) {
        state.cartItems.push({
          product_id: newItem.product_id,
          name: newItem.name,
          price_unit: newItem.price_unit,
          image: newItem.image,
          quantity: 1,
        });
        state.totalQuantity++;
        toast.success("Thêm sản phẩm vào giỏ hàng thành công");
      } else {
        toast.success("Sản phẩm đã được thêm vào giỏ hàng");
      }
      state.totalAmount = state.cartItems.reduce(
        (total, item) => total + Number(item.price_unit) * 1,
        0
      );
    },

    deleteItem(state, action: PayloadAction<number>) {
      const id = action.payload;
      const existingItem = state.cartItems.find((item) => item.product_id === id);
      if (existingItem) {
        state.cartItems = state.cartItems.filter((item) => item.product_id !== id);
        state.totalQuantity = state.totalQuantity - existingItem.quantity;
      }

      state.totalAmount = state.cartItems.reduce(
        (total, item) => total + Number(item.price_unit) * Number(item.quantity),
        0
      );
    },
    clearCart: (state) => {
      state.cartItems = [];
      state.totalQuantity = 0;
      state.totalAmount = 0;
    },
  },
});

export const { addItem, deleteItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
