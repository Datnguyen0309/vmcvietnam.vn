"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { CheckCircle, AlertCircle, X } from "lucide-react"
import { cn } from "@/lib/utils"

export type ToastType = "success" | "error" | "info"

export interface ToastOptions {
  message: string
  type: ToastType
  duration?: number
}

interface ToastProps {
  message: string
  type: ToastType
  onClose: () => void
  duration?: number
}

export function Toast({ message, type, onClose, duration = 3000 }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose()
    }, duration)

    return () => clearTimeout(timer)
  }, [duration, onClose])

  return (
    <motion.div
      initial={{ opacity: 0, y: -20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className={cn(
        "fixed top-40 right-4 z-50 flex items-center gap-3 rounded-lg shadow-lg px-4 py-3 min-w-[300px] max-w-md",
        type === "success" && "bg-green-50 border-l-4 border-green-500 text-green-700",
        type === "error" && "bg-red-50 border-l-4 border-red-500 text-red-700",
        type === "info" && "bg-blue-50 border-l-4 border-blue-500 text-blue-700",
      )}
    >
      <div className="flex-shrink-0">
        {type === "success" && <CheckCircle className="h-5 w-5 text-green-500" />}
        {type === "error" && <AlertCircle className="h-5 w-5 text-red-500" />}
        {type === "info" && <AlertCircle className="h-5 w-5 text-blue-500" />}
      </div>
      <div className="flex-1 mr-2">
        <p className="text-sm font-medium">{message}</p>
      </div>
      <button onClick={onClose} className="flex-shrink-0 rounded-full p-1 hover:bg-black/5 transition-colors">
        <X className="h-4 w-4" />
      </button>
    </motion.div>
  )
}

export function ToastContainer() {
  const [toasts, setToasts] = useState<(ToastOptions & { id: string })[]>([])

  // Create a type-safe function to show toasts
  const showToast = (options: ToastOptions) => {
    const id = Math.random().toString(36).substring(2, 9)
    setToasts((prev) => [...prev, { ...options, id }])
  }

  // Assign to window object with type assertion
  useEffect(() => {
    ;(window as any).showToast = showToast

    return () => {
      // Clean up when component unmounts
      delete (window as any).showToast
    }
  }, [])

  const closeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }

  return (
    <div className="fixed top-50 right-0 z-50 p-4 space-y-4 pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => (
          <div key={toast.id} className="pointer-events-auto">
            <Toast
              message={toast.message}
              type={toast.type}
              duration={toast.duration}
              onClose={() => closeToast(toast.id)}
            />
          </div>
        ))}
      </AnimatePresence>
    </div>
  )
}
