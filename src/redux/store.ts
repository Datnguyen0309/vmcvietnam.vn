import { configureStore } from "@reduxjs/toolkit";
import type { TypedUseSelectorHook } from "react-redux";
import { useDispatch, useSelector, useStore } from "react-redux";

import loginSlice from "./features/loginSlice";
import { loadState, saveState } from "@/localStorage/localStorage";
import cartSlice from "./features/cartSlice";
import promotionSlice from "./features/promotionSlice";
import orderSlice from "./features/orderSlice";

const persistedCartState = loadState({ state: "cartState" });
const persistedLoginState = loadState({ state: "loginState" });
const persistedOrderState = loadState({ state: "orderState" });
const persistedPromotionState = loadState({ state: "promotionState" });

export const makeStore = () => {
  const store = configureStore({
    reducer: {
      login: loginSlice,
      cart: cartSlice,
      order: orderSlice,
      promotion: promotionSlice,
    },
    // Tải lại state của giỏ hàng nếu có từ LocalStorage
    preloadedState: {
      cart: persistedCartState || undefined,
      login: persistedLoginState || undefined,
      order: persistedOrderState || undefined,
      promotion: persistedPromotionState || undefined,
    },
  });

  // Lắng nghe thay đổi trong store để lưu state vào LocalStorage
  store.subscribe(() => {
    const state = store.getState();
    saveState({ state: state.cart, stateType: "cartState" }); // Lưu chỉ state của giỏ hàng
    saveState({ state: state.login, stateType: "loginState" }); // Lưu chỉ state của đăng nhập
    saveState({ state: state.order, stateType: "orderState" }); // Lưu chỉ state của đơn hàng
    saveState({ state: state.promotion, stateType: "promotionState" }); // Lưu chỉ state của khuyến mãi
  });

  return store;
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppStore: () => AppStore = useStore;
