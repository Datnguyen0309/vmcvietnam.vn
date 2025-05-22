import { useState, useEffect } from "react";
import { HeroBanner } from "./Banner";
import { Solution } from "./Solution";
import { BusinessAreas } from "./BusinessAreas";
import { ConsultationSection } from "./ConsultationSection";
import { Necessary } from "./Necessary";


export const About = () => {
  const [pageContent, setPageContent] = useState<any>(null);

  useEffect(() => {
    const getPageContent = async () => {
      try {
        const res = await fetch(`/api/content-page/?type=gioi-thieu`, {
          next: { revalidate: 3 }
        });
        const data = await res.json();
        setPageContent(data?.contentPage[0]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getPageContent();
  }, []);

  return (
    <>
      <HeroBanner banner={pageContent?.acf?.banner} />
      <Solution AboutUs={pageContent?.acf?.about_us} />
      <BusinessAreas busi={pageContent?.acf?.business_areas} />
      <ConsultationSection consultation={pageContent?.acf?.consultation} />
      <Necessary necessary={pageContent?.acf?.necessary} />
    </>
  );
};
