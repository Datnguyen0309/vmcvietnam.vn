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
        console.log(data)
        setEventSections(data.eventSections);
      } catch (error) {
        console.error("Error fetching event sections:", error);
      }
    };
    getEventSections();
  }, []);

  
  return (
    <div>
      <EventSlider />
      <div className="container mx-auto max-w-7xl px-4 py-8">
      <EventTabs eventSections={eventSections} />
      </div>
    </div>
  )
}
