import { fetchAuthOdoo } from "@/utils/fetch-auth-odoo";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const odoo_api = process.env.ODOO_URL || "http://127.0.0.1:8069";

  if (req.method !== "PUT") {
    return res.status(405).json({ success: false, message: "Method Not Allowed" });
  }

  const { order_id, promotion_id } = req.body;
  if (!order_id || !promotion_id) {
    return res.status(400).json({ success: false, message: "Thiếu order_id hoặc promotion_id" });
  }

  try {
    const response = await fetchAuthOdoo({
      api_url: `${odoo_api}/order/apply_promotion`,
      method: "PUT",
      form_data: { order_id, promotion_id },
    });

    const data = await response.json();
    return res.status(response.ok ? 200 : 400).json(data);
  } catch (error) {
    return res.status(500).json({ success: false, message: "Lỗi hệ thống", error });
  }
}
