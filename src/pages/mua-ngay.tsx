"use client"

import type { Promotion } from "@/components/PromotionModal"
import { PromotionModal } from "@/components/PromotionModal"
import { ToastContainer, ToastOptions } from "@/components/ui/a"
import { Button } from "@/components/ui/button"
import type { CartItem } from "@/redux/features/cartSlice"
import { setOrder } from "@/redux/features/orderSlice"
import { applyPromotion } from "@/redux/features/promotionSlice"
import { useAppDispatch, useAppSelector } from "@/redux/store"
import { addToCartThunk, applyPromoCodeThunk, applyPromotionThunk, createOrderThunk, removePromotionThunk } from "@/redux/thunks/oderThunks"
import { fetchPromotions } from "@/utils/fetch-auth-odoo"
import { ArrowRight, CheckCircle, ShoppingBag, Tag } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

export default function MuaNgayPage() {
    const router = useRouter()
    const dispatch = useAppDispatch()
    const order = useAppSelector((state) => state.order)
    const rewardItems = order.items.filter((item) => item.is_reward_line === true)
    const [item, setItem] = useState<CartItem | null>(null)
    const totalPrice = item
        ? item.price_unit * item.quantity -
        rewardItems.reduce((sum, ri) => sum - ri.price_unit * ri.quantity, 0)
        : 0
    const [promoCode, setPromoCode] = useState("")
    const [promotions, setPromotions] = useState<Promotion[]>([])
    const [isModalOpen, setModalOpen] = useState(false)
    const [promoSuccess, setPromoSuccess] = useState(false)
    const openModal = () => setModalOpen(true)
    const closeModal = () => setModalOpen(false)

    const showToast = (options: ToastOptions) => {
        if (typeof window !== "undefined" && (window as any).showToast) {
            ; (window as any).showToast(options)
        }
    }

    const isTrial = router.query?.type === "trial"
    const isMuaNgay = router.query?.type === "mua-ngay" || isTrial

    useEffect(() => {
        if (isMuaNgay) {
            const stored = localStorage.getItem("mua_ngay_item")
            if (stored) {
                const parsed: CartItem = JSON.parse(stored)
                if (isTrial) {
                    parsed.price_unit = 100000
                    parsed.name
                }
                setItem(parsed)

                dispatch(
                    setOrder({
                        order_id: null,
                        items: [],
                        total_price: 0,
                    }),
                )
            }
        }
    }, [isMuaNgay, isTrial, dispatch])


    useEffect(() => {
        const handleCreate = async () => {
            if (item && !order.order_id) {
                await dispatch(createOrderThunk())
            }
        }
        handleCreate()
    }, [item, order.order_id, dispatch])

    useEffect(() => {
        const handleAddToOrder = async () => {
            if (item && order.order_id && order.items.length === 0) {
                await dispatch(addToCartThunk(item))
            }
        }
        handleAddToOrder()
    }, [item, order.order_id, order.items.length, dispatch])

    useEffect(() => {
        const loadPromotions = async () => {
            if (order.order_id) {
                try {
                    const response = await fetchPromotions(Number(order.order_id))
                    if (response?.data) setPromotions(response.data)
                } catch (error) {
                    console.error("Lỗi khi lấy danh sách khuyến mãi:", error)
                }
            }
        }
        loadPromotions()
    }, [order.order_id, isModalOpen])

    const handleApplyPromoCode = async (promo_code: string) => {
        if (!order.order_id) {
            await dispatch(createOrderThunk())
        }
        try {
            const response = await dispatch(applyPromoCodeThunk(promo_code))
            if (response.payload.success) {
                setPromoSuccess(true)
                setTimeout(() => setPromoSuccess(false), 3000)
                showToast({
                    message: "Áp dụng mã thành công!",
                    type: "success",
                })
            } else {
                showToast({
                    message: "Mã không hợp lệ.",
                    type: "error",
                })
            }
        } catch (error) {
            console.error("Lỗi khi áp dụng mã:", error)
            showToast({
                message: "Đã xảy ra lỗi khi áp dụng mã.",
                type: "error",
            })
        }
    }

    const handleRemovePromotion = async () => {
        try {
            await dispatch(removePromotionThunk())
            showToast({
                message: "Đã xóa chương trình khuyến mãi.",
                type: "info",
            })
        } catch (error) {
            console.error("Lỗi khi xóa khuyến mãi:", error)
            showToast({
                message: "Đã xảy ra lỗi khi xóa khuyến mãi.",
                type: "error",
            })
        }
    }

    const handleConfirmPromotion = async (promotion_id: number) => {
        if (!promotion_id) return
        await dispatch(applyPromotionThunk(promotion_id))
        const selected = promotions.find((p) => p.promotion_id === promotion_id)
        if (selected) dispatch(applyPromotion(selected))
        showToast({
            message: "Áp dụng chương trình khuyến mãi thành công!",
            type: "success",
        })
        setModalOpen(false)
    }

    const handleCheckout = () => {
        localStorage.removeItem("mua_ngay_item")
        router.push("/xac-nhan-thong-tin")
    }

    if (!item)
        return (
            <div className="min-h-[60vh] flex items-center justify-center bg-gradient-to-b from-white to-gray-50">
                <div className="text-center p-8 max-w-md">
                    <ShoppingBag className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                    <p className="text-xl font-medium text-gray-600">Không có sản phẩm để mua ngay</p>
                    <Button className="mt-6 bg-[#4A306D] hover:bg-[#5b3d85]" onClick={() => router.push("/")}>
                        Quay lại trang chủ
                    </Button>
                </div>
            </div>
        )

    return (
        <div className="bg-gradient-to-b from-white to-gray-50">
            <ToastContainer />
            <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <div className="flex items-center mb-8">
                    <h1 className="text-3xl font-bold text-[#4A306D]">Mua Ngay</h1>
                    <div className="ml-auto flex items-center text-sm text-gray-500">
                        <span>Giỏ hàng</span>
                        <ArrowRight className="w-4 h-4 mx-2" />
                        <span className="font-medium text-[#4A306D]">Mua ngay</span>
                        <ArrowRight className="w-4 h-4 mx-2" />
                        <span>Thanh toán</span>
                    </div>
                </div>

                <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                    <div className="md:flex">
                        {/* Product Image Section */}
                        <div className="md:w-2/5 bg-gray-50 p-6 flex items-center justify-center">
                            <div className="relative w-full aspect-square max-w-xs">
                                <Image
                                    src={item.image || "/placeholder.svg?height=400&width=400"}
                                    alt={item.name || "Sản phẩm"}
                                    fill
                                    className="object-contain rounded-lg"
                                />
                            </div>
                        </div>

                        {/* Product Details Section */}
                        <div className="md:w-3/5 p-6 md:p-8">
                            <h2 className="text-2xl font-bold text-gray-800 mb-4">{item.name}</h2>

                            <div className="space-y-4 mb-8">
                                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                                    <span className="text-gray-600">Giá gốc:</span>
                                    <span className="text-lg">{item.price_unit.toLocaleString("vi-VN")} đ</span>
                                </div>
                                {!isTrial && rewardItems.length > 0 && (
                                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                                        <div className="flex items-center text-green-600">
                                            <CheckCircle className="w-4 h-4 mr-2" />
                                            <span>Giảm giá:</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-lg text-green-600">
                                                -{(rewardItems[0].price_unit * rewardItems[0].quantity).toLocaleString("vi-VN")} đ
                                            </span>
                                            <button
                                                onClick={handleRemovePromotion}
                                                className="text-sm text-red-500 hover:underline"
                                            >
                                                Xóa
                                            </button>
                                        </div>
                                    </div>
                                )}
                                <div className="flex justify-between items-center py-3">
                                    <span className="text-gray-800 font-medium">Tổng cộng:</span>
                                    <span className="text-2xl font-bold text-[#4A306D]">{totalPrice.toLocaleString("vi-VN")} đ</span>
                                </div>
                            </div>
                            {!isTrial && (
                                <div className="bg-gray-50 p-4 rounded-xl mb-6">
                                    <p className="font-medium text-[#4A306D] mb-3">Mã khuyến mãi</p>
                                    <div className="flex gap-2">
                                        <div className="relative flex-1">
                                            <input
                                                type="text"
                                                className="border border-gray-200 px-4 py-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-[#4A306D]"
                                                placeholder="Nhập mã khuyến mãi"
                                                value={promoCode}
                                                onChange={(e) => setPromoCode(e.target.value)}
                                            />
                                            {promoSuccess && (
                                                <div className="absolute right-0 top-0 bottom-0 flex items-center pr-3 text-green-500">
                                                    <CheckCircle className="w-5 h-5" />
                                                </div>
                                            )}
                                        </div>
                                        <Button
                                            onClick={() => handleApplyPromoCode(promoCode)}
                                            disabled={!promoCode}
                                            className="bg-[#4A306D] hover:bg-[#5b3d85]"
                                        >
                                            Áp dụng
                                        </Button>
                                    </div>
                                    {promoSuccess && <p className="text-green-500 text-sm mt-2">Áp dụng mã thành công!</p>}
                                </div>
                            )}
                            {!isTrial && (<Button
                                variant="outline"
                                className="w-full mb-6 border-[#4A306D] text-[#4A306D] hover:bg-[#4A306D] hover:text-white"
                                onClick={openModal}
                            >
                                <Tag className="w-4 h-4 mr-2" /> Xem chương trình khuyến mãi
                            </Button>)}
                            <Button
                                className="w-full py-6 text-lg bg-[#4A306D] hover:bg-[#5b3d85] transition-all duration-300 shadow-lg hover:shadow-xl"
                                style={{
                                    borderTopLeftRadius: "15px",
                                    borderBottomRightRadius: "15px",
                                }}
                                onClick={handleCheckout}
                            >
                                <ShoppingBag className="w-5 h-5 mr-2" /> Tiến hành thanh toán
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
            <PromotionModal
                isOpen={isModalOpen}
                onClose={closeModal}
                promotions={promotions}
                handleConfirm={handleConfirmPromotion}
            />
        </div>
    )
}
