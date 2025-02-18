import { fetchAuthOdoo } from "@/utils/fetch-auth-odoo";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const odoo_api = process.env.ODOO_URL || "http://127.0.0.1:8069";
  if (req.method === "POST") {
    const { email, new_password } = req.body;

    if (!email || !new_password) {
      return res.status(400).json({ error: "Thiếu email hoặc mật khẩu mới" });
    }

    try {
      const response = await fetchAuthOdoo({
        api_url: `${odoo_api}/user/reissue_password`,
        method: "POST",
        form_data: {
          email: email,
          new_password: new_password,
        },
      });

      const data = await response.json();

      if (response.ok) {
        return res.status(200).json({ success: "Mật khẩu đã được cập nhật thành công" });
      } else {
        return res.status(400).json({ error: data.error });
      }
    } catch (error) {
      console.error("Error updating password in Odoo:", error);
      return res.status(500).json({ error: "Lỗi khi gọi Odoo API" });
    }
  } else {
    return res.status(405).json({ error: "Phương thức không được hỗ trợ" });
  }
}
