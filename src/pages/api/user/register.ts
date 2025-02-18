import { fetchAuthOdoo } from "@/utils/fetch-auth-odoo";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = "0";
  const odoo_api = process.env.ODOO_URL || "http://127.0.0.1:8069";

  if (req.method === "POST") {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ error: "Thiếu thông tin cần thiết" });
    }

    try {
      const response = await fetchAuthOdoo({
        api_url: `${odoo_api}/user/register`,
        method: "POST",
        form_data: {
          name: name,
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
      return res.status(500).json({ error: "Lỗi khi gọi API Odoo" });
    }
  } else {
    return res.status(405).json({ error: "Chỉ hỗ trợ phương thức POST" });
  }
}
