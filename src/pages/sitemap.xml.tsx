// pages/sitemap.xml.tsx
import { GetServerSideProps } from "next";

const Sitemap = () => {}; // Không render

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const apiUrl = `https://admin.ome.edu.vn/wp-json/wp/v2/posts`;
  let posts: any[] = [];
  let page = 1;
  let hasMorePosts = true;

  while (hasMorePosts) {
    const response = await fetch(`${apiUrl}?status=publish&page=${page}&per_page=100&_embed`);
    const data = await response.json();
    if (!Array.isArray(data) || data.length === 0) {
      hasMorePosts = false;
    } else {
      posts = [...posts, ...data];
      page++;
    }
  }

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://ome.edu.vn/</loc><priority>0.5</priority></url>
  <url><loc>https://ome.edu.vn/gioi-thieu/</loc><priority>0.5</priority></url>
  <url><loc>https://ome.edu.vn/khoa-hoc/</loc><priority>0.5</priority></url>
  <url><loc>https://ome.edu.vn/tin-tuc/</loc><priority>0.5</priority></url>
  <url><loc>https://ome.edu.vn/lien-he/</loc><priority>0.5</priority></url>
  ${posts
    .map((post) => {
      const categories = post._embedded?.["wp:term"]?.[0] || []; // lấy danh sách categories đã _embed
      const firstCategory = categories[0]?.slug || "tin-tuc"; // fallback nếu không có
      let loc = post.link.replace("https://ome.edu.vn//", `https://ome.edu.vn/${firstCategory}/`);
      return `<url><loc>${loc}</loc><priority>0.5</priority></url>`;
    })
    .join("")}
</urlset>`;

  res.setHeader("Content-Type", "text/xml");
  res.write(sitemap);
  res.end();

  return { props: {} };
};

export default Sitemap;
