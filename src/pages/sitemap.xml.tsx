// pages/sitemap.xml.tsx
import { GetServerSideProps } from "next";

const Sitemap = () => { }; // Không render gì

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const apiUrl = "https://admindsome.devlab.info.vn/wp-json/wp/v2/posts";
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
        const originalLink = post.link.replace("https://admindsome.devlab.info.vn", "https://ome.edu.vn");
        const slug = post.slug;
        const categories = post._embedded?.["wp:term"]?.[0] || [];
        const catSlugs = categories.map((cat:any) => cat.slug);

        let path = `https://ome.edu.vn/tin-tuc/${slug}`;
        if (catSlugs.includes("seo-khoa-hoc")) {
          path = `https://ome.edu.vn/${slug}`;
        } else if (catSlugs.includes("khoa-hoc-vmc")) {
          path = `https://ome.edu.vn/khoa-hoc/${slug}`;
        }

        return `<url><loc>${path}</loc><priority>0.5</priority></url>`;
      })
      .join("")}
</urlset>`;

  res.setHeader("Content-Type", "text/xml");
  res.write(sitemap);
  res.end();

  return { props: {} };
};

export default Sitemap;
