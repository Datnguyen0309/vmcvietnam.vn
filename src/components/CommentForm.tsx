"use client"

import { useState, useRef, useEffect } from "react"
import type React from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Smile, Image, Send, User, Mail } from 'lucide-react'
import { Avatar } from "./Avatar"

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
  const [isExpanded, setIsExpanded] = useState(!!replyTo);
  const [isFocused, setIsFocused] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Expand form when there's content or when replying to someone
  useEffect(() => {
    if (comment || replyTo) {
      setIsExpanded(true);
    }
  }, [comment, replyTo]);

  const handleFocus = () => {
    setIsFocused(true);
    setIsExpanded(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
    if (!comment && !replyTo) {
      setIsExpanded(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && email && comment.trim()) {
      onSubmit(e);
    }
  };

  // Get avatar text - use first letter of name or "G" for guest
  const avatarText = name ? name[0] : "G";

  return (
    <div className={`comment-form rounded-xl bg-white transition-all ${replyTo ? 'border border-gray-200 p-3' : 'shadow-sm'}`}>
      <form onSubmit={handleSubmit}>
        <div className="flex gap-2">
          {/* Avatar */}
          <div className="mt-1">
            <Avatar 
              className="h-8 w-8 rounded-full border border-gray-200" 
              fallback={avatarText}
            >
              <span className="text-[#4A306D] font-semibold">{avatarText}</span>
            </Avatar>
          </div>
          
          {/* Comment input area */}
          <div className="flex-1">
            {/* Main textarea */}
            <div className={`relative rounded-2xl bg-gray-100 transition-all ${isFocused ? 'ring-2 ring-[#4A306D]/20' : ''}`}>
              <Textarea
                ref={textareaRef}
                name="comment"
                value={comment}
                onChange={onChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                placeholder={replyTo ? `Phản hồi cho ${replyTo}...` : "Viết bình luận..."}
                className="min-h-[40px] max-h-[200px] border-0 bg-transparent px-3 py-2 text-sm text-gray-700 placeholder:text-gray-500 focus-visible:ring-0 focus-visible:ring-offset-0"
              />
              
              {/* Action buttons */}
              <div className="flex items-center justify-between border-t border-gray-200 bg-gray-50 px-3 py-1.5 rounded-b-2xl">
                <div className="flex gap-2">
                  <button type="button" className="text-gray-500 hover:text-[#4A306D] transition-colors">
                    <Smile className="h-4 w-4" />
                  </button>
                  <button type="button" className="text-gray-500 hover:text-[#4A306D] transition-colors">
                    <Image className="h-4 w-4" />
                  </button>
                </div>
                
                <Button 
                  type="submit" 
                  size="sm"
                  disabled={!comment.trim() || !name || !email}
                  className="h-7 rounded-full bg-[#4A306D] px-3 text-xs text-white hover:bg-[#5d3d87] disabled:opacity-50"
                >
                  <Send className="mr-1 h-3 w-3" />
                  Gửi
                </Button>
              </div>
            </div>
            
            {/* Expanded form fields */}
            {(isExpanded || replyTo) && (
              <div className="mt-3 space-y-3 px-1 animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="flex items-center gap-1.5 text-xs font-medium text-gray-700">
                      <User className="h-3 w-3" />
                      Tên<span className="text-red-500">*</span>
                    </label>
                    <Input
                      type="text"
                      name="name"
                      value={name}
                      onChange={onChange}
                      required
                      className="h-8 border-gray-200 text-sm focus-visible:ring-[#4A306D]"
                      placeholder="Tên của bạn"
                    />
                  </div>
                  
                  <div className="space-y-1.5">
                    <label className="flex items-center gap-1.5 text-xs font-medium text-gray-700">
                      <Mail className="h-3 w-3" />
                      Email<span className="text-red-500">*</span>
                    </label>
                    <Input
                      type="email"
                      name="email"
                      value={email}
                      onChange={onChange}
                      required
                      className="h-8 border-gray-200 text-sm focus-visible:ring-[#4A306D]"
                      placeholder="Email của bạn"
                    />
                  </div>
                </div>
                
                <div className="flex items-start gap-2">
                  <Checkbox
                    id="save-info"
                    checked={rememberMe}
                    onCheckedChange={(checked) => {
                      const syntheticEvent = {
                        target: {
                          checked: checked === true,
                        },
                      } as React.ChangeEvent<HTMLInputElement>
                      onRememberMeChange(syntheticEvent)
                    }}
                    className="mt-0.5 h-3.5 w-3.5 border-gray-300 data-[state=checked]:bg-[#4A306D]"
                  />
                  <label htmlFor="save-info" className="text-xs text-gray-600">
                    Lưu tên, email của tôi trong trình duyệt này cho lần tiếp theo tôi bình luận.
                  </label>
                </div>
              </div>
            )}
          </div>
        </div>
      </form>
    </div>
  )
}
