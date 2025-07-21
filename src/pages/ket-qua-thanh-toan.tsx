import Link from "next/link";
import { useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { MdCancel, MdCheckCircle } from "react-icons/md";

export default function PaymentResultPage() {
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(true);

useEffect(() => {
  const searchParams = new URLSearchParams(window.location.search);
  if (searchParams.has("vnp_SecureHash")) {
    fetch(`/api/vnpay/return?${searchParams.toString()}`)
      .then((res) => res.json())
      .then((data) => {
        setResult(data);
        setLoading(false);
      })
      .catch(() => {
        setResult({ success: false });
        setLoading(false);
      });
  } else {
    setResult({ success: false });
    setLoading(false);
  }
}, []);


  const formatDate = (payDate: string) => {
    if (!payDate) return "";
    return payDate.replace(
      /^([0-9]{4})([0-9]{2})([0-9]{2})([0-9]{2})([0-9]{2})([0-9]{2})$/,
      "$3/$2/$1 $4:$5:$6"
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <FaSpinner className="animate-spin text-gray-400 w-12 h-12" />
      </div>
    );
  }

  if (!result.data.isValid || (!result.success && !result.data)) {
    console.log("result", result);
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh] bg-gray-50 p-4">
        <MdCancel className="text-red-800 w-16 h-16 mb-4" />
        <h1 className="text-2xl font-bold text-red-800 mb-6 text-center">
          Giao dịch không hợp lệ hoặc đã hết hạn
        </h1>
        <Link href="/">
          <p className="inline-block px-6 py-2 bg-gray-600 text-white font-medium rounded-lg shadow hover:bg-gray-900 transition">
            Về trang chủ
          </p>
        </Link>
      </div>
    );
  }

  const { success, message, data } = result;

  const infoFields = [
    { label: "Mã đơn hàng", value: data.orderId },
    { label: "Mã giao dịch VNPAY", value: data.transactionNo },
    { label: "Ngân hàng thanh toán", value: data.bankCode },
    { label: "Số tiền thanh toán", value: `${data.amount.toLocaleString()} VND` },
    { label: "Thời gian thanh toán", value: formatDate(data.payDate) },
    { label: "Thông tin giao dịch", value: data.orderInfo },
    { label: "Trạng thái", value: message },
  ];

  return (
    <div className="min-h-[90vh] bg-gray-50 flex items-center justify-center py-20 px-4">
      <div className="w-full max-w-lg bg-white rounded-3xl shadow-xl border border-gray-200 overflow-hidden">
        <div className={`${success ? "bg-green-50" : "bg-red-50"} px-8 py-6 flex items-center`}>
          {success ? (
            <MdCheckCircle className="text-green-600 w-9 h-9 mr-3" />
          ) : (
            <MdCancel className="text-red-600 w-9 h-9 mr-3" />
          )}
          <h2 className={`text-2xl font-semibold ${success ? "text-green-800" : "text-red-800"}`}>
            {success ? "Thanh toán thành công" : "Thanh toán thất bại"}
          </h2>
        </div>
        <div className="px-8 py-6 space-y-4">
          {infoFields.map((item, idx) => {
            let bg = "bg-gray-100";
            let text = "text-gray-800";
            if (item.label === "Số tiền thanh toán") {
              bg = "bg-green-100";
              text = "text-green-800";
            }
            if (item.label === "Trạng thái") {
              bg = success ? "bg-green-200" : "bg-red-200";
              text = success ? "text-green-900" : "text-red-900";
            }
            return (
              <div
                key={idx}
                className={`${bg} rounded-lg px-4 py-3 flex justify-between items-center`}
              >
                <span className="font-medium">{item.label}</span>
                <span className={`${text} font-semibold`}>{item.value}</span>
              </div>
            );
          })}
        </div>
        <div className="px-8 py-6 bg-gray-50 text-center">
          <Link href="/">
            <p className="inline-block px-6 py-2 bg-gray-600 text-white font-medium rounded-lg shadow hover:bg-gray-900 transition">
              Về trang chủ
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}
