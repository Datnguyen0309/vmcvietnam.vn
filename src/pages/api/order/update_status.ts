import { fetchAuthOdoo } from "@/utils/fetch-auth-odoo";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const odoo_api = process.env.ODOO_URL || "http://127.0.0.1:8069";

  if (req.method !== "PUT") {
    return res.status(405).json({ success: false, message: "Method Not Allowed" });
  }

  const { order_id } = req.body;
  if (!order_id) {
    return res.status(400).json({ success: false, message: "Thiếu order_id " });
  }

  try {
    const response = await fetchAuthOdoo({
      api_url: `${odoo_api}/order/update-order-status/${order_id}`,
      method: "PUT",
      form_data: { status: "sale" },
    });

    const data = await response.json();
    return res.status(response.ok ? 200 : 400).json(data);
  } catch (error) {
    return res.status(500).json({ success: false, message: "Lỗi hệ thống", error });
  }
}
