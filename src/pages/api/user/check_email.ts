import { fetchAuthOdoo } from "@/utils/fetch-auth-odoo";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const odoo_api = process.env.ODOO_URL || "http://127.0.0.1:8069";

  if (req.method === "POST") {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: "Thiếu email" });
    }

    try {
      const response = await fetchAuthOdoo({
        api_url: `${odoo_api}/user/check_email`,
        method: "POST",

        form_data: { email: email },
      });

      const data = await response.json();

      if (response.ok) {
        return res.status(200).json({ data: data });
      } else {
        return res.status(400).json({ error: "Không thể kiểm tra email" });
      }
    } catch (error) {
      console.error("Error checking email existence:", error);
      return res.status(500).json({ error: "Lỗi server" });
    }
  } else {
    return res.status(405).json({ error: "Chỉ hỗ trợ phương thức POST" });
  }
}
