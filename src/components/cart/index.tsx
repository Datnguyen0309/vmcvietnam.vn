"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { BreadCrumb } from "@/components/BreadCrumb"
import type { CartItem } from "@/redux/features/cartSlice"
import { useAppDispatch, useAppSelector } from "@/redux/store"
import { useDispatch } from "react-redux"
import { useRouter } from "next/router"
import { type Promotion, PromotionModal } from "@/components/PromotionModal"
import { fetchPromotions } from "@/utils/fetch-auth-odoo"
import {
  applyPromoCodeThunk,
  applyPromotionThunk,
  createOrderThunk,
  deleteFromCartThunk,
  removePromotionThunk,
} from "@/redux/thunks/oderThunks"
import { toast } from "react-toastify"
import { applyPromotion } from "@/redux/features/promotionSlice"
import { Gift, Percent, X, ShoppingBag, Trash2, Tag, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

export default function ShoppingCart() {
  const cartItems: CartItem[] = useAppSelector((state) => state.cart.cartItems)
  const rewardItems: CartItem[] = useAppSelector((state) =>
    state.order.items.filter((item) => item.is_reward_line === true),
  )
  const totalAmount: number = useAppSelector((state) => state.cart.totalAmount)
  const totalPrice: number = useAppSelector((state) => state.order.total_price)
  const [promotions, setPromotions] = useState<Promotion[]>([])
  const dispatchApp = useAppDispatch()

  const dispatch = useDispatch()
  const router = useRouter()
  const [promoCode, setPromoCode] = useState("")
  const [isModalOpen, setModalOpen] = useState(false)
  const openModal = () => setModalOpen(true)
  const closeModal = () => setModalOpen(false)
  const order_id = useAppSelector((state) => state.order.order_id)
  const promotion = useAppSelector((state) => state.promotion.currentPromotion)

  useEffect(() => {
    const handleCallPromotion = async () => {
      try {
        const response = await fetchPromotions(Number(order_id))
        setPromotions(response?.data)
      } catch (error) {
        console.error("Error fetching promotions:", error)
      }
    }
    handleCallPromotion()
  }, [isModalOpen, order_id])

  const handleConfirm = async (selectedPromotion: number) => {
    try {
      if (selectedPromotion) {
        await dispatchApp(applyPromotionThunk(selectedPromotion))
        const promotionSelected = promotions.find((promo) => promo.promotion_id === selectedPromotion)
        promotionSelected && dispatch(applyPromotion(promotionSelected))
      }
      console.log("Áp dụng chương trình khuyến mãi thành công.")
    } catch (error) {
      console.error("Lỗi khi áp dụng chương trình khuyến mãi:", error)
    }
    toast.success("Đã áp dụng chương trình khuyến mãi thành công!")
    setModalOpen(false)
  }

  const handleConfirmCart = async () => {
    if (!order_id && cartItems.length > 0) {
      try {
        await dispatchApp(createOrderThunk())
        console.log("Tạo đơn hàng thành công.")
      } catch (error) {
        console.error("Lỗi khi tạo đơn hàng:", error)
      }
    } else if (cartItems.length === 0) {
      toast.error("Bạn cần thêm sản phẩm vào trong giỏ hàng")
      return
    }
    router.push("/xac-nhan-thong-tin")
  }

  const handleApplyPromoCode = async (promo_code: string) => {
    if (!order_id) {
      try {
        await dispatchApp(createOrderThunk())
        console.log("Tạo đơn hàng thành công.")
      } catch (error) {
        console.error("Lỗi khi tạo đơn hàng:", error)
      }
    }
    try {
      const response = await dispatchApp(applyPromoCodeThunk(promo_code))
      if (response.payload.success) {
        toast.success("Áp dụng mã khuyến mãi thành công.")
      } else {
        toast.error("Mã khuyến mãi không hợp lệ.")
      }
      console.log("Áp dụng mã khuyến mãi thành công.")
    } catch (error) {
      console.error("Lỗi khi áp dụng mã khuyến mãi:", error)
    }
    setModalOpen(false)
  }

  const handleDeleteFromCart = async ({ product_id }: { product_id: number }) => {
    try {
      await dispatchApp(deleteFromCartThunk(product_id))
      console.log("Sản phẩm đã được xóa khỏi giỏ hàng thành công.")
    } catch (error) {
      console.error("Lỗi khi xóa sản phẩm khỏi giỏ hàng:", error)
    }
  }

  const handleRemovePromotion = async () => {
    try {
      await dispatchApp(removePromotionThunk())
    } catch (error) {
      console.error("Lỗi khi xóa khuyến mãi:", error)
    }
  }

  const handleOpenModalCTKM = async () => {
    if (!order_id) {
      try {
        await dispatchApp(createOrderThunk())
        openModal()
        console.log("Tạo đơn hàng thành công.")
      } catch (error) {
        console.error("Lỗi khi tạo đơn hàng:", error)
      }
    } else {
      openModal()
    }
  }

  return (
    <>
      <div className="bg-[#f9f7fc] py-20">
        <div className="max-w-[1320px] mx-auto px-4 xl:px-6 pt-12 pb-16">
          <div className="flex items-center mb-8">
            <ShoppingBag className="w-6 h-6 mr-2 text-[rgb(74,59,99)]" />
            <h1 className="text-2xl font-bold text-[rgb(74,59,99)]">Giỏ hàng của bạn</h1>
          </div>

          <div className="flex flex-col xl:flex-row gap-8">
            {/* Cart Items */}
            <div className="flex-1">
              {cartItems.length === 0 ? (
                <Card className="shadow-md border-0">
                  <CardContent className="flex flex-col items-center justify-center py-16">
                    <ShoppingBag className="w-16 h-16 text-gray-300 mb-4" />
                    <p className="text-lg text-gray-500">Không có sản phẩm nào trong giỏ hàng</p>
                    <Button
                      className="mt-6 bg-[rgb(74,59,99)] hover:bg-[rgb(94,79,119)]"
                      onClick={() => router.push("/")}
                    >
                      Tiếp tục mua sắm
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <>
                  {/* Desktop Cart */}
                  <Card className="hidden xl:block shadow-md border-0 mb-6">
                    <CardHeader className="bg-[rgb(74,59,99)] text-white rounded-t-lg py-4">
                      <div className="grid grid-cols-12 gap-4">
                        <div className="col-span-7 font-medium">Sản phẩm</div>
                        <div className="col-span-3 font-medium">Giá tiền</div>
                        <div className="col-span-2 font-medium text-right">Thao tác</div>
                      </div>
                    </CardHeader>
                    <CardContent className="p-0">
                      {cartItems.map((item) => (
                        <div
                          key={item?.product_id}
                          className="grid grid-cols-12 gap-4 p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors"
                        >
                          <div className="col-span-7">
                            <div className="flex items-center gap-4">
                              <div className="relative w-16 h-16 rounded-md overflow-hidden border border-gray-200">
                                <Image
                                  src={item?.image || "/placeholder.svg?height=80&width=80"}
                                  alt={item?.name || "Product image"}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              <span className="font-medium text-gray-800">{item?.name}</span>
                            </div>
                          </div>
                          <div className="col-span-3 flex items-center">
                            <span className="font-semibold text-[rgb(74,59,99)]">
                              {(item?.price_unit * item?.quantity).toLocaleString("vi-VN")} đ
                            </span>
                          </div>
                          <div className="col-span-2 flex items-center justify-end">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-[rgb(74,59,99)] hover:text-red-500 hover:bg-red-50"
                              onClick={() => handleDeleteFromCart({ product_id: item.product_id })}
                            >
                              <Trash2 className="w-4 h-4 mr-1" />
                              Xóa
                            </Button>
                          </div>
                        </div>
                      ))}

                      {/* Reward Items */}
                      {rewardItems.length > 0 && (
                        <div className="bg-[#f5f0ff] p-2">
                          {rewardItems.map((item) => (
                            <div
                              key={item?.product_id}
                              className="grid grid-cols-12 gap-4 p-4 border-b border-purple-100"
                            >
                              <div className="col-span-7">
                                <div className="flex items-center gap-4">
                                  <Badge className="bg-[rgb(74,59,99)]">
                                    {promotion && promotion.reward_type === "discount" ? (
                                      <Percent className="w-4 h-4 mr-1" />
                                    ) : (
                                      <Gift className="w-4 h-4 mr-1" />
                                    )}
                                    Khuyến mãi
                                  </Badge>
                                  <span className="font-medium text-[rgb(74,59,99)]">{item?.name}</span>
                                </div>
                              </div>
                              <div className="col-span-3 flex items-center">
                                <span className="font-semibold text-[rgb(74,59,99)]">
                                  {(item?.price_unit * item?.quantity).toLocaleString("vi-VN")} đ
                                </span>
                              </div>
                              <div className="col-span-2"></div>
                            </div>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  {/* Mobile Cart */}
                  <div className="xl:hidden space-y-4">
                    {cartItems.map((item) => (
                      <Card key={item.product_id} className="shadow-sm border-0">
                        <CardContent className="p-4">
                          <div className="flex gap-4">
                            <div className="relative w-20 h-20 rounded-md overflow-hidden border border-gray-200">
                              <Image
                                src={item?.image || "/placeholder.svg?height=80&width=80"}
                                alt={item?.name || "Product image"}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="flex-1">
                              <h3 className="font-medium text-gray-800 mb-1">{item?.name}</h3>
                              <p className="text-[rgb(74,59,99)] font-semibold">
                                {(item?.price_unit * item?.quantity).toLocaleString("vi-VN")} đ
                              </p>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="mt-2 text-[rgb(74,59,99)] hover:text-red-500 hover:bg-red-50 p-0 h-auto"
                                onClick={() => handleDeleteFromCart({ product_id: item.product_id })}
                              >
                                <Trash2 className="w-4 h-4 mr-1" />
                                Xóa
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}

                    {/* Mobile Reward Items */}
                    {rewardItems.map((item) => (
                      <Card key={item.product_id} className="shadow-sm border-0 bg-[#f5f0ff]">
                        <CardContent className="p-4">
                          <div className="flex gap-4">
                            <Badge className="h-fit bg-[rgb(74,59,99)]">
                              {promotion && promotion.reward_type === "discount" ? (
                                <Percent className="w-4 h-4 mr-1" />
                              ) : (
                                <Gift className="w-4 h-4 mr-1" />
                              )}
                            </Badge>
                            <div className="flex-1">
                              <h3 className="font-medium text-[rgb(74,59,99)] mb-1">{item?.name}</h3>
                              <p className="text-[rgb(74,59,99)] font-semibold">
                                {(item?.price_unit * item?.quantity).toLocaleString("vi-VN")} đ
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  {/* Promotion Section */}
                  {promotion && (
                    <Card className="shadow-md border-0 mt-6 bg-[#f5f0ff]">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-start gap-3">
                            <div className="bg-[rgb(74,59,99)] text-white p-2 rounded-full">
                              {promotion.reward_type === "discount" ? (
                                <Percent className="w-5 h-5" />
                              ) : (
                                <Gift className="w-5 h-5" />
                              )}
                            </div>
                            <div>
                              <h3 className="font-medium text-[rgb(74,59,99)]">{promotion.name}</h3>
                              <p className="text-sm text-gray-600">{promotion.reward_description}</p>
                              <p className="text-xs italic text-gray-500 mt-1">
                                *{promotion?.reward_conditions || "Áp dụng cho tất cả sản phẩm"}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="font-semibold text-[rgb(74,59,99)]">
                              <span className="text-[rgb(74,59,99)] text-xl font-bold">
                                {promotion.reward_type === "discount"
                                  ? promotion.discount + "%"
                                  : Number(promotion.reward_product_price).toLocaleString("vi-VN") + "đ"}
                              </span>
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-[rgb(74,59,99)] hover:bg-purple-100"
                              onClick={handleRemovePromotion}
                            >
                              <X className="w-5 h-5" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {/* Coupon Section */}
                  <Card className="shadow-md border-0 mt-6">
                    <CardContent className="p-6">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-2">
                          <h3 className="font-medium text-[rgb(74,59,99)] mb-1">Mã giảm giá</h3>
                          <div className="flex">
                            <Input
                              type="text"
                              placeholder="Nhập mã giảm giá"
                              value={promoCode}
                              onChange={(e) => setPromoCode(e.target.value)}
                              className="rounded-r-none border-r-0 focus-visible:ring-[rgb(74,59,99)]"
                            />
                            <Button
                              disabled={!promoCode}
                              onClick={() => {
                                handleApplyPromoCode(promoCode)
                                setPromoCode("")
                              }}
                              className="rounded-l-none bg-[rgb(74,59,99)] hover:bg-[rgb(94,79,119)]"
                            >
                              Áp dụng
                            </Button>
                          </div>
                        </div>
                        <div className="flex flex-col gap-2">
                          <h3 className="font-medium text-[rgb(74,59,99)] mb-1">Chương trình khuyến mãi</h3>
                          <Button
                            variant="outline"
                            onClick={handleOpenModalCTKM}
                            className="border-[rgb(74,59,99)] text-[rgb(74,59,99)] hover:bg-[rgb(74,59,99)] hover:text-white"
                          >
                            <Tag className="w-4 h-4 mr-2" />
                            Xem khuyến mãi
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </>
              )}
            </div>

            {/* Order Summary */}
            <div className="w-full xl:w-[380px]">
              <Card className="shadow-md border-0 sticky top-4">
                <CardHeader className="bg-[rgb(74,59,99)] text-white rounded-t-lg pb-4">
                  <CardTitle className="text-xl font-semibold flex items-center">
                    <ShoppingBag className="w-5 h-5 mr-2" />
                    Thông tin đơn hàng
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex justify-between text-gray-600">
                      <span>Tạm tính</span>
                      <span>{totalAmount.toLocaleString("vi-VN")} đ</span>
                    </div>

                    {promotion && (
                      <div className="flex justify-between text-[rgb(74,59,99)] font-medium">
                        <span>Giảm giá</span>
                        <span>
                          {promotion && promotion.reward_type === "discount"
                            ? (rewardItems[0]?.price_unit * rewardItems[0]?.quantity).toLocaleString("vi-VN") + " đ"
                            : "-0 đ"}
                        </span>
                      </div>
                    )}

                    <Separator />

                    <div className="flex justify-between font-bold text-lg">
                      <span>Tổng cộng</span>
                      <span className="text-[rgb(74,59,99)]">
                        {totalPrice ? totalPrice.toLocaleString("vi-VN") : totalAmount.toLocaleString("vi-VN")} đ
                      </span>
                    </div>

                    <Button
                      onClick={handleConfirmCart}
                      disabled={cartItems.length === 0}
                      className="w-full bg-[rgb(74,59,99)] hover:bg-[rgb(94,79,119)] mt-4 py-6 text-base"
                    >
                      Tiến hành thanh toán
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>

                    <p className="text-xs text-gray-500 text-center mt-2">
                      Bằng cách tiến hành thanh toán, bạn đồng ý với các điều khoản và điều kiện của chúng tôi.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <PromotionModal isOpen={isModalOpen} onClose={closeModal} promotions={promotions} handleConfirm={handleConfirm} />
    </>
  )
}
