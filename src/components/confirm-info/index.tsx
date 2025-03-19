"use client"

import type React from "react"

import { useEffect, useState } from "react"
import Image from "next/image"
import type { CartItem } from "@/redux/features/cartSlice"
import { type CartItemOrder, clearOrder } from "@/redux/features/orderSlice"
import { useAppDispatch, useAppSelector } from "@/redux/store"
import { useRouter } from "next/router"
import nookies from "nookies"
import { fetchUpdateOrder, fetchUpdateOrderStatus } from "@/utils/fetch-auth-odoo"
import { encryptOrderId } from "@/utils/decodeOrderID"
import { clearPromotion } from "@/redux/features/promotionSlice"
import { createOrderThunk } from "@/redux/thunks/oderThunks"
import { Loading } from "@/components/Loading"
import { Gift, Percent, CreditCard, User, Mail, Phone, ShoppingBag, CheckCircle, ArrowRight } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"

export const ConfirmInfo = () => {
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [username, setUsername] = useState("")
  const [errors, setErrors] = useState({ phone: "", email: "" })
  const [checkEmail, setCheckEmail] = useState<any>(0)
  const dispatchApp = useAppDispatch()
  const router = useRouter()
  const cookies = nookies.get()
  const sessionLogId = cookies.session_log_id
  const cartItems: CartItem[] = useAppSelector((state) => state.cart.cartItems)
  const rewardItems: CartItemOrder[] = useAppSelector((state) =>
    state.order.items.filter((item) => item.is_reward_line === true),
  )
  const [isLoading, setIsLoading] = useState(false)
  const user = useAppSelector((state) => state.login.user)
  const promotion = useAppSelector((state) => state.promotion.currentPromotion)
  const totalAmount: number = useAppSelector((state) => state.cart.totalAmount)
  const totalPrice: number = useAppSelector((state) => state.order.total_price)
  const order_id = useAppSelector((state) => state.order.order_id)
  const dispatch = useAppDispatch()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    if (name === "phone") {
      setPhone(value)
      const phonePattern = /^(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})$/
      setErrors((prev: any) => ({
        ...prev,
        phone: phonePattern.test(value) ? "" : "Số điện thoại không hợp lệ",
      }))
    }

    if (name === "email") {
      setEmail(value)
      const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
      setErrors((prev: any) => ({
        ...prev,
        email: emailPattern.test(value) ? "" : "Email không hợp lệ",
      }))
    }
  }

  const handleCheckEmail = async () => {
    try {
      const orderData = await fetchUpdateOrder(Number(order_id), username, email, phone)
      if (!orderData.success) {
        throw new Error(orderData.message)
      }
      setCheckEmail(1)
    } catch (error) {
      console.error("Error updating order:", error)
    }
  }

  const handleConfirmOrder = async () => {
    try {
      setIsLoading(true)

      const response = await fetchUpdateOrderStatus(Number(order_id))
      if (response.success) {
        const decoodeOrderId = order_id ? encryptOrderId(String(order_id)) : ""
        router.push(`/chon-phuong-thuc-thanh-toan?order_id=${decoodeOrderId}`)

        dispatch(clearOrder())
        dispatch(clearPromotion())
      } else {
        throw new Error(response.message)
      }
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
      sessionStorage.setItem("exited_order_page", "true")
    }
  }

  useEffect(() => {
    const handleCreateOrder = async () => {
      if (!order_id && sessionStorage.getItem("exited_order_page") && !sessionStorage.getItem("order_created")) {
        try {
          await dispatchApp(createOrderThunk())
          console.log("Tạo đơn hàng thành công.")
          sessionStorage.removeItem("exited_order_page")
          sessionStorage.setItem("order_created", "true")
        } catch (error) {
          console.error("Lỗi khi tạo đơn hàng:", error)
        }
      }
    }

    handleCreateOrder()
  }, [ dispatchApp, order_id])

  return (
    <>
      <div className=" bg-[#f9f7fc] py-20">
        <div className="max-w-[1320px] mx-auto px-4 pt-8 pb-16">
          <div className="flex items-center mb-8">
            <CheckCircle className="w-6 h-6 mr-2 text-[rgb(74,59,99)]" />
            <h1 className="text-2xl font-bold text-[rgb(74,59,99)]">Xác nhận thông tin</h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left column - Order information */}
            <div className="lg:col-span-2">
              <Card className="shadow-md border-0">
                <CardHeader className="bg-[rgb(74,59,99)] text-white rounded-t-lg pb-4">
                  <CardTitle className="flex items-center text-xl">
                    <ShoppingBag className="w-5 h-5 mr-2" />
                    Thông tin đơn hàng
                  </CardTitle>
                  <CardDescription className="text-gray-200">
                    Vui lòng kiểm tra lại thông tin đơn hàng của bạn
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  {/* Desktop Cart */}
                  <div className="hidden xl:block">
                    <div className="bg-gray-50 rounded-lg mb-4">
                      <div className="grid grid-cols-12 gap-4 p-3 border-b border-gray-200 font-medium text-[rgb(74,59,99)]">
                        <div className="col-span-7">Sản phẩm</div>
                        <div className="col-span-5">Giá tiền</div>
                      </div>

                      {cartItems.map((item) => (
                        <div key={item?.product_id} className="grid grid-cols-12 gap-4 p-4 border-b border-gray-100">
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
                          <div className="col-span-5 flex items-center">
                            <span className="font-semibold text-[rgb(74,59,99)]">
                              {(item?.price_unit * item?.quantity).toLocaleString("vi-VN")} đ
                            </span>
                          </div>
                        </div>
                      ))}

                      {/* Reward Items */}
                      {rewardItems.length > 0 && (
                        <div className="bg-[#f5f0ff]">
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
                              <div className="col-span-5 flex items-center">
                                <span className="font-semibold text-[rgb(74,59,99)]">
                                  {(item?.price_unit * item?.quantity).toLocaleString("vi-VN")} đ
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Mobile Cart */}
                  <div className="xl:hidden space-y-4 mb-6">
                    {cartItems.map((item) => (
                      <div key={item.product_id} className="bg-gray-50 p-4 rounded-lg">
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
                          </div>
                        </div>
                      </div>
                    ))}

                    {/* Mobile Reward Items */}
                    {rewardItems.map((item) => (
                      <div key={item.product_id} className="bg-[#f5f0ff] p-4 rounded-lg">
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
                      </div>
                    ))}
                  </div>

                  {/* Order summary */}
                  <div className="space-y-3 bg-gray-50 p-4 rounded-lg">
                    <div className="flex justify-between text-gray-600">
                      <span>Tạm tính:</span>
                      <span>{totalAmount.toLocaleString("vi-VN")} đ</span>
                    </div>

                    {promotion && (
                      <div className="flex justify-between text-[rgb(74,59,99)] font-medium">
                        <span>Giảm:</span>
                        <span>
                          {promotion && promotion.reward_type === "discount"
                            ? (rewardItems[0]?.price_unit * rewardItems[0]?.quantity).toLocaleString("vi-VN") + " đ"
                            : "-0 đ"}
                        </span>
                      </div>
                    )}

                    <Separator className="my-2" />

                    <div className="flex justify-between font-bold text-lg">
                      <span>Tổng cộng:</span>
                      <span className="text-[rgb(74,59,99)]">{totalPrice.toLocaleString("vi-VN")} đ</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right column - Customer information */}
            <div className="lg:col-span-1">
              <Card className="shadow-md border-0 sticky top-4">
                <CardHeader className="bg-[rgb(74,59,99)] text-white rounded-t-lg pb-4">
                  <CardTitle className="flex items-center text-xl">
                    <User className="w-5 h-5 mr-2" />
                    Thông tin khách hàng
                  </CardTitle>
                  <CardDescription className="text-gray-200">
                    {sessionLogId ? "Thông tin tài khoản của bạn" : "Vui lòng nhập thông tin của bạn"}
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  {sessionLogId ? (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label className="text-gray-500 flex items-center">
                          <User className="w-4 h-4 mr-2" />
                          Họ và tên
                        </Label>
                        <div className="p-3 bg-gray-50 rounded-lg border border-gray-200 font-medium">{user?.name}</div>
                      </div>

                      <div className="space-y-2">
                        <Label className="text-gray-500 flex items-center">
                          <Mail className="w-4 h-4 mr-2" />
                          Email
                        </Label>
                        <div className="p-3 bg-gray-50 rounded-lg border border-gray-200 font-medium">
                          {user?.email}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label className="text-gray-500 flex items-center">
                          <Phone className="w-4 h-4 mr-2" />
                          Số điện thoại
                        </Label>
                        <div className="p-3 bg-gray-50 rounded-lg border border-gray-200 font-medium">
                          {user?.phone}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="fullName" className="flex items-center">
                          <User className="w-4 h-4 mr-2" />
                          Họ và tên
                        </Label>
                        <Input
                          id="fullName"
                          type="text"
                          required
                          name="fullName"
                          readOnly={checkEmail !== 0}
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          className="focus-visible:ring-[rgb(74,59,99)]"
                          placeholder="Nhập họ và tên"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email" className="flex items-center">
                          <Mail className="w-4 h-4 mr-2" />
                          Email
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          name="email"
                          value={email}
                          readOnly={checkEmail !== 0}
                          required
                          onChange={handleInputChange}
                          className="focus-visible:ring-[rgb(74,59,99)]"
                          placeholder="Nhập địa chỉ email"
                        />
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone" className="flex items-center">
                          <Phone className="w-4 h-4 mr-2" />
                          Số điện thoại
                        </Label>
                        <Input
                          id="phone"
                          type="tel"
                          name="phone"
                          readOnly={checkEmail !== 0}
                          value={phone}
                          required
                          onChange={handleInputChange}
                          className="focus-visible:ring-[rgb(74,59,99)]"
                          placeholder="Nhập số điện thoại"
                        />
                        {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {sessionLogId && Number(user.phone) === 0 && (
                <div className="mt-4">
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                    <p className="text-yellow-700 italic text-sm">
                      *Số điện thoại không hợp lệ. Vui lòng cập nhật thông tin cá nhân của bạn.
                    </p>
                  </div>
                  <Button
                    onClick={() => {
                      router.push("/thong-tin-ca-nhan/sua-thong-tin-ca-nhan")
                    }}
                    className="w-full bg-[rgb(74,59,99)] hover:bg-[rgb(94,79,119)]"
                  >
                    <User className="w-4 h-4 mr-2" />
                    Sửa thông tin
                  </Button>
                </div>
              )}

              {(checkEmail !== 0 || (sessionLogId && Number(user.phone) !== 0)) && (
                <div className="mt-4">
                  <Button
                    onClick={handleConfirmOrder}
                    disabled={isLoading}
                    className="w-full bg-[rgb(74,59,99)] hover:bg-[rgb(94,79,119)] py-6 text-base"
                  >
                    {isLoading ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    ) : (
                      <CreditCard className="w-5 h-5 mr-2" />
                    )}
                    {isLoading ? "Đang xử lý..." : "Tiến hành thanh toán"}
                    {!isLoading && <ArrowRight className="w-4 h-4 ml-2" />}
                  </Button>

                  <p className="text-xs text-gray-500 text-center mt-2">
                    Bằng cách tiến hành thanh toán, bạn đồng ý với các điều khoản và điều kiện của chúng tôi.
                  </p>
                </div>
              )}

              {checkEmail === 0 && !sessionLogId && (
                <div className="mt-4">
                  <Button
                    onClick={handleCheckEmail}
                    disabled={!email || !phone || !username || Boolean(errors.email) || Boolean(errors.phone)}
                    className="w-full bg-[rgb(74,59,99)] hover:bg-[rgb(94,79,119)]"
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Xác nhận thông tin
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

