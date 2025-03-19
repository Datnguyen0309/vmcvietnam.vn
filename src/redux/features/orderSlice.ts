// src/redux/slices/orderSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem } from "./cartSlice";
export interface CartItemOrder extends CartItem {
  product_id: number;
  price_unit: number;
  quantity: number;
  name :string
  is_reward_line?: boolean;
}
export interface OrderState {
  order_id: number | null;
  items: CartItemOrder[]; // có thể định nghĩa kiểu chi tiết dựa theo dữ liệu API trả về
  total_price: number;
}

const initialState: OrderState = {
  order_id: null,
  items: [],
  total_price: 0,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setOrder: (state, action: PayloadAction<OrderState>) => {
      state.order_id = action.payload.order_id;
      state.items = action.payload.items;
      state.total_price = action.payload.total_price;
    },
    clearOrder: (state) => {
      state.order_id = null;
      state.items = [];
      state.total_price = 0;
    },
    deleteCart: (state) => {
      state.items = [];
      state.total_price = 0;
    },
  },
});

export const { setOrder, clearOrder } = orderSlice.actions;
export default orderSlice.reducer;
