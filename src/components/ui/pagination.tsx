"use client"

import type React from "react"

import { ChevronLeft, ChevronRight } from "lucide-react"
import type { ButtonHTMLAttributes } from "react"
import { cn } from "@/lib/utils"

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (direction: "prev" | "next" | number) => void
  className?: string
}

export function Pagination({ currentPage, totalPages, onPageChange, className }: PaginationProps) {
  // Generate page numbers to display
  const getPageNumbers = () => {
    const pageNumbers = []
    const maxPagesToShow = 5

    if (totalPages <= maxPagesToShow) {
      // Show all pages if total is less than max to show
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i)
      }
    } else {
      // Always show first page
      pageNumbers.push(1)

      // Calculate start and end of page range around current page
      let start = Math.max(2, currentPage - 1)
      let end = Math.min(totalPages - 1, currentPage + 1)

      // Adjust if we're near the beginning
      if (currentPage <= 3) {
        end = Math.min(totalPages - 1, 4)
      }

      // Adjust if we're near the end
      if (currentPage >= totalPages - 2) {
        start = Math.max(2, totalPages - 3)
      }

      // Add ellipsis if needed before middle pages
      if (start > 2) {
        pageNumbers.push("ellipsis-start")
      }

      // Add middle pages
      for (let i = start; i <= end; i++) {
        pageNumbers.push(i)
      }

      // Add ellipsis if needed after middle pages
      if (end < totalPages - 1) {
        pageNumbers.push("ellipsis-end")
      }

      // Always show last page
      pageNumbers.push(totalPages)
    }

    return pageNumbers
  }

  const pageNumbers = getPageNumbers()

  return (
    <nav className={cn("flex items-center justify-center space-x-2 mt-8", className)} aria-label="Pagination">
      <PaginationButton
        onClick={() => onPageChange("prev")}
        disabled={currentPage === 1}
        aria-label="Go to previous page"
      >
        <ChevronLeft className="h-4 w-4" />
        <span className="sr-only">Previous</span>
      </PaginationButton>

      <div className="flex items-center space-x-2">
        {pageNumbers.map((page, index) => {
          if (page === "ellipsis-start" || page === "ellipsis-end") {
            return (
              <span key={`ellipsis-${index}`} className="px-2 text-sm text-muted-foreground">
                ...
              </span>
            )
          }

          return (
            <PaginationNumber
              key={index}
              page={page as number}
              isActive={currentPage === page}
              onClick={() => onPageChange(page as number)}
            />
          )
        })}
      </div>

      <PaginationButton
        onClick={() => onPageChange("next")}
        disabled={currentPage === totalPages}
        aria-label="Go to next page"
      >
        <span className="sr-only">Next</span>
        <ChevronRight className="h-4 w-4" />
      </PaginationButton>
    </nav>
  )
}

interface PaginationButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
}

function PaginationButton({ className, children, ...props }: PaginationButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-md border border-input bg-background px-3 py-2 text-sm font-medium text-foreground shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
}

interface PaginationNumberProps {
  page: number
  isActive?: boolean
  onClick: () => void
}

function PaginationNumber({ page, isActive, onClick }: PaginationNumberProps) {
  return (
    <button
      className={cn(
        "inline-flex h-9 w-9 items-center justify-center rounded-md text-sm font-medium transition-colors",
        isActive
          ? "bg-primary text-primary-foreground hover:bg-primary/90"
          : "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
      )}
      onClick={onClick}
      aria-current={isActive ? "page" : undefined}
    >
      {page}
    </button>
  )
}
