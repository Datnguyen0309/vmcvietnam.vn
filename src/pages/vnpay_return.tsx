import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const VnpayReturn = () => {
  const router = useRouter();
  const { query } = router; // Lấy các tham số từ URL

  const [paymentStatus, setPaymentStatus] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    // Kiểm tra xem các tham số trả về từ VNPAY có tồn tại không
    if (query.vnp_ResponseCode && query.vnp_TxnRef) {
      const { vnp_ResponseCode, vnp_TxnRef } = query;

      // Kiểm tra mã phản hồi từ VNPAY
      if (vnp_ResponseCode === "00") {
        setPaymentStatus("success");
        setMessage(`Thanh toán cho mã giao dịch ${vnp_TxnRef} thành công!`);
      } else {
        setPaymentStatus("failure");
        setMessage(`Thanh toán không thành công! Mã lỗi: ${vnp_ResponseCode}`);
      }
    }
  }, [query]);

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-4xl">
        {/* Header */}
        <h1 className="text-3xl font-semibold text-center mb-6">Kết quả thanh toán</h1>

        {/* Thanh toán kết quả */}
        <div className="text-center">
          {paymentStatus === "success" ? (
            <div>
              <h2 className="text-2xl font-semibold text-green-600">Thanh toán thành công!</h2>
              <p className="mt-4 text-lg">{message}</p>
            </div>
          ) : paymentStatus === "failure" ? (
            <div>
              <h2 className="text-2xl font-semibold text-red-600">Thanh toán thất bại</h2>
              <p className="mt-4 text-lg">{message}</p>
            </div>
          ) : (
            <div>
              <h2 className="text-2xl font-semibold text-gray-600">Đang xử lý...</h2>
              <p className="mt-4 text-lg">Vui lòng chờ trong giây lát.</p>
            </div>
          )}
        </div>

        {/* Hiển thị tất cả tham số trả về từ VNPAY */}
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4">Thông tin trả về từ VNPAY:</h3>
          <div className="overflow-x-auto">
            <table className="table-auto w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-4 py-2 text-left">Tham số</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Giá trị</th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(query).map((key) => (
                  <tr key={key}>
                    <td className="border border-gray-300 px-4 py-2 font-semibold">{key}</td>
                    <td className="border border-gray-300 px-4 py-2">{query[key]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VnpayReturn;
