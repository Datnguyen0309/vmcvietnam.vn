"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import { DatePicker } from "./datePicker"

interface EventFilterProps {
  onFilterChange: (startDate: Date | undefined, endDate: Date | undefined) => void
}

export default function EventFilter({ onFilterChange }: EventFilterProps) {
  const [startDate, setStartDate] = useState<Date | undefined>(undefined)
  const [endDate, setEndDate] = useState<Date | undefined>(undefined)
  const applyFilters = () => {
    onFilterChange(
      startDate ? new Date(startDate.setHours(0, 0, 0, 0)) : undefined,
      endDate ? new Date(endDate.setHours(23, 59, 59, 999)) : undefined
    )
  }

  const clearFilters = () => {
    setStartDate(undefined)
    setEndDate(undefined)
    onFilterChange(undefined, undefined)
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
      <h3 className="text-lg font-medium mb-4">Lọc sự kiện theo ngày</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <DatePicker date={startDate} setDate={setStartDate} label="Từ ngày" />
        <DatePicker date={endDate} setDate={setEndDate} label="Đến ngày" />
      </div>

      <div className="flex justify-end space-x-2">
        <Button variant="outline" onClick={clearFilters} className="flex items-center">
          <X className="mr-1 h-4 w-4" />
          Xóa bộ lọc
        </Button>
        <Button onClick={applyFilters}>Áp dụng</Button>
      </div>
    </div>
  )
}
