import { NextApiRequest, NextApiResponse } from "next";
import crypto from "crypto";
import qs from "qs";
import config from "../../../../src/utils/default.json";
import moment from "moment-timezone";
interface VnpayParams {
  vnp_Version: string;
  vnp_Command: string;
  vnp_TmnCode: string;
  vnp_Locale: string;
  vnp_CurrCode: string;
  vnp_TxnRef: string;
  vnp_OrderInfo: string;
  vnp_OrderType: string;
  vnp_Amount: number;
  vnp_ReturnUrl: string;
  vnp_IpAddr: string;
  vnp_CreateDate: string;
  vnp_ExpireDate: string;
  vnp_BankCode?: string;
  vnp_SecureHash?: string;
  [key: string]: string | number | undefined;
}

// Sắp xếp key giữ nguyên chuỗi, chỉ sort tên key, không encode trước
function sortObject(obj: VnpayParams): VnpayParams {
  const sorted = {} as VnpayParams;
  // Lọc key hợp lệ
  const keys = Object.keys(obj).filter((key) => obj[key] !== undefined && obj[key] !== null);
  // Sort tên key theo ASCII
  keys.sort();

  // Encode value và thêm vào sorted
  for (const key of keys) {
    const value = obj[key];
    if (value !== undefined && value !== null) {
      // encodeURIComponent và thay %20 thành +
      const encoded = encodeURIComponent(String(value)).replace(/%20/g, "+");
      (sorted as any)[key] = encoded;
    }
  }
  return sorted;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { orderId, totalAmount, bankCode } = req.body;
  if (!orderId || !totalAmount) {
    return res.status(400).json({ message: "Thiếu thông tin orderId hoặc totalAmount" });
  }

  try {
    // Lấy IP
    const ipAddr = (req.headers["x-forwarded-for"] as string) || req.socket.remoteAddress || "";

    // Build params
   const TIMEZONE = "Asia/Ho_Chi_Minh";
    const createDate = moment().tz(TIMEZONE).format("YYYYMMDDHHmmss");
    const vnp_ExpireDate = moment().tz(TIMEZONE).add(30, "minutes").format("YYYYMMDDHHmmss");


    const orderInfo = `OME-Thanh toan cho ma GD: ${orderId}`;
    const locale = "vn";
    const currCode = "VND";

    const vnp_Params: VnpayParams = {
      vnp_Version: "2.1.0",
      vnp_Command: "pay",
      vnp_TmnCode: config.vnp_TmnCode,
      vnp_Locale: locale,
      vnp_CurrCode: currCode,
      vnp_TxnRef: orderId,
      vnp_OrderInfo: orderInfo,
      vnp_OrderType: "other",
      vnp_Amount: totalAmount * 100,
      vnp_ReturnUrl: config.vnp_ReturnUrl,
      vnp_IpAddr: ipAddr,
      vnp_CreateDate: createDate,
      vnp_ExpireDate: vnp_ExpireDate,
    };

    // Thêm bankCode nếu có
    if (bankCode) {
      vnp_Params.vnp_BankCode = bankCode;
    }

    // Sort và encode values
    const sortedParams = sortObject(vnp_Params);

    // Tạo chuỗi ký
    const signData = qs.stringify(sortedParams, { encode: false });
    const hmac = crypto.createHmac("sha512", config.vnp_HashSecret);
    const signed = hmac.update(signData, 'utf-8').digest('hex');

    // Gắn chữ ký
    sortedParams.vnp_SecureHash = signed;

    // Tạo URL
    const paymentUrl = `${config.vnp_Url}?${qs.stringify(sortedParams, {
      encode: false,
    })}`;

    return res.status(200).json({ paymentUrl });
  } catch (error) {
    console.error("Lỗi khi tạo URL thanh toán VNPAY:", error);
    return res.status(500).json({ message: "Không thể tạo URL thanh toán" });
  }
}
