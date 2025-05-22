import { fetchAuthOdoo } from "@/utils/fetch-auth-odoo";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = "0";
  const odoo_api = process.env.ODOO_URL || "http://127.0.0.1:8069";

  if (req.method === "POST") {
    const { partner_name, partner_email, partner_phone, items } = req.body;

    if (!items) {
      return res.status(400).json({ success: false, message: "Thiếu thông tin đơn hàng" });
    }

    try {
      const response = await fetchAuthOdoo({
        api_url: `${odoo_api}/order/create_order`,
        method: "POST",
        form_data: {
          partner_name,
          partner_email,
          partner_phone,
          items,
        },
      });

      const data = await response.json();

      if (response.ok) {
        return res.status(200).json(data);
      } else {
        return res.status(response.status).json(data);
      }
    } catch (error) {
      return res.status(500).json({ success: false, message: "Lỗi khi gọi API Odoo" });
    }
  } else {
    return res.status(405).json({ success: false, message: "Chỉ hỗ trợ phương thức POST" });
  }
}
