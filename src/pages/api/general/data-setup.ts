// pages/api/general/data-setup.ts
import { fetchAuthOdoo } from "@/utils/fetch-auth-odoo";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = "0";

  const token = process.env.NEXT_PUBLIC_TOKEN_NEXT;
  const odoo_api = process.env.ODOO_URL || "http://127.0.0.1:8069";
  const headerAuth = req.headers.authorization || "";
  const { root, type } = req.query as { [key: string]: string };

  // ❗ Nếu là list-category-groups thì không cần gửi form_data
  const form_data = type === "list-category-groups" ? {} : { type };

  try {
    const responOdoo = await fetchAuthOdoo({
      api_url: `${odoo_api}/${root}/${type}`,
      method: "POST",
      form_data,
    });

    const data = await responOdoo.json();

    if (headerAuth === `Bearer ${token}`) {
      switch (req.method) {
        case "POST":
          res.status(200).json({ message: "successfully", data: data?.data });
          return;
        default:
          res.status(405).json({ message: "Method not supported" });
      }
    } else {
      res.status(401).json({ error: "Authentication error" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
}
