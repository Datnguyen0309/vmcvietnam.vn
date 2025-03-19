"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import Image from "next/image"
import { decryptOrderId } from "@/utils/decodeOrderID"
import { fetchOrderDetails } from "@/utils/fetch-auth-odoo"
import { paymentMethods } from "@/data/payment-methods"
import {
  CheckCircle,
  CreditCard,
  Package,
  ArrowRight,
  User,
  Phone,
  Mail,
  ShoppingBag,
  Receipt,
  Gift,
  Percent,
  Shield,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

export const PaymentMethod = () => {
  const [selectedMethod, setSelectedMethod] = useState("bank")
  const router = useRouter()
  const orderQuery = router?.query?.order_id as string
  const orderId = decryptOrderId(orderQuery)
  const [orderDetails, setOrderDetails] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleChooseMethod = async () => {
    setIsLoading(true)
    sessionStorage.removeItem("order_created")
    router.push(`/tien-hanh-thanh-toan?order_id=${encodeURIComponent(orderQuery)}`)
  }

  useEffect(() => {
    sessionStorage.removeItem("order_created")
    const getOrderDetails = async () => {
      if (orderId !== "") {
        try {
          const orderData = await fetchOrderDetails(Number(orderId))
          console.log("orderData", orderData)
          if (orderData?.success) {
            setOrderDetails(orderData?.data)
          } else {
            router.push(`/`)
          }
        } catch (error) {
          console.error("Error fetching order details:", error)
          router.push(`/`)
        }
      } else {
        router.push(`/`)
      }
    }
    getOrderDetails()
  }, [orderId, router])

  const promotion = orderDetails?.reward
  const rewardItems = orderDetails?.items?.filter((item: any) => item.is_reward_line)
  const total_amount = orderDetails?.items
    ?.filter((product: any) => !product.is_reward_line)
    .reduce((total: number, product: any) => total + product.price_unit * product.quantity, 0)

  return (
    <div className=" bg-[#f9f7fc]">
      <div className="bg-[rgb(74,59,99)] py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-white text-2xl font-bold text-center">Thanh toán đơn hàng</h1>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="bg-white shadow-md">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between">
            <div className="flex flex-col items-center py-4 w-1/3 relative">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[rgb(74,59,99)] text-white mb-2">
                <Package className="w-5 h-5" />
              </div>
              <span className="text-sm font-medium text-[rgb(74,59,99)]">Chọn phương thức</span>
              <div className="h-1 absolute bottom-0 left-0 right-0 bg-[rgb(74,59,99)]"></div>
            </div>

            <div className="flex flex-col items-center py-4 w-1/3 relative opacity-60">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-300 text-white mb-2">
                <CreditCard className="w-5 h-5" />
              </div>
              <span className="text-sm font-medium">Thanh toán</span>
            </div>

            <div className="flex flex-col items-center py-4 w-1/3 relative opacity-60">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-300 text-white mb-2">
                <CheckCircle className="w-5 h-5" />
              </div>
              <span className="text-sm font-medium">Hoàn tất</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md overflow-hidden sticky top-4">
              <div className="bg-[rgb(74,59,99)] text-white p-4">
                <h2 className="text-lg font-bold flex items-center">
                  <Receipt className="w-5 h-5 mr-2" />
                  Thông tin đơn hàng
                </h2>
              </div>

              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-500">Mã đơn hàng:</span>
                  <span className="font-medium">{orderDetails?.order_name || "Order name"}</span>
                </div>

                <Separator className="my-3" />

                <div className="space-y-3 mb-4">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-[rgb(74,59,99)]" />
                    <div className="text-sm">
                      <span className="text-gray-500 mr-1">Khách hàng:</span>
                      <span className="font-medium">{orderDetails?.partner_name || "Khách hàng"}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-[rgb(74,59,99)]" />
                    <div className="text-sm">
                      <span className="text-gray-500 mr-1">Email:</span>
                      <span className="font-medium">{orderDetails?.partner_email || "example@gmail.com"}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-[rgb(74,59,99)]" />
                    <div className="text-sm">
                      <span className="text-gray-500 mr-1">SĐT:</span>
                      <span className="font-medium">{orderDetails?.partner_phone || "0987654321"}</span>
                    </div>
                  </div>
                </div>

                <Separator className="my-3" />

                <div className="max-h-[200px] overflow-y-auto pr-1">
                  <h3 className="font-medium text-[rgb(74,59,99)] mb-3 flex items-center">
                    <ShoppingBag className="w-4 h-4 mr-2" />
                    Sản phẩm
                  </h3>

                  <div className="space-y-2">
                    {orderDetails?.items
                      ?.filter((product: any) => !product.is_reward_line)
                      .map((product: any, index: number) => (
                        <div key={index} className="flex justify-between text-sm">
                          <span className="font-medium">{product.name}</span>
                          <span className="font-semibold text-[rgb(74,59,99)]">
                            {product.price_unit.toLocaleString("vi-VN")} đ
                          </span>
                        </div>
                      ))}

                    {rewardItems?.map((product: any, index: number) => (
                      <div key={index} className="flex justify-between text-sm bg-[rgb(74,59,99)]/5 p-2 rounded">
                        <div className="flex items-center gap-1">
                          {promotion && promotion.reward_type === "discount" ? (
                            <Percent className="w-3 h-3 text-[rgb(74,59,99)]" />
                          ) : (
                            <Gift className="w-3 h-3 text-[rgb(74,59,99)]" />
                          )}
                          <span className="font-medium text-[rgb(74,59,99)]">{product.name}</span>
                        </div>
                        <span className="font-semibold text-[rgb(74,59,99)]">
                          {product.price_unit.toLocaleString("vi-VN")} đ
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-gray-50 p-4 mt-4 rounded-lg">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-500">Tạm tính:</span>
                    <span>{total_amount?.toLocaleString("vi-VN") || "0"} đ</span>
                  </div>

                  {promotion && (
                    <div className="flex justify-between text-sm text-[rgb(74,59,99)] mb-2">
                      <span>Giảm:</span>
                      <span>
                        {promotion?.reward_type === "discount"
                          ? (rewardItems[0]?.price_unit * rewardItems[0]?.quantity).toLocaleString("vi-VN") + " đ"
                          : "-0 đ"}
                      </span>
                    </div>
                  )}

                  <Separator className="my-2" />

                  <div className="flex justify-between font-bold">
                    <span>Tổng cộng:</span>
                    <span className="text-[rgb(74,59,99)]">
                      {orderDetails?.total_price?.toLocaleString("vi-VN") || "0"} đ
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Payment Methods */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-[rgb(74,59,99)] mb-6 flex items-center">
                <CreditCard className="w-5 h-5 mr-2" />
                Chọn phương thức thanh toán
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                {paymentMethods.map((method) => (
                  <div
                    key={method.value}
                    className={`
                      relative p-5 transition-all cursor-pointer rounded-xl
                      ${method.disabled ? "opacity-60 cursor-not-allowed" : ""}
                      ${
                        selectedMethod === method.value
                          ? "bg-[rgb(74,59,99)] text-white shadow-lg"
                          : "bg-white border border-gray-200 hover:border-gray-300"
                      }
                    `}
                    onClick={() => !method.disabled && setSelectedMethod(method.value)}
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`relative h-14 w-14 overflow-hidden rounded-lg ${selectedMethod === method.value ? "bg-white" : "bg-gray-50"} p-2`}
                      >
                        <Image
                          src={method.image || "/placeholder.svg?height=40&width=40"}
                          alt={method.label}
                          width={40}
                          height={40}
                          className="object-contain"
                        />
                      </div>
                      <div>
                        <h3 className="font-medium">{method.label}</h3>
                        {method.disabled && (
                          <p
                            className={`text-sm ${selectedMethod === method.value ? "text-white/80" : "text-gray-500"}`}
                          >
                            Tạm thời không khả dụng
                          </p>
                        )}
                      </div>
                    </div>

                    {selectedMethod === method.value && (
                      <div className="absolute top-3 right-3">
                        <CheckCircle className="h-5 w-5 text-white" />
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="bg-[rgb(74,59,99)]/5 p-4 rounded-lg mb-6 flex items-start gap-3 border border-[rgb(74,59,99)]/20">
                <div className="w-8 h-8 rounded-full bg-[rgb(74,59,99)] flex items-center justify-center flex-shrink-0">
                  <Shield className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="font-medium text-[rgb(74,59,99)]">Thanh toán an toàn & bảo mật</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Thông tin thanh toán của bạn được bảo mật tuyệt đối. Chúng tôi sử dụng các biện pháp bảo mật tiên
                    tiến để đảm bảo an toàn cho giao dịch của bạn.
                  </p>
                </div>
              </div>

              <Button
                onClick={handleChooseMethod}
                disabled={
                  isLoading ||
                  (selectedMethod !== "bank" && paymentMethods.find((m) => m.value === selectedMethod)?.disabled)
                }
                className="w-full md:w-auto px-10 py-6 text-base bg-[rgb(74,59,99)] hover:bg-[rgb(94,79,119)]"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                ) : null}
                {isLoading ? "Đang xử lý..." : "Tiến hành thanh toán"}
                {!isLoading && <ArrowRight className="w-4 h-4 ml-2" />}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

