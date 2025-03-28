"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export interface CommentFormProps {
  isReview?: boolean
  replyTo?: string
  name: string
  email: string
  comment: string
  rememberMe: boolean
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  onRememberMeChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onSubmit: (e: React.FormEvent) => void
}

export const CommentForm: React.FC<CommentFormProps> = ({
  isReview,
  replyTo,
  name,
  email,
  comment,
  rememberMe,
  onChange,
  onRememberMeChange,
  onSubmit,
}) => {
  return (
    <Card className="mt-10 border-t-4 border-t-[#4A306D] shadow-md">
      <CardHeader className="bg-gradient-to-r from-[#4A306D] to-[#6b4a8e] pb-4">
        <h2 className="text-[22px] font-bold text-white">
          {replyTo ? `Phản hồi bình luận - ${replyTo}` : isReview ? "Đánh giá của bạn" : "Để lại bình luận"}
        </h2>
      </CardHeader>
      <CardContent className="p-6">
        <form onSubmit={onSubmit}>
          <div className="md:flex md:gap-6">
            {/* Left column - Personal info */}
            <div className="md:w-1/3 space-y-5">
              <div className="space-y-2">
                <label className="block text-[#4A306D] font-medium">
                  Tên<span className="ml-1 text-red-500">*</span>
                </label>
                <Input
                  type="text"
                  name="name"
                  value={name}
                  onChange={onChange}
                  required
                  className="w-full border-[#d4c6e3] focus-visible:ring-[#4A306D] text-[#4A306D]"
                  placeholder="Nhập tên của bạn"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-[#4A306D] font-medium">
                  Email<span className="ml-1 text-red-500">*</span>
                </label>
                <Input
                  type="email"
                  name="email"
                  value={email}
                  onChange={onChange}
                  required
                  className="w-full border-[#d4c6e3] focus-visible:ring-[#4A306D] text-[#4A306D]"
                  placeholder="Nhập email của bạn"
                />
              </div>

              <div className="flex items-start gap-3 mt-4">
                <Checkbox
                  id="save-info"
                  checked={rememberMe}
                  onCheckedChange={(checked) => {
                    // Create a synthetic event to match the expected onChange handler
                    const syntheticEvent = {
                      target: {
                        checked: checked === true,
                      },
                    } as React.ChangeEvent<HTMLInputElement>
                    onRememberMeChange(syntheticEvent)
                  }}
                  className="mt-1 h-4 w-4 border-[#d4c6e3] data-[state=checked]:bg-[#4A306D] data-[state=checked]:text-white"
                />
                <label htmlFor="save-info" className="text-sm text-[#6b5683] leading-tight">
                  Lưu tên, email của tôi trong trình duyệt này cho lần tiếp theo tôi bình luận.
                </label>
              </div>
            </div>

            {/* Right column - Comment */}
            <div className="md:w-2/3 mt-5 md:mt-0">
              <div className="space-y-2">
                <label className="block text-[#4A306D] font-medium">
                  {isReview ? "Đánh giá của bạn" : "Bình luận của bạn"}
                  <span className="ml-1 text-red-500">*</span>
                </label>
                <Textarea
                  name="comment"
                  value={comment}
                  onChange={onChange}
                  required
                  className="min-h-[180px] w-full border-[#d4c6e3] focus-visible:ring-[#4A306D] text-[#4A306D]"
                  placeholder="Nhập bình luận của bạn..."
                />
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <Button
              type="submit"
              className="bg-[#4A306D] hover:bg-[#5d3d87] text-white px-8 py-2.5 transition-colors rounded-md"
            >
              {isReview ? "Đăng đánh giá" : "Đăng bình luận"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

