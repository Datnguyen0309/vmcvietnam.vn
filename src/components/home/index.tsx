"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Banner } from "./Banner";
import { Majors } from "./System";

const ScrollView = dynamic(() => import("../ScrollView").then((mod) => mod.ScrollView), {
  loading: () => <p className="loading loading-spinner loading-md"></p>,
});

const ListBenefit = dynamic(() => import("./Benefit").then((mod) => mod.ListBenefit), {
  loading: () => <p className="loading loading-spinner loading-md"></p>,
});
const LatestPosts = dynamic(() => import("./DataNewPost").then((mod) => mod.LatestPosts), {
  loading: () => <p className="loading loading-spinner loading-md"></p>,
});
const HotCourses = dynamic(() => import("./HotCourses").then((mod) => mod.HotCourses), {
  loading: () => <p className="loading loading-spinner loading-md"></p>,
});
const Register = dynamic(() => import("./Register").then((mod) => mod.Register), {
  loading: () => <p className="loading loading-spinner loading-md"></p>,
});
const Reviews = dynamic(() => import("./Reviews").then((mod) => mod.Reviews), {
  loading: () => <p className="loading loading-spinner loading-md"></p>,
});

const Trend = dynamic(() => import("./Trend").then((mod) => mod.Trend), {
  loading: () => <p className="loading loading-spinner loading-md"></p>,
});
const TeacherList = dynamic(() => import("./Teacher").then((mod) => mod.default), {
  loading: () => <p className="loading loading-spinner loading-md"></p>,
});
const Scroll = dynamic(() => import("./Scroll").then((mod) => mod.Scroll), {
  loading: () => <p className="loading loading-spinner loading-md"></p>,
});

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
        <HotCourses section_3={homeContent?.acf?.section_3} />
        <Register section_4={homeContent?.acf?.section_4} />
        <TeacherList section_5={homeContent?.acf?.section_5} />
        <LatestPosts />
        <Reviews section_7={homeContent?.acf?.section_7} />
        <Scroll section_2={homeContent?.acf?.section_2} />
        <Trend section_8={homeContent?.acf?.section_8} />
      </ScrollView>
    </>
  );
};
