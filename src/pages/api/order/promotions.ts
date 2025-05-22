import { fetchAuthOdoo } from "@/utils/fetch-auth-odoo";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const odoo_api = process.env.ODOO_URL || "http://127.0.0.1:8069";

  if (req.method !== "GET") {
    return res.status(405).json({ success: false, message: "Method Not Allowed" });
  }

  const { order_id } = req.query;
  if (!order_id) {
    return res.status(400).json({ success: false, message: "Thiếu order_id" });
  }

  try {
    const response = await fetchAuthOdoo({
      api_url: `${odoo_api}/order/promotions/${order_id}`,
      method: "GET",
    });

    const data = await response.json();
    if (response.ok) {
      return res.status(200).json(data);
    } else {
      return res.status(response.status).json(data);
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: "Lỗi hệ thống", error });
  }
}
