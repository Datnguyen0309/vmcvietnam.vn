// src/redux/thunks/orderThunks.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { addItem, CartItem, deleteItem } from "../features/cartSlice";
import { CartItemOrder, OrderState, setOrder } from "../features/orderSlice";
import nookies from "nookies"; // To handle cookies
import { toast } from "react-toastify";
import { applyPromotion, clearPromotion } from "../features/promotionSlice";
import {
  fetchApplyPromoCode,
  fetchApplyPromotion,
  fetchUpdateOrder,
  handleCreateOrder,
  OrderItem,
} from "@/utils/fetch-auth-odoo";
import { Promotion } from "@/components/PromotionModal";

export const addToCartThunk = createAsyncThunk(
  "cart/addToCartThunk",
  async (product: CartItem, { dispatch, getState }) => {
    // Optimistic update: cập nhật giỏ hàng ngay lập tức
    dispatch(addItem(product));

    const state = getState() as RootState;
    const order_id = state.order.order_id;
    const cartItems = state.cart.cartItems; // Lấy danh sách sản phẩm hiện tại
    const cookies = nookies.get();
    const sessionLogId = cookies.session_log_id;
    const user = state.login.user;
    let orderData;
    dispatch(clearPromotion());
    if (!order_id) {
      // Nếu chưa có orderId → tạo mới đơn hàng
      orderData = await handleCreateOrder({
        partner_name: sessionLogId ? user.name : "public",
        partner_email: sessionLogId ? user.email : "public@gmail.com",
        partner_phone: sessionLogId ? user.phone : "09999999999",
        items: cartItems as CartItemOrder[],
      });
      // handleCreateOrder trả về dữ liệu đơn hàng (nếu thành công, có field success: true)
      if (orderData.error) {
        throw new Error(orderData.error);
      }
    } else {
      // Nếu đã có orderId → cập nhật đơn hàng

      orderData = await fetchUpdateOrder(
        Number(order_id), // Chuyển order_id về number nếu cần
        sessionLogId ? user.name : "public",
        sessionLogId ? user.email : "public@gmail.com",
        sessionLogId ? user.phone : "09999999999",
        cartItems as OrderItem[] // items
      );
      if (!orderData.success) {
        throw new Error(orderData.message);
      }
    }

    // Cập nhật orderSlice với dữ liệu trả về từ API
    dispatch(setOrder(orderData.data as OrderState));
    return orderData;
  }
);

export const createOrderThunk = createAsyncThunk(
  "cart/createOrderThunk",
  async (_, { dispatch, getState }) => {
    // Optimistic update: cập nhật giỏ hàng ngay lập tức

    const state = getState() as RootState;
    const cartItems = state.cart.cartItems; // Lấy danh sách sản phẩm hiện tại
    const cookies = nookies.get();
    const sessionLogId = cookies.session_log_id;
    const order_id = state.order.order_id;
    const user = state.login.user;
    let orderData;
    dispatch(clearPromotion());
    if (!order_id) {
      // Nếu chưa có orderId → tạo mới đơn hàng
      orderData = await handleCreateOrder({
        partner_name: sessionLogId ? user.name : "public",
        partner_email: sessionLogId ? user.email : "public@gmail.com",
        partner_phone: sessionLogId ? user.phone : "09999999999",
        items: cartItems as CartItemOrder[],
      });
      // handleCreateOrder trả về dữ liệu đơn hàng (nếu thành công, có field success: true)
      if (orderData.error) {
        throw new Error(orderData.error);
      }
    }

    // Cập nhật orderSlice với dữ liệu trả về từ API
    dispatch(setOrder(orderData.data as OrderState));
    return orderData;
  }
);

export const deleteFromCartThunk = createAsyncThunk(
  "cart/deleteFromCartThunk",
  async (product_id: number, { dispatch, getState }) => {
    // Optimistic update: cập nhật giỏ hàng ngay lập tức
    dispatch(deleteItem(product_id));

    const state = getState() as RootState;
    const order_id = state.order.order_id;
    const cartItems = state.cart.cartItems; // Lấy danh sách sản phẩm hiện tại
    const cookies = nookies.get();
    const sessionLogId = cookies.session_log_id;
    const user = state.login.user;
    let orderData;
    dispatch(clearPromotion());
    if (!order_id) {
      // Nếu chưa có orderId → tạo mới đơn hàng
      orderData = await handleCreateOrder({
        partner_name: sessionLogId ? user.name : "public",
        partner_email: sessionLogId ? user.email : "public@gmail.com",
        partner_phone: sessionLogId ? user.phone : "09999999999",
        items: cartItems as CartItemOrder[],
      });
      // handleCreateOrder trả về dữ liệu đơn hàng (nếu thành công, có field success: true)
      if (orderData.error) {
        throw new Error(orderData.error);
      }
    } else {
      // Nếu đã có orderId → cập nhật đơn hàng

      orderData = await fetchUpdateOrder(
        Number(order_id), // Chuyển order_id về number nếu cần
        sessionLogId ? user.name : "public",
        sessionLogId ? user.email : "public@gmail.com",
        sessionLogId ? user.phone : "09999999999",
        cartItems ? (cartItems as OrderItem[]) : [] // items
      );
      if (!orderData.success) {
        throw new Error(orderData.message);
      }
    }

    // Cập nhật orderSlice với dữ liệu trả về từ API
    dispatch(setOrder(orderData.data as OrderState));
    return orderData;
  }
);

export const applyPromotionThunk = createAsyncThunk(
  "promotion/applyPromotionThunk",
  async (promotion_id: number, { dispatch, getState }) => {
    const state = getState() as RootState;
    const order_id = state.order.order_id;

    if (!order_id) {
      throw new Error("Order chưa được tạo");
    }

    const response = await fetchApplyPromotion(order_id, promotion_id);

    dispatch(setOrder(response.data as OrderState));

    return response;
  }
);

export const applyPromoCodeThunk = createAsyncThunk(
  "promotion/applyPromoCodeThunk",
  async (promo_code: string, { dispatch, getState }) => {
    const state = getState() as RootState;
    const order_id = state.order.order_id;

    if (!order_id) {
      throw new Error("Order chưa được tạo");
    }
    dispatch(clearPromotion());
    const response = await fetchApplyPromoCode(order_id, promo_code);
    if (!response.success) {
      toast.error(response.message);
      return response;
    }
    dispatch(setOrder(response.data as OrderState));
    dispatch(applyPromotion(response.data.reward as Promotion));
    return response;
  }
);

export const removePromotionThunk = createAsyncThunk(
  "promotion/removePromotionThunk",
  async (_, { dispatch, getState }) => {
    // Optimistic update: cập nhật giỏ hàng ngay lập tức

    const state = getState() as RootState;
    const order_id = state.order.order_id;
    const cartItems = state.cart.cartItems; // Lấy danh sách sản phẩm hiện tại
    const cookies = nookies.get();
    const sessionLogId = cookies.session_log_id;
    const user = state.login.user;
    let orderData;
    dispatch(clearPromotion());
    if (!order_id) {
      // Nếu chưa có orderId → tạo mới đơn hàng
      orderData = await handleCreateOrder({
        partner_name: sessionLogId ? user.name : "public",
        partner_email: sessionLogId ? user.email : "public@gmail.com",
        partner_phone: sessionLogId ? user.phone : "09999999999",
        items: cartItems as CartItemOrder[],
      });
      // handleCreateOrder trả về dữ liệu đơn hàng (nếu thành công, có field success: true)
      if (orderData.error) {
        throw new Error(orderData.error);
      }
    } else {
      // Nếu đã có orderId → cập nhật đơn hàng

      orderData = await fetchUpdateOrder(
        Number(order_id), // Chuyển order_id về number nếu cần
        sessionLogId ? user.name : "public",
        sessionLogId ? user.email : "public@gmail.com",

        sessionLogId ? user.phone : "09999999999",
        cartItems // items
      );
      if (!orderData.success) {
        throw new Error(orderData.message);
      }
    }

    // Cập nhật orderSlice với dữ liệu trả về từ API
    dispatch(setOrder(orderData.data as OrderState));
    return orderData;
  }
);
