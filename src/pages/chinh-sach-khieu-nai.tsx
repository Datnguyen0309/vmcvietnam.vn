import { Policy } from "@/components/policy";
import { GetServerSideProps } from "next";
import { NextSeo } from "next-seo";

export const getServerSideProps: GetServerSideProps = async () => {
  const api_url = process.env.API_URL || "";

  try {
    const res = await fetch(`${api_url}/posts?slug=chinh-sach-khieu-nai&_embed`, {
      next: { revalidate: 300 },
    });

    if (!res.ok) {
      throw new Error(`Posts fetch failed with status: ${res.statusText}`);
    }

    const posts = await res.json();
    const post = posts?.length ? posts[0] : null; // Đảm bảo không có undefined

    if (!post) {
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }

    return {
      props: { post },
    };
  } catch (error) {
    console.error("Error fetching post:", error);

    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
};

const Page = ({ post }: { post: any }) => {
  return (
    <>
      <NextSeo
        title="Chính sách khiếu lại  "
        description="Chính sách khiếu lại"
      />
      <Policy post={post} />
    </>
  );
};

export default Page;
