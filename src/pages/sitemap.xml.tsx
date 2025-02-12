"server only";

import { TMenus, menus } from "@/router";
import { fetchAuth } from "@/utils/fetchAuth";
import { NextApiResponse } from "next";

const URL = process.env.NEXT_PUBLIC_DOMAIN;
const getAllPaths = (menus: TMenus) => {
  const paths: string[] = [];
  menus.forEach((menu) => {
    if (menu.path !== "#") paths.push(menu.path);
    if (menu?.childs) {
      paths.push(...getAllPaths(menu?.childs));
    }
  });
  return paths;
};

const generateSiteMap = (posts: any[]) => {
  const staticPaths = getAllPaths(menus);
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">
      <!-- Add the static URLs manually -->
      ${staticPaths?.map(
        (staticPath: string) =>
          `<url>
            <loc>${URL}${staticPath}</loc>
          </url>`
      )}
     ${posts
       ?.map(({ slug }) => {
         return `
           <url>
               <loc>${`${URL}/${slug}`}</loc>
           </url>
         `;
       })
       .join("")}
   </urlset>
 `;
};

export const getServerSideProps = async ({ res }: { res: NextApiResponse }) => {
  const api_url = process.env.API_URL;
  let posts: any[] = [];
  try {
    const resData = await fetchAuth({
      url: `${api_url}/posts?_embed&per_page=100&status=publish&page=${1}`,
      revalidate: 3600
    });

    posts = (await resData?.json()) || [];
  } catch (error) {
    console.log(error);
  }

  const sitemap = generateSiteMap(posts);
  res.setHeader("Content-Type", "text/xml");
  res.write(sitemap);
  res.end();
  return {
    props: {}
  };
};

const SiteMap = () => {};

export default SiteMap;
