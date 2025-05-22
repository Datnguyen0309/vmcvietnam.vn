import { fetchAuthOdoo } from "@/utils/fetch-auth-odoo";
import type { NextApiRequest, NextApiResponse } from "next";
// import { fetchAuthOdoo } from "@/utils/fetchAuthOdoo";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const odoo_api = process.env.ODOO_URL || "http://127.0.0.1:8069";

  if (req.method !== "PUT") {
    return res.status(405).json({ success: false, message: "Method Not Allowed" });
  }

  const { order_id, promo_code } = req.body;
  if (!order_id || !promo_code) {
    return res.status(400).json({ success: false, message: "Thiếu order_id hoặc promo_code" });
  }

  try {
    const response = await fetchAuthOdoo({
      api_url: `${odoo_api}/order/apply_promo_code`,
      method: "PUT",
      form_data: { order_id, promo_code },
    });

    const data = await response.json();
    return res.status(response.ok ? 200 : 400).json(data);
  } catch (error) {
    return res.status(500).json({ success: false, message: "Lỗi hệ thống", error });
  }
}
