// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { fetchAuth } from "@/utils/fetchAuth";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  id: string;
  href: string;
};
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  //lấy dữ liệu form từ wordpress
  const type = req?.query?.type || "";
  const api_url = process.env.API_URL || "";
  let id: string = "";
  let href: string = "";
  try {
    const responeWordpress = await fetchAuth({
      url: `${api_url}/form`,
      revalidate: 1
    });
    const data: any[] = await responeWordpress.json();
    const htmlString = data?.length > 0 ? data[0]?.acf?.[String(type)] : "";
    // Sử dụng biểu thức chính quy để trích xuất chuỗi id
    const idIndex = htmlString.indexOf('id="');
    if (idIndex !== -1) {
      const idStart = idIndex + 'id="'.length;
      const idEnd = htmlString.indexOf('"', idStart);
      if (idEnd !== -1) {
        id = htmlString.substring(idStart, idEnd);
      }
    }
    // Sử dụng biểu thức chính quy để trích xuất chuỗi href
    const hrefIndex = htmlString.indexOf("https://");
    if (hrefIndex !== -1) {
      const hrefStart = hrefIndex;
      const hrefEnd = htmlString.indexOf("&#8221", hrefStart);
      if (hrefEnd !== -1) {
        href = htmlString.substring(hrefStart, hrefEnd);
      } else {
        const hrefEnd = htmlString.indexOf('"', hrefStart);
        if (hrefEnd !== -1) href = htmlString.substring(hrefStart, hrefEnd);
      }
    }
  } catch (error) {
    console.log(error);
  }
  if (req.method === "GET") {
    res.status(200).json({
      id,
      href
    });
  }
}
