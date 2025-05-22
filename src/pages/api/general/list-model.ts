import { fetchAuthOdoo } from "@/utils/fetch-auth-odoo";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = "0";
  const odoo_api = process.env.ODOO_URL || "http://127.0.0.1:8069";
  const query = req.query as { [key: string]: string };

  const METHOD = req.method;

  const {
    root,
    type,
    teacher = "all",
    categories = "all",
    page = "1",
    perpage = "99"
  } = query;
  try {
    const responOdoo = await fetchAuthOdoo({
      api_url: `${odoo_api}/${root}/${type}?teacher=${teacher}&categories=${categories}&perpage=${perpage}&page=${page}`,
      method: "POST"
    });

    const data = await responOdoo.json();
    switch (METHOD) {
      case "POST": {
        res
          .status(200)
          .json({ message: "successfully", data: data?.data, bug: data });
        return;
      }

      default:
        res.status(201).json({ message: "Method not supported" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
}
