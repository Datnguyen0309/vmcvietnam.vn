import { fetchAuthOdooPersonalToken } from "@/utils/fetch-auth-odoo";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const odoo_api = process.env.ODOO_URL || "http://127.0.0.1:8069";
  if (req.method === "POST") {
    const { session_log_id, old_password, new_password } = req.body;

    // Kiểm tra các trường cần thiết
    if (!session_log_id || !old_password || !new_password) {
      return res.status(400).json({ error: "Thiếu thông tin cần thiết" });
    }

    try {
      const response = await fetchAuthOdooPersonalToken({
        api_url: `${odoo_api}/user/change_password`,
        method: "POST",
        personal_token: session_log_id,
        form_data: {
          old_password: old_password,
          new_password: new_password,
        },
      });

      const data = await response.json();

      if (response.ok) {
        return res.status(200).json(data);
      } else {
        return res.status(400).json(data);
      }
    } catch (error) {
      console.error("Error calling Odoo API:", error);
      return res.status(500).json({ error: "Lỗi khi gọi API Odoo" });
    }
  } else {
    return res.status(405).json({ error: "Chỉ hỗ trợ phương thức POST" });
  }
}
