import { CTAButton } from "./Btn";
import { useEffect, useState } from "react";

export const CTA = () => {
    const [homeContent, setHomeContent] = useState<any>(null);
  
    useEffect(() => {
      const getHomeContent = async () => {
        try {
          const res = await fetch(`/api/content-page/?type=cta`, {
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
    <div className="fixed bottom-0 right-[34px] translate-y-[-152%] w-10 z-50">
      <div className="flex flex-col items-stretch space-y-3">
        <CTAButton type="zalo" link= {homeContent?.acf?.link_zalo ||"https://zalo.me/your-zalo-id"} />
        <CTAButton type="phone"  link= {homeContent?.acf?.link_dt ||"tel:+123456789"} />
      </div>
    </div>
  );
};
