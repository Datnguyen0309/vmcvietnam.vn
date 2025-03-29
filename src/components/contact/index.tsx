import { useState, useEffect } from "react";
import { BusinessSolutions } from "./BusinessSolutions";
import { ContactHeader } from "./ContactHeader";
import { ContactSection } from "./ContactSection";

export const Contact = () => {
  const [pageContent, setPageContent] = useState<any>(null);

  useEffect(() => {
    const getPageContent = async () => {
      try {
        const res = await fetch(`/api/content-page/?type=lien-he`, {
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
      <ContactHeader title={pageContent?.acf?.tieu_de_trang} />
      <BusinessSolutions content={pageContent?.acf?.content} />
      <ContactSection
        contact={pageContent?.acf?.contact}
        mapFrame={pageContent?.acf?.frame}
      />
    </>
  );
};
