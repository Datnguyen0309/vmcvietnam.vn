import { fetchAuthOdooPersonalToken } from "@/utils/fetch-auth-odoo";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const odoo_api = process.env.ODOO_URL || "http://127.0.0.1:8069";
  const { session_log_id } = req.body;

  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Method Not Allowed" });
  }
  if (!session_log_id) {
    return res.status(401).json({ error: "Bạn chưa đăng nhập" });
  }

  try {
    const response = await fetchAuthOdooPersonalToken({
      api_url: `${odoo_api}/order/orders_history`,
      method: "GET",
      personal_token: session_log_id,
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json(data);
    }

    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ success: false, message: "Lỗi hệ thống", error });
  }
}
