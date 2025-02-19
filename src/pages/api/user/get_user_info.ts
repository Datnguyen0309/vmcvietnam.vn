import { fetchAuthOdooPersonalToken } from "@/utils/fetch-auth-odoo";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const odoo_api = process.env.ODOO_URL || "http://127.0.0.1:8069";

  const { session_log_id } = req.body;

  if (req.method === "POST") {
    if (!session_log_id) {
      return res.status(401).json({ error: "Bạn chưa đăng nhập" });
    }

    try {
      const response = await fetchAuthOdooPersonalToken({
        api_url: `${odoo_api}/user/get_user_info`,
        method: "POST",
        personal_token: session_log_id,
      });

      const data = await response.json();

      if (response.ok) {
        return res.status(200).json({ success: true, user_info: data });
      } else {
        return res.status(400).json({ error: data.error || "Lỗi khi lấy thông tin người dùng" });
      }
    
    } catch (error) {
      return res.status(500).json({ error: "Có lỗi xảy ra khi gọi API Odoo" });
    }
  } else {
    return res.status(405).json({ error: "Chỉ hỗ trợ phương thức POST" });
  }
}
