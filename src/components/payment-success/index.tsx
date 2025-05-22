"use client";

import { Card, CardContent } from "@/components/ComponentsUI";
import { useRouter } from "next/router";
import { FaCheckCircle } from "react-icons/fa";
import { FaRegCreditCard } from "react-icons/fa6";
import { FiCheckCircle } from "react-icons/fi";
import { GoPackage } from "react-icons/go";

export const PaymentSuccessPage = () => {
  const router = useRouter();
  const handleBackToHome = () => {
    router.push("/");
  };


  return (
    <div className=" bg-white">
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
            <button
              onClick={handleBackToHome}
              className="bg-[rgb(74,59,99)] hover:bg-[rgb(94,79,119)] text-white px-8 py-3 rounded-md"
            >
              Tiếp tục mua sắm
            </button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
