import { useEffect, useState } from "react";
import { ScrollView } from "../ScrollView";
import { Banner } from "./Banner";
import { ListBenefit } from "./Benefit";
import { LatestPosts } from "./DataNewPost";
import { HotCourses } from "./HotCourses";
import { Register } from "./Register";
import { Reviews } from "./Reviews";
import { Majors } from "./System";
import { Trend } from "./Trend";
import TeacherList from "./Teacher";

export const Home = () => {
  const [homeContent, setHomeContent] = useState<any>(null);

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

  return (
    <>
      <Banner banner={homeContent?.acf?.banner} />
      <Majors section_1={homeContent?.acf?.section_1} />
      <ScrollView>
        <ListBenefit section_2={homeContent?.acf?.section_2} />
        <HotCourses section_3={homeContent?.acf?.section_3}/>
        <Register section_4={homeContent?.acf?.section_4} />
        <TeacherList  section_5={homeContent?.acf?.section_5}/>
        <LatestPosts />
        <Reviews section_7={homeContent?.acf?.section_7} />
        <Trend section_8={homeContent?.acf?.section_8} />
      </ScrollView>
    </>
  );
};