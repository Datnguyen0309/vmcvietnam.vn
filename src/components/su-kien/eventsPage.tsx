import { useEffect, useState } from "react";
import EventTabs from "./components/eventTabs"
import EventSlider from "./eventSlider"

export default function EventsPage() {
  const [eventSections, setEventSections] = useState([]);
  useEffect(() => {
    const getEventSections = async () => {
      try {
        const res = await fetch("/api/su-kien");
        const data = await res.json();
        setEventSections(data.eventSections);

      } catch (error) {
        console.error("Error fetching event sections:", error);
      }
    };
    getEventSections();
  }, []);
  

  const [homeContent, setHomeContent] = useState<any>(null);

  useEffect(() => {
    const getHomeContent = async () => {
      try {
        const res = await fetch(`/api/content-page/?type=su-kien`, {
          next: { revalidate: 3 },
        });
        const data = await res.json();
        console.log(data)
        setHomeContent(data?.contentPage[0]);
      } catch (error) {
        console.error("Error fetching home content:", error);
      }
    };
    getHomeContent();
  }, []);

  return (
    <div>
      <EventSlider group={homeContent?.acf?.group}/>
      <div className="container mx-auto max-w-7xl px-4 py-8">
      <EventTabs eventSections={eventSections} />
      </div>
    </div>
  )
}
