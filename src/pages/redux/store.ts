import { configureStore } from "@reduxjs/toolkit";
import type { TypedUseSelectorHook } from "react-redux";
import { useDispatch, useSelector, useStore } from "react-redux";

import loginSlice from "./features/loginSlice";
import cartSlice from "./features/cartSlice";
import oderSlice from "./features/oderSlice";
import { loadState, saveState } from "../localStorage/localStorage";

const persistedCartState = loadState();

export const makeStore = () => {
  const store = configureStore({
    reducer: {
      login: loginSlice,
      cart: cartSlice,
      oder: oderSlice,
    },
    // Tải lại state của giỏ hàng nếu có từ LocalStorage
    preloadedState: {
      cart: persistedCartState || undefined,
    },
  });

  // Lắng nghe thay đổi trong store để lưu state vào LocalStorage
  store.subscribe(() => {
    const state = store.getState();
    saveState(state.cart); // Lưu chỉ state của giỏ hàng
  });

  return store;
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppStore: () => AppStore = useStore;
