import { useEffect, useState } from "react";
import { ScrollView } from "../ScrollView";
import { Banner } from "./Banner";
import { ListBenefit } from "./Benefit";
import { LatestPosts } from "./DataNewPost";
import { HotCourses } from "./HotCourses";
import { Register } from "./Register";
import { Reviews } from "./Reviews";
import { Majors } from "./System";
import TeacherListAndDetails from "./Teacher";
import { Trend } from "./Trend";

export const Home = () => {
  const [homeContent, setHomeContent] = useState<any>(null);
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    const getHomeContent = async () => {
      try {
        const res = await fetch(`/api/content-page/?type=trang-chu`, {
          next: { revalidate: 3 },
        });
        const data = await res.json();
        setHomeContent(data?.contentPage[0]);
      } catch (error) {
        console.error("Error fetching home content:", error);
      }
    };
    getHomeContent();
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const postResponse = await fetch(`/api/posts?page=1`);
        if (!postResponse.ok) {
          throw new Error(`Failed to fetch posts: ${postResponse.statusText}`);
        }
        const data = await postResponse.json();
        setPosts(data.posts); // Lưu bài viết vào state
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <>
      <Banner banner={homeContent?.acf?.banner} />
      <Majors section_1={homeContent?.acf?.section_1} />
      <ScrollView>
        <ListBenefit section_2={homeContent?.acf?.section_2} />
        <HotCourses />
        <Register section_4={homeContent?.acf?.section_4} />
        <TeacherListAndDetails />
        <LatestPosts posts={posts} />
        <Reviews section_7={homeContent?.acf?.section_7} />
        <Trend section_8={homeContent?.acf?.section_8} />
      </ScrollView>
    </>
  );
};