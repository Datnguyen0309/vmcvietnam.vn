"use client";

import { BankTransferDetails } from "@/components/BankTranferDetail";
import { Card, CardContent, CardHeader } from "@/components/ComponentsUI";
import { clearCart } from "@/redux/features/cartSlice";
import { decryptOrderId } from "@/utils/decodeOrderID";
import { fetchOrderDetails } from "@/utils/fetch-auth-odoo";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { FaRegCreditCard } from "react-icons/fa6";
import { FiCheckCircle } from "react-icons/fi";
import { GoPackage } from "react-icons/go";
import { useDispatch } from "react-redux";

export const PaymentProcessingPage = () => {
  const router = useRouter();
  const [orderDetails, setOrderDetails] = useState<any>(null);

  const orderQuery = router?.query?.order_id as string;
  const orderId = decryptOrderId(orderQuery);
  const dispatch = useDispatch();

  useEffect(() => {
    const getOrderDetails = async () => {
      if (orderId !== "") {
        try {
          const orderData = await fetchOrderDetails(Number(orderId));
          if (orderData?.success) {
            setOrderDetails(orderData?.data);
          } else {
            router.push(`/`);
          }
        } catch (error) {
          console.error("Error fetching order details:", error);
          router.push(`/`);
        }
      } else {
        router.push(`/`);
      }
    };
    getOrderDetails();
  }, [orderId, router]);

  const promotion = orderDetails?.reward;
  const rewardItems = orderDetails?.items?.filter((item: any) => item.is_reward_line);
  const total_amount = orderDetails?.items
    ?.filter((product: any) => !product.is_reward_line)
    .reduce((total: number, product: any) => total + product.price_unit * product.quantity, 0);

  const handleConfirm = async () => {
    try {
      dispatch(clearCart());
      router.push(`/thanh-toan-thanh-cong`);
    } catch (error) {
      console.error("Error fetch Confirm Payment", error);
    }
  };

  const bankInfo = {
    bankName: " TPBank – CN: Hoàn Kiếm ",
    accountNumber: "39395556789",
    accountHolder: "Họ tên, SĐT, ngày sinh",
    amount: orderDetails?.total_price || 0,
    branch: "Công ty Cổ phần tư vấn dịch vụ Đào tạo AUM Việt Nam",
  };

  return (
    <div className="bg-white">
        <div className="bg-[rgb(74,59,99)] py-10">
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
                <FiCheckCircle className="h-6 w-6 text-[rgb(74,59,99)]" />
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
        <div className="grid gap-8 md:grid-cols-[3fr_2fr]">
          {/* Bank Transfer Details */}
          <BankTransferDetails
            bankInfo={bankInfo}
            handleConfirmTransaction={() => handleConfirm()}
          />

          {/* Customer & Order Info */}
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <h2 className="text-lg font-medium">Thông tin khách hàng</h2>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="grid gap-4 text-sm">
                  <div className="grid grid-cols-[120px_1fr] gap-4">
                    <div className="text-gray-600">Họ và tên:</div>
                    <div>{orderDetails?.partner_name || "khách hàng"}</div>
                  </div>
                  <div className="grid grid-cols-[120px_1fr] gap-4">
                    <div className="text-gray-600">Số điện thoại:</div>
                    <div>{orderDetails?.partner_phone || "0987654321"}</div>
                  </div>
                  <div className="grid grid-cols-[120px_1fr] gap-4">
                    <div className="text-gray-600">Email:</div>
                    <div>{orderDetails?.partner_email || "example@gmail.com"}</div>
                  </div>
                  <div className="grid grid-cols-[120px_1fr] gap-4">
                    <div className="text-gray-600">Mã đơn hàng:</div>
                    <div>{orderDetails?.order_name || "order name"}</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <h2 className="text-lg font-medium">Thông tin đơn hàng</h2>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-6">
                  <div className="space-y-4">
                    {orderDetails?.items?.map((product: any, index: number) => (
                      <div
                        key={index}
                        className={`${product.is_reward_line ? "text-Blush-Pink" : "text-black"
                          } flex items-start space-x-4 p-4 border rounded-lg shadow-sm`}
                      >
                        <div className="flex-1">
                          <p className="font-medium">{product.name}</p>
                          <p className="mt-1 text-right text-lg font-semibold">
                            {product.price_unit.toLocaleString("vi-VN")}
                            {" đ"}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="space-y-2 border-t pt-4 text-[16px]">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tạm tính</span>
                      <span>
                        {total_amount && total_amount.toLocaleString("vi-VN")}
                        {" đ"}
                      </span>
                    </div>
                    <div className="text-Blush-Pink text-[16px] flex justify-between">
                      <span>Giảm </span>
                      {promotion && promotion?.reward_type === "discount"
                        ? (rewardItems[0]?.price_unit * rewardItems[0]?.quantity).toLocaleString(
                          "vi-VN"
                        ) + " đ"
                        : "-0 đ"}
                    </div>
                    <div className="flex justify-between text-[18px] border-t pt-2 font-medium">
                      <span>Tổng</span>
                      <span>
                        {orderDetails?.total_price?.toLocaleString("vi-VN")} {" đ"}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
