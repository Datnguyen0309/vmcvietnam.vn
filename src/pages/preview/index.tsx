import Layout from "@/components/layout";
import dynamic from "next/dynamic";

const DraftPosts = dynamic(() =>
  import("@/components/draft-post").then((mod) => mod.DraftPosts)
);

const Page = () => {
  return (
    <>
      <Layout>
        <DraftPosts />
      </Layout>
    </>
  );
};

export default Page;
