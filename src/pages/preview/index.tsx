import dynamic from "next/dynamic";

const DraftPosts = dynamic(() =>
  import("@/components/draft-post").then((mod) => mod.DraftPosts)
);

const Page = () => {
  return (
    <>
        <DraftPosts />
    </>
  );
};

export default Page;
