"use client"
import { useState } from "react"
import EventSection from "./eventSection"
import EventFilter from "./eventFilter"
import { AnimatePresence, motion } from "framer-motion"

interface Event {
  id: string
  title: string
  date: string
  time: string
  teacher: string
  eventLink?: string
  teacherLink?: string
  upcomingEventLink?: string
  upcomingTeacherLink?: string
  isZoom?: boolean
  isFree?: boolean
  imageSrc?: string
}

interface EventSectionData {
  section_slug: string
  section_title: string
  events: Event[]
}

interface EventTabsProps {
  eventSections: EventSectionData[]
}

export default function EventTabs({ eventSections }: EventTabsProps) {
  const [activeTab, setActiveTab] = useState<"all" | "upcoming" | "ongoing">("all")
  const [dateRange, setDateRange] = useState<{ startDate?: Date; endDate?: Date }>({})
  const now = new Date()
  
  const parseEventTime = (event: Event): { start: Date; end: Date } => {
    try {
      if (!event.date || !event.time) throw new Error()
  
      const [day, month, year] = event.date.split("/").map(Number)
      const [startTime, endTime] = event.time.split(" - ")
      const [startHour, startMinute] = startTime.split(":").map(Number)
      const [endHour, endMinute] = endTime.split(":").map(Number)
  
      const start = new Date(year, month - 1, day, startHour, startMinute)
      const end = new Date(year, month - 1, day, endHour, endMinute)
  
      if (isNaN(start.getTime()) || isNaN(end.getTime())) throw new Error()
  
      return { start, end }
    } catch {
      return { start: new Date(0), end: new Date(0) } // coi như sự kiện đã qua
    }
  }
  

  const isInDateRange = (event: Event) => {
    const { start } = parseEventTime(event)
    const afterStart = !dateRange.startDate || start >= dateRange.startDate
    const beforeEnd = !dateRange.endDate || start <= dateRange.endDate
    return afterStart && beforeEnd
  }

  const annotateEventsWithStatus = (events: Event[]): (Event & { status: string; start: Date })[] => {
    return events
      .map((event) => {
        const { start, end } = parseEventTime(event)
        let status = "upcoming"
        if (now >= start && now <= end) status = "ongoing"
        else if (now > end) status = "past"
        return { ...event, status, start }
      })
      .filter((event) => {
        if (activeTab === "all") return true
        return event.status === activeTab
      })
      .filter(isInDateRange)
  }

  const filteredSections = eventSections
    .map((section) => ({
      ...section,
      events: annotateEventsWithStatus(section.events),
    }))
    .filter((section) => section.events.length > 0)

  return (
    <div>
      <h2 className="text-4xl font-bold text-center text-[#4A306D] mb-8">SỰ KIỆN NỔI BẬT</h2>
      <div className="flex justify-center gap-4 mb-8">
        {["all", "ongoing", "upcoming"].map((tab) => (
          <button
            key={tab}
            className={`px-6 py-2 rounded-full transition-colors ${
              activeTab === tab ? "bg-red-400 text-white" : "bg-white text-[#4A306D] hover:bg-gray-100"
            }`}
            onClick={() => setActiveTab(tab as any)}
          >
            {{
              all: "Tất Cả",
              ongoing: "Đang diễn Ra",
              upcoming: "Sắp diễn Ra",
            }[tab]}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {activeTab === "all" && (
          <motion.div
            key="filter"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <EventFilter onFilterChange={(start, end) => setDateRange({ startDate: start, endDate: end })} />
          </motion.div>
        )}
      </AnimatePresence>

      {filteredSections.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-lg text-gray-500">Không tìm thấy sự kiện nào phù hợp với bộ lọc.</p>
        </div>
      ) : (
        <>
          {filteredSections.map((section) => (
            <EventSection key={section.section_slug} title={section.section_title} events={section.events} />
          ))}
        </>
      )}
    </div>
  )
}
