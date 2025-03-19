// src/redux/slices/promotionSlice.ts
import { Promotion } from "@/components/PromotionModal";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface PromotionState {
  currentPromotion: Promotion | null;
}

const initialState: PromotionState = {
  currentPromotion: null,
};

const promotionSlice = createSlice({
  name: "promotion",
  initialState,
  reducers: {
    applyPromotion: (state, action: PayloadAction<Promotion>) => {
      state.currentPromotion = action.payload;
    },
    clearPromotion: (state) => {
      state.currentPromotion = null;
    },
  },
});

export const { applyPromotion, clearPromotion } = promotionSlice.actions;
export default promotionSlice.reducer;
