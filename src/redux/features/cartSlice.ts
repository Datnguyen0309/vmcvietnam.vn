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
          ...newItem,
          quantity: 1,
        });
        state.totalQuantity++;
        toast.success(`🎉 ${newItem.name || "Sản phẩm"} đã được thêm vào giỏ hàng!`);
      } else {
        toast.info(`🔄 ${newItem.name || "Sản phẩm"} đã có trong giỏ hàng.`);
      }

      state.totalAmount = state.cartItems.reduce(
        (total, item) => total + Number(item.price_unit) * item.quantity,
        0
      );
    },

    deleteItem(state, action: PayloadAction<number>) {
      const id = action.payload;
      const existingItem = state.cartItems.find((item) => item.product_id === id);
      if (existingItem) {
        state.cartItems = state.cartItems.filter((item) => item.product_id !== id);
        state.totalQuantity -= existingItem.quantity;
        toast.warning(`🗑️ Đã xóa ${existingItem.name || "sản phẩm"} khỏi giỏ hàng.`);
      } else {
        toast.info("⚠️ Không tìm thấy sản phẩm trong giỏ hàng.");
      }

      state.totalAmount = state.cartItems.reduce(
        (total, item) => total + Number(item.price_unit) * item.quantity,
        0
      );
    },

    clearCart: (state) => {
      if (state.cartItems.length > 0) {
        state.cartItems = [];
        state.totalQuantity = 0;
        state.totalAmount = 0;
        toast.success("🛒 Giỏ hàng đã được làm trống.");
      } else {
        toast.info("🚀 Giỏ hàng của bạn đã trống.");
      }
    },
  },
});

export const { addItem, deleteItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
