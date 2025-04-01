"use client"

import type React from "react"

import { Calendar, Clock, User } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface Event {
  id: string
  title: string
  date: string
  time: string
  teacher: string
  status: string
  start: Date
  imageSrc?: string
  eventLink?: string
  teacherLink?: string
  upcomingEventLink?: string
  upcomingTeacherLink?: string
}

const getCountdownLabel = (start: Date): string | null => {
  const now = new Date()
  const diffMinutes = Math.floor((start.getTime() - now.getTime()) / 60000)

  if (diffMinutes <= 0) return null
  if (diffMinutes < 60) return `Còn ${diffMinutes} phút nữa`
  if (diffMinutes < 1440) return `Còn ${Math.floor(diffMinutes / 60)} giờ nữa`
  return null
}
export default function EventCard({ event }: { event: Event }) {
  const {
    title,
    date,
    time,
    teacher,
    imageSrc,
    status,
    start,
    eventLink,
    teacherLink,
    upcomingEventLink,
    upcomingTeacherLink,
  } = event

  const badge =
    status === "ongoing"
      ? { text: "Đang diễn ra", color: "bg-green-100 text-green-800" }
      : status === "upcoming"
        ? { text: "Sắp diễn ra", color: "bg-yellow-100 text-yellow-800" }
        : { text: "Đã kết thúc", color: "bg-gray-100 text-gray-600" }

  const eventHref = status === "upcoming" && upcomingEventLink ? upcomingEventLink : eventLink
  const teacherHref = status === "upcoming" && upcomingTeacherLink ? upcomingTeacherLink : teacherLink

  return (
    <Link href={eventHref || "#"} className="block">
      <div className={`
            overflow-visible bg-white relative shadow-md 
            rounded-[6px] rounded-tl-[25px] rounded-br-[25px] 
            transition-transform duration-300 ease-in-out 
            transform hover:translate-y-[-5px] 
            hover:opacity-90
          `}>
        <div className="relative">
          <Image
            src={imageSrc || "/placeholder.svg"}
            alt={title}
            width={200}
            height={200}
            className="w-full aspect-square object-cover transition-transform"
          />
          <div className="absolute top-2 right-2 text-white text-xs px-2 py-1 rounded-full">
            {status === "upcoming" && (
              <span className="text-xs text-[#4A306D] italic pr-[6px]">{getCountdownLabel(start)}</span>
            )}
            <span className={`text-xs font-medium px-3 py-1 rounded-full ${badge.color}`}>
              {badge.text}
            </span>
          </div>
        </div>
        <div className="p-4">
          <h3 className="text-[#4A306D] font-medium text-lg text-center mb-2">{title}</h3>
          <div className="flex justify-between items-center text-gray-600 text-sm mb-3">
            <div>
              <div className="flex items-center mb-1">
                <Calendar className="w-4 h-4 mr-2" />
                <span>{date}</span>
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                <span>{time}</span>
              </div>
            </div>
            <div className="text-right">
              <span className="text-sm">
                Zoom
                <span className="block text-xs font-bold">Miễn phí</span>
              </span>
            </div>
          </div>
          <Link href={teacherHref || "#"} className="hover:underline">
            <div
              className="flex items-center border-t pt-3 cursor-pointer hover:text-red-500 transition-colors"
            >
              <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center text-red-500 mr-2">
                <User className="w-4 h-4" />
              </div>
              {teacher}
            </div>
          </Link>
        </div>
      </div>
    </Link>
  )
}

