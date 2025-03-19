"use client";

import { useState } from "react";
import { HiX } from "react-icons/hi";
import { IoMdCheckmark } from "react-icons/io";
import { AiOutlineGift } from "react-icons/ai";
import { MdPercent } from "react-icons/md";

type PromotionType = "discount" | "product";

export type Promotion = {
  promotion_id: number;
  name: string;
  reward_description: string;
  reward_type: PromotionType;
  reward_conditions: string;
  reward_id: number;
  discount: number;
  program_type: string;
  coupon_code: string | null;
  reward_product_name: string | null;
  reward_product_price: number | null;
};

interface PromotionModalProps {
  isOpen: boolean;
  onClose: () => void;
  promotions: Promotion[];
  handleConfirm: (promotionId: number) => void;
}

export function PromotionModal({
  isOpen,
  onClose,
  promotions,
  handleConfirm,
}: PromotionModalProps) {
  const [selectedPromotion, setSelectedPromotion] = useState<number | null>(null);
  if (!isOpen) return null;
  const handleApplyPromotion = (promotionId: number) => {
    setSelectedPromotion(selectedPromotion ? null : promotionId);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="relative w-full max-w-md max-h-[90vh] overflow-auto bg-white rounded-lg shadow-lg p-6 mx-2">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <HiX size={20} />
        </button>

        <div className="mb-6">
          <h2 className="text-2xl font-bold text-[#ff5a76] mb-2">Chương trình khuyến mãi</h2>
          <p className="text-gray-600">
            Chọn một trong các chương trình khuyến mãi dưới đây để áp dụng cho đơn hàng của bạn
          </p>
        </div>

        <div className="space-y-4">
          {promotions?.map((promotion) => (
            <div
              key={promotion.promotion_id}
              className={`border rounded-lg p-4 transition-colors ${
                selectedPromotion === promotion.promotion_id
                  ? "border-[#ff5a76] bg-[#fff5f7]"
                  : "border-gray-200 hover:border-[#ff5a76]"
              }`}
            >
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-2">
                  {promotion.reward_type === "discount" ? (
                    <MdPercent className="text-[#ff5a76]" size={20} />
                  ) : (
                    <AiOutlineGift className="text-[#ff5a76]" size={20} />
                  )}
                  <h3 className="font-bold text-[16px]">{promotion.name}</h3>
                </div>
                <span className="text-[#ff5a76] font-bold">
                  {promotion.reward_type === "discount"
                    ? promotion.discount + "%"
                    : Number(promotion.reward_product_price).toLocaleString("vi-VN") + "đ"}
                </span>
              </div>

              <p className="text-gray-600 text-sm mb-3">{promotion.reward_description}</p>

              {/* {promotion.type === "FREE_PRODUCT"  && (
                <div className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg mb-3">
                  <span className="text-sm font-medium">{promotion.freeProduct.name}</span>
                </div>
              )} */}

              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500">{promotion.reward_conditions}</span>

                {selectedPromotion === promotion.promotion_id ? (
                  <div className="flex items-center gap-1 text-[#ff5a76] font-medium">
                    <IoMdCheckmark size={16} />
                    <span>Đã chọn</span>
                  </div>
                ) : (
                  <button
                    className="px-3 py-1 bg-[#ff5a76] text-white rounded-lg text-sm hover:bg-[#ff4367] transition-colors"
                    onClick={() => handleApplyPromotion(promotion.promotion_id)}
                  >
                    Áp dụng
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={() => {
              setSelectedPromotion(null);
              onClose();
            }}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg transition-colors"
          >
            Hủy
          </button>
          <button
            onClick={() =>
              selectedPromotion != null &&
              handleConfirm(selectedPromotion) &&
              setSelectedPromotion(null)
            }
            disabled={!selectedPromotion}
            className={`px-4 py-2 rounded-lg transition-colors ${
              selectedPromotion
                ? "bg-[#ff5a76] hover:bg-[#ff4367] text-white"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
          >
            Xác nhận
          </button>
        </div>
      </div>
    </div>
  );
}
