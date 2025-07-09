import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const HeroBanner = dynamic(() =>
  import("@/components/about/Banner").then((mod) => mod.HeroBanner)
);
const Solution = dynamic(() =>
  import("@/components/about/Solution").then((mod) => mod.Solution)
);
const BusinessAreas = dynamic(() =>
  import("@/components/about/BusinessAreas").then((mod) => mod.BusinessAreas)
);
const ConsultationSection = dynamic(() =>
  import("@/components/about/ConsultationSection").then(
    (mod) => mod.ConsultationSection
  )
);
const Necessary = dynamic(() =>
  import("@/components/about/Necessary").then((mod) => mod.Necessary)
);

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
