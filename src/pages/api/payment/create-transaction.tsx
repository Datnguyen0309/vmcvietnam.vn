import { fetchAuthOdoo } from "@/utils/fetch-auth-odoo";
import { fetchAuthOdooPayment } from "@/utils/fetch-auth-odoopayment";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = "0";
  const odoo_api = process.env.ODOO_URL_PAYMENT || "https://payment.eteaching.vn";
  if (req.method === "POST") {
    const { order_id, transaction_date, amount, payment_method, customer_phone, source } = req.body;

    if (
      !order_id ||
      !transaction_date ||
      !amount ||
      !payment_method ||
      !customer_phone ||
      !source
    ) {
      return res.status(400).json({ error: "Thiếu thông tin!" });
    }

    try {
      // Gửi request đến Odoo API để thực hiện đăng nhập
      const response = await fetchAuthOdooPayment({
        api_url: `${odoo_api}/transaction/create-transaction`,
        method: "POST",
        form_data: {
          order_id,
          transaction_date,
          amount,
          payment_method,
          customer_phone,
          source,
        },
      });

      const data = await response.json();

      if (response.ok) {
        // Nếu đăng nhập thành công, trả về session ID và thông tin người dùng
        return res.status(200).json(data);
      } else {
        // Nếu Odoo trả về lỗi, chuyển tiếp lỗi tới client
        return res.status(300).json(data);
      }
    } catch (error) {
      return res.status(500).json({ error: "Lỗi khi gọi API Odoo" });
    }
  } else {
    return res.status(405).json({ error: "Chỉ hỗ trợ phương thức POST" });
  }
}
