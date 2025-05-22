// pages/api/payment_result.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { resultMap } from "./vnpay/return";

export const errorMessages: Record<string, string> = {
  "00": "Giao dịch thành công",
  "07": "Giao dịch bị nghi ngờ gian lận",
  "09": "Tài khoản chưa đăng ký InternetBanking",
  "10": "Sai thông tin thẻ quá 3 lần",
  "11": "Hết hạn chờ thanh toán",
  "12": "Tài khoản bị khóa",
  "13": "Sai OTP xác thực giao dịch",
  "24": "Khách hàng hủy giao dịch",
  "51": "Không đủ số dư trong tài khoản",
  "65": "Vượt quá hạn mức giao dịch trong ngày",
  "75": "Ngân hàng đang bảo trì",
  "79": "Sai mật khẩu quá số lần quy định",
  "99": "Lỗi hệ thống hoặc lỗi chưa xác định",
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const tid = req.query.tid as string;
  const data = resultMap.get(tid);
  console.log(data)
  if (!data) {
    return res.status(404).json({ success: false, message: "Không tìm thấy giao dịch" });
  }

  const status = data.isValid && data.transactionStatus === "00" && data.responseCode === "00";

  res.json({
    success: status,
    message: errorMessages[data.responseCode] || "Lỗi không xác định",
    data,
  });
}
