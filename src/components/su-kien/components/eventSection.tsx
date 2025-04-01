import { useState } from "react"
import EventCard from "./eventCard"
import { Button } from "@/components/ui/button"

interface Event {
  id: string
  title: string
  date: string
  time: string
  teacher: string
  status: string
  start: Date
  imageSrc?: string
  [key: string]: any
}

interface EventSectionProps {
  title: string
  events: Event[]
}

const INITIAL_COUNT = 4

export default function EventSection({ title, events }: EventSectionProps) {
  const [showAll, setShowAll] = useState(false)

  const visibleEvents = showAll ? events : events.slice(0, INITIAL_COUNT)
  const hasMore = events.length > INITIAL_COUNT

  return (
    <section className="mb-12">
        <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-semibold mb-4">{title}</h3>
      {hasMore && (
        <div className="mt-4 text-center">
          <Button variant="outline" onClick={() => setShowAll(!showAll)}>
            {showAll ? "Thu gọn" : "Xem thêm"}
          </Button>
        </div>
      )}
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {visibleEvents.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </section>
  )
}
