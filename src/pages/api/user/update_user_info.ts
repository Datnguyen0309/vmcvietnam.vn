import { fetchAuthOdooPersonalToken } from "@/utils/fetch-auth-odoo";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const odoo_api = process.env.ODOO_URL || "http://127.0.0.1:8069";
  const { session_log_id, name, email, image, age, phone, gender, career } = req.body;

  if (req.method === "POST") {
    // Kiểm tra nếu session_log_id không tồn tại
    if (!session_log_id) {
      return res.status(401).json({ error: "Bạn chưa đăng nhập" });
    }

    try {
      // Gửi request đến Odoo API để cập nhật thông tin người dùng
      const response = await fetchAuthOdooPersonalToken({
        api_url: `${odoo_api}/user/update_user_info`,
        method: "POST",
        personal_token: session_log_id,
        form_data: {
          name: name,
          email: email,
          image: image,
          age: Number(age),
          phone: phone,
          gender: gender,
          career: career,
        },
      });

      const data = await response.json();

      // Nếu Odoo API trả về thành công
      if (response.ok) {
        return res.status(200).json({ success: true, updated_user_info: data });
      } else {
        return res.status(400).json({
          error: data.error || "Lỗi khi cập nhật thông tin người dùng",
        });
      }
    } catch (error) {
      // Xử lý lỗi khi gọi Odoo API
      return res.status(500).json({ error: "Có lỗi xảy ra khi gọi API Odoo" });
    }
  } else {
    // Nếu phương thức không phải là POST
    return res.status(405).json({ error: "Chỉ hỗ trợ phương thức POST" });
  }
}
