import { fetchAuthOdoo } from "@/utils/fetch-auth-odoo";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = "0";
  const odoo_api = process.env.ODOO_URL || "http://127.0.0.1:8069";
  if (req.method === "POST") {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Thiếu email hoặc mật khẩu" });
    }

    try {
      // Gửi request đến Odoo API để thực hiện đăng nhập
      const response = await fetchAuthOdoo({
        api_url: `${odoo_api}/user/login`,
        method: "POST",
        form_data: {
          email: email,
          password: password,
        },
      });

      const data = await response.json();

      if (response.ok) {
        // Nếu đăng nhập thành công, trả về session ID và thông tin người dùng
        return res.status(200).json(data);
      } else {
        // Nếu Odoo trả về lỗi, chuyển tiếp lỗi tới client
        return res.status(300).json(data);
      }
    
    } catch (error) {
      return res.status(500).json({ error: "Lỗi khi gọi API Odoo" });
    }
  } else {
    return res.status(405).json({ error: "Chỉ hỗ trợ phương thức POST" });
  }
}
