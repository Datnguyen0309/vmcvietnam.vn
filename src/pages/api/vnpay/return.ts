import type { NextApiRequest, NextApiResponse } from "next";
import { createHmac } from "crypto";
import qs from "qs";
import { randomUUID } from "crypto";
import config from "../../../utils/default.json";

const resultMap = new Map();
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
interface VnpayParams {
  [key: string]: string | string[] | undefined;
}
function sortObject(obj: { [key: string]: string }): { [key: string]: string } {
  const sorted: { [key: string]: string } = {};
  const str: string[] = [];
  let key: string;

  for (key in obj) {
    if (obj.hasOwnProperty(key)) {
      str.push(encodeURIComponent(key));
    }
  }

  str.sort();

  for (let i = 0; i < str.length; i++) {
    sorted[str[i]] = encodeURIComponent(obj[str[i]]).replace(/%20/g, "+");
  }

  return sorted;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const params: VnpayParams = { ...req.query }; // Lấy params từ query của request
  const filteredParams: { [key: string]: string } = {};
  //   const odoo_api = process.env.ODOO_URL_PAYMENT || "https://payment.eteaching.vn";

  // Lọc các giá trị undefined và chỉ giữ lại các giá trị kiểu string (hoặc biến mảng thành chuỗi)
  for (const key in params) {
    if (params.hasOwnProperty(key)) {
      const value = params[key];
      if (Array.isArray(value)) {
        // Nếu giá trị là mảng, lấy phần tử đầu tiên (hoặc có thể xử lý mảng nếu cần)
        filteredParams[key] = value[0];
      } else if (typeof value === "string") {
        filteredParams[key] = value;
      }
    }
  }

  const secureHash = filteredParams["vnp_SecureHash"] as string;
  delete filteredParams["vnp_SecureHash"];
  delete filteredParams["vnp_SecureHashType"];

  // Sắp xếp các tham số và tạo chuỗi ký tự
  const sortedParams = sortObject(filteredParams);
  const signData = qs.stringify(sortedParams, { encode: false });

  // Lấy secret từ cấu hình và tạo chữ ký HMAC
  const secret = config.vnp_HashSecret;
  const signed = createHmac("sha512", secret).update(signData, "utf-8").digest("hex");

  // Kiểm tra tính hợp lệ của chữ ký
  const isValid = secureHash === signed;

  // Tạo transaction ID và lưu thông tin vào resultMap
  const transactionId = randomUUID();
  resultMap.set(transactionId, {
    isValid,
    amount: Number(filteredParams["vnp_Amount"]) / 100,
    orderId: filteredParams["vnp_TxnRef"],
    bankCode: filteredParams["vnp_BankCode"],
    payDate: filteredParams["vnp_PayDate"],
    responseCode: filteredParams["vnp_ResponseCode"],
    transactionStatus: filteredParams["vnp_TransactionStatus"],
    transactionNo: filteredParams["vnp_TransactionNo"],
    orderInfo: filteredParams["vnp_OrderInfo"],
  });
console.log(filteredParams)
 console.log(resultMap)
  return res.redirect(`/ket-qua-thanh-toan?tid=${transactionId}`);
}

export { resultMap };

//   fetchAuthOdoo({
//     api_url: `${odoo_api}/transaction/update-transaction-status`,
//     method: "POST",
//     form_data: {
//       order_id: filteredParams["vnp_TxnRef"],
//       new_status:
//         isValid &&
//         filteredParams["vnp_TransactionStatus"] === "00" &&
//         filteredParams["vnp_ResponseCode"] === "00"
//           ? "success"
//           : "failed",
//       description: errorMessages[filteredParams["vnp_ResponseCode"]] || "Lỗi không xác định",
//       amount: Number(filteredParams["vnp_Amount"]) / 100,
//     },
//   });
