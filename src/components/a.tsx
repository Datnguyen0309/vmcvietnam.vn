"use client";

import { FiCheckCircle } from "react-icons/fi";
import { FaRegCreditCard } from "react-icons/fa6";
import { GoPackage } from "react-icons/go";
import { Card, CardContent, CardHeader } from "@/components/ComponentsUI";
import { FaCheckCircle } from "react-icons/fa";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { decryptOrderId } from "@/utils/decodeOrderID";
import { fetchOrderDetails } from "@/utils/fetch-auth-odoo";
import { useDispatch } from "react-redux";
import { clearCart } from "@/redux/features/cartSlice";

export const PaymentSuccessPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [orderDetails, setOrderDetails] = useState<any>(null);

  const orderQuery = router?.query?.order_id as string;
  const orderId = decryptOrderId(orderQuery);

  useEffect(() => {
    const getOrderDetails = async () => {
      if (!orderId) {
        router.replace(`/`);
        return;
      }
      try {
        const orderData = await fetchOrderDetails(Number(orderId));
        if (orderData?.success) {
          setOrderDetails(orderData?.data);
          dispatch(clearCart());
        } else {
          router.replace(`/`);
        }
      } catch (error) {
        console.error("Error fetching order details:", error);
        router.replace(`/`);
      }
    };
    getOrderDetails();
  }, [orderId, router, dispatch]);

  const handleBackToHome = () => {
    router.push("/");
  };

  const promotion = orderDetails?.reward;
  const rewardItems = orderDetails?.items?.filter((item: any) => item.is_reward_line);
  const total_amount = orderDetails?.items
    ?.filter((product: any) => !product.is_reward_line)
    .reduce((total: number, product: any) => total + product.price_unit * product.quantity, 0);

  return (
    <div className="min-h-screen bg-white">
      <div className="h-[50px] xl:h-[66px] bg-transparent mt-2 md:mt-[2px]"></div>

      {/* Progress Steps */}
      <div className="bg-[rgb(74,59,99)] pb-8 pt-6">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid grid-cols-5 items-center justify-center gap-4 text-white">
            <div className="relative flex flex-col items-center space-y-2">
              <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-white">
                <GoPackage className="h-6 w-6 text-[rgb(74,59,99)]" />
                <FaCheckCircle className="absolute -bottom-0 -right-1 h-4 w-4 text-green-500 bg-white rounded-full" />
              </div>
              <div className="text-center text-sm">
                <p>Phương thức</p>
                <p>thanh toán</p>
              </div>
            </div>
            <div className="h-0.5 w-full border-t-[2px] border-dashed border-white/50"></div>
            <div className="relative flex flex-col items-center space-y-2">
              <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-white">
                <FaRegCreditCard className="h-6 w-6 text-[rgb(74,59,99)]" />
                <FaCheckCircle className="absolute -bottom-0 -right-1 h-4 w-4 text-green-500 bg-white rounded-full" />
              </div>
              <div className="text-center text-sm">
                <p>Tiến hành</p>
                <p>thanh toán</p>
              </div>
            </div>
            <div className="h-0.5 w-full border-t-[2px] border-dashed border-white/50"></div>
            <div className="flex flex-col items-center space-y-2">
              <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-white">
                <FiCheckCircle className="h-6 w-6 text-[#1976D2]" />
                <FaCheckCircle className="absolute -bottom-0 -right-1 h-4 w-4 text-green-500 bg-white rounded-full" />
              </div>
              <div className="text-center text-sm">
                <p>Thanh toán</p>
                <p>thành công</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-6xl px-4 py-8">
        <Card className="mb-8">
          <CardContent className="p-8 flex flex-col items-center">
            <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-6">
              <FiCheckCircle className="h-10 w-10 text-green-500" />
            </div>

            <h2 className="text-2xl font-bold text-[rgb(74,59,99)] mb-2">Thanh toán thành công!</h2>
            <p className="text-gray-600 text-center max-w-lg mb-6">
              Cảm ơn bạn đã đặt hàng. Đơn hàng của bạn đã được xác nhận và đang được xử lý. Chúng tôi sẽ gửi email xác
              nhận đơn hàng cho bạn trong thời gian sớm nhất.
            </p>

            <div className="bg-[rgb(74,59,99)]/5 p-4 rounded-lg w-full max-w-md mb-6">
              <div className="flex justify-between mb-2">
                <span className="font-medium">Mã đơn hàng:</span>
                <span className="font-bold text-[rgb(74,59,99)]">{orderDetails?.order_name}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Tổng thanh toán:</span>
                <span className="font-bold text-[rgb(74,59,99)]">
                  {orderDetails?.total_price?.toLocaleString("vi-VN") || "0"} đ
                </span>
              </div>
            </div>

            <button
              onClick={handleBackToHome}
              className="bg-[rgb(74,59,99)] hover:bg-[rgb(94,79,119)] text-white px-8 py-3 rounded-md"
            >
              Tiếp tục mua sắm
            </button>
          </CardContent>
        </Card>

        {orderDetails && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Customer Info */}
            <Card>
              <CardHeader>
                <h2 className="text-lg font-medium text-[rgb(74,59,99)]">Thông tin khách hàng</h2>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="grid gap-4 text-sm">
                  <div className="grid grid-cols-[120px_1fr] gap-4">
                    <div className="text-gray-600">Họ và tên:</div>
                    <div>{orderDetails?.partner_name}</div>
                  </div>
                  <div className="grid grid-cols-[120px_1fr] gap-4">
                    <div className="text-gray-600">Số điện thoại:</div>
                    <div>{orderDetails?.partner_phone}</div>
                  </div>
                  <div className="grid grid-cols-[120px_1fr] gap-4">
                    <div className="text-gray-600">Email:</div>
                    <div>{orderDetails?.partner_email}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};
