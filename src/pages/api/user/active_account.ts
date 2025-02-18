import { fetchAuthOdoo } from "@/utils/fetch-auth-odoo";
import type { NextApiRequest, NextApiResponse } from "next";

const odoo_api = process.env.ODOO_URL || "http://127.0.0.1:8069";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Thiếu thông tin cần thiết" });
    }

    try {
      const response = await fetchAuthOdoo({
        api_url: `${odoo_api}/user/activate_account`,
        method: "POST",
        form_data: {
          email: email,
          password: password,
        },
      });

      const data = await response.json();

      if (response.ok) {
        return res.status(200).json(data);
      } else {
        return res.status(300).json(data);
      }
    } catch (error) {
      console.error("Error calling Odoo API:", error);
      return res.status(500).json({ error: "Lỗi khi gọi API Odoo" });
    }
  } else {
    return res.status(405).json({ error: "Chỉ hỗ trợ phương thức POST" });
  }
}
