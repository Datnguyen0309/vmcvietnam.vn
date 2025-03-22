"use client"

import { useState } from "react"
import { Gift, Percent, X, Check } from "lucide-react"

type PromotionType = "discount" | "product"

export type Promotion = {
  promotion_id: number
  name: string
  reward_description: string
  reward_type: PromotionType
  reward_conditions: string
  reward_id: number
  discount: number
  program_type: string
  coupon_code: string | null
  reward_product_name: string | null
  reward_product_price: number | null
}

interface PromotionModalProps {
  isOpen: boolean
  onClose: () => void
  promotions: Promotion[]
  handleConfirm: (promotionId: number) => void
}

export function PromotionModal({ isOpen, onClose, promotions, handleConfirm }: PromotionModalProps) {
  const [selectedPromotion, setSelectedPromotion] = useState<number | null>(null)

  if (!isOpen) return null

  const handleApplyPromotion = (promotionId: number) => {
    setSelectedPromotion(selectedPromotion === promotionId ? null : promotionId)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="relative w-full max-w-md max-h-[90vh] overflow-auto bg-white rounded-xl shadow-xl p-6 mx-2 border border-gray-100">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-100"
          aria-label="Đóng"
        >
          <X size={20} />
        </button>

        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-full bg-[rgb(74,59,99)] flex items-center justify-center">
              <Gift className="h-4 w-4 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-[rgb(74,59,99)]">Chương trình khuyến mãi</h2>
          </div>
          <p className="text-gray-600 ml-10">
            Chọn một trong các chương trình khuyến mãi dưới đây để áp dụng cho đơn hàng của bạn
          </p>
        </div>

        <div className="space-y-4">
          {promotions?.map((promotion) => (
            <div
              key={promotion.promotion_id}
              className={`border-2 rounded-xl p-5 transition-all cursor-pointer ${
                selectedPromotion === promotion.promotion_id
                  ? "border-[rgb(74,59,99)] bg-[rgb(74,59,99)]/5 shadow-md"
                  : "border-gray-200 hover:border-[rgb(74,59,99)]/50 hover:shadow-sm"
              }`}
              onClick={() => handleApplyPromotion(promotion.promotion_id)}
            >
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-start gap-3">
                  <div
                    className={`p-2 rounded-full ${
                      selectedPromotion === promotion.promotion_id
                        ? "bg-[rgb(74,59,99)] text-white"
                        : "bg-[rgb(74,59,99)]/10 text-[rgb(74,59,99)]"
                    }`}
                  >
                    {promotion.reward_type === "discount" ? (
                      <Percent className="h-5 w-5" />
                    ) : (
                      <Gift className="h-5 w-5" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-bold text-[16px] text-gray-800">{promotion.name}</h3>
                    <p className="text-gray-600 text-sm mt-1">{promotion.reward_description}</p>
                  </div>
                </div>
                <span className="text-[rgb(74,59,99)] font-bold text-lg">
                  {promotion.reward_type === "discount"
                    ? promotion.discount + "%"
                    : Number(promotion.reward_product_price).toLocaleString("vi-VN") + "đ"}
                </span>
              </div>

              <div className="flex justify-between items-center mt-4">
                <span className="text-xs italic text-gray-500">*{promotion.reward_conditions}</span>

                {selectedPromotion === promotion.promotion_id ? (
                  <div className="flex items-center gap-1.5 text-[rgb(74,59,99)] font-medium">
                    <div className="w-5 h-5 rounded-full bg-[rgb(74,59,99)] flex items-center justify-center">
                      <Check size={12} className="text-white" />
                    </div>
                    <span>Đã chọn</span>
                  </div>
                ) : (
                  <div className="w-20 h-7"></div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex justify-end gap-3">
          <button
            onClick={() => {
              setSelectedPromotion(null)
              onClose()
            }}
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-5 py-2.5 rounded-lg transition-colors font-medium"
          >
            Hủy
          </button>
          <button
            onClick={() => {
              if (selectedPromotion != null) {
                handleConfirm(selectedPromotion)
                setSelectedPromotion(null)
              }
            }}
            disabled={!selectedPromotion}
            className={`px-5 py-2.5 rounded-lg transition-colors font-medium ${
              selectedPromotion
                ? "bg-[rgb(74,59,99)] hover:bg-[rgb(94,79,119)] text-white"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
          >
            Xác nhận
          </button>
        </div>
      </div>
    </div>
  )
}

