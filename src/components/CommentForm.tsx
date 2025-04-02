"use client"

import { useState, useRef, useEffect } from "react"
import type React from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Smile, Camera, Paperclip, Sticker, GiftIcon, Send, User, Mail, X } from "lucide-react"
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

// Danh sách emoji phổ biến
const popularEmojis = [
  "😀",
  "😃",
  "😄",
  "😁",
  "😆",
  "😅",
  "😂",
  "🤣",
  "😊",
  "😇",
  "🙂",
  "🙃",
  "😉",
  "😌",
  "😍",
  "🥰",
  "😘",
  "😗",
  "😙",
  "😚",
  "😋",
  "😛",
  "😝",
  "😜",
  "🤪",
  "🤨",
  "🧐",
  "🤓",
  "😎",
  "🤩",
  "😏",
  "😒",
  "😞",
  "😔",
  "😟",
  "😕",
  "🙁",
  "☹️",
  "😣",
  "😖",
  "😫",
  "😩",
  "🥺",
  "😢",
  "😭",
  "😤",
  "😠",
  "😡",
  "🤬",
  "🤯",
  "😳",
  "🥵",
  "🥶",
  "😱",
  "😨",
  "😰",
  "😥",
  "😓",
  "🤗",
  "🤔",
  "👍",
  "👎",
  "👏",
  "🙌",
  "👐",
  "🤲",
  "🤝",
  "🙏",
  "✌️",
  "🤞",
  "❤️",
  "🧡",
  "💛",
  "💚",
  "💙",
  "💜",
  "🖤",
  "💔",
  "❣️",
  "💕",
]

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
  const [isExpanded, setIsExpanded] = useState(!!replyTo)
  const [isFocused, setIsFocused] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const [activePanel, setActivePanel] = useState<string | null>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  // Refs for buttons
  const emojiButtonRef = useRef<HTMLButtonElement>(null)
  const gifButtonRef = useRef<HTMLButtonElement>(null)
  const stickerButtonRef = useRef<HTMLButtonElement>(null)
  const cameraButtonRef = useRef<HTMLButtonElement>(null)
  const attachmentButtonRef = useRef<HTMLButtonElement>(null)

  // Expand form when there's content or when replying to someone
  useEffect(() => {
    if (comment || replyTo) {
      setIsExpanded(true)
    }
  }, [comment, replyTo])

  // Close panel when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
        // Check if click was on any of the buttons
        const clickedOnButton = [
          emojiButtonRef,
          gifButtonRef,
          stickerButtonRef,
          cameraButtonRef,
          attachmentButtonRef,
        ].some((ref) => ref.current && ref.current.contains(event.target as Node))

        if (!clickedOnButton) {
          setActivePanel(null)
        }
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const handleFocus = () => {
    setIsFocused(true)
    setIsExpanded(true)
  }

  const handleBlur = () => {
    setIsFocused(false)
    if (!comment && !replyTo) {
      setIsExpanded(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (name && email && comment.trim()) {
      onSubmit(e)
    }
  }

  const togglePanel = (panel: string) => {
    setActivePanel(activePanel === panel ? null : panel)
  }

  const insertEmoji = (emoji: string) => {
    if (textareaRef.current) {
      const start = textareaRef.current.selectionStart || 0
      const end = textareaRef.current.selectionEnd || 0
      const newComment = comment.substring(0, start) + emoji + comment.substring(end)

      // Create a synthetic event to update the comment
      const syntheticEvent = {
        target: {
          name: "comment",
          value: newComment,
        },
      } as React.ChangeEvent<HTMLTextAreaElement>

      onChange(syntheticEvent)

      // Focus back on textarea and set cursor position after the inserted emoji
      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.focus()
          const newPosition = start + emoji.length
          textareaRef.current.setSelectionRange(newPosition, newPosition)
        }
      }, 0)
    }
  }

  // Get avatar text - use first letter of name or "G" for guest
  const avatarText = name ? name[0] : "G"

  return (
    <div
      className={`comment-form rounded-xl bg-white transition-all ${replyTo ? "border border-gray-200 p-3" : "shadow-sm"}`}
    >
      <form onSubmit={handleSubmit}>
        <div className="flex gap-2">
          {/* Avatar */}
          <div className="mt-1">
            <Avatar className="h-8 w-8 rounded-full border border-gray-200" fallback={avatarText}>
              <span className="text-[#4A306D] font-semibold">{avatarText}</span>
            </Avatar>
          </div>

          {/* Comment input area */}
          <div className="flex-1">
            {/* Main textarea */}
            <div
              className={`relative rounded-2xl bg-gray-100 transition-all ${isFocused ? "ring-2 ring-[#4A306D]/20" : ""}`}
            >
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
                <div className="flex gap-3 relative">
                  <button
                    type="button"
                    ref={emojiButtonRef}
                    onClick={() => togglePanel("emoji")}
                    className={`flex h-7 w-7 items-center justify-center rounded-full transition-colors ${
                      activePanel === "emoji"
                        ? "bg-[#4A306D]/10 text-[#4A306D]"
                        : "text-gray-500 hover:bg-gray-200 hover:text-[#4A306D]"
                    }`}
                    title="Thêm biểu tượng cảm xúc"
                  >
                    <Smile className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    ref={gifButtonRef}
                    onClick={() => togglePanel("gif")}
                    className={`flex h-7 w-7 items-center justify-center rounded-full transition-colors ${
                      activePanel === "gif"
                        ? "bg-[#4A306D]/10 text-[#4A306D]"
                        : "text-gray-500 hover:bg-gray-200 hover:text-[#4A306D]"
                    }`}
                    title="Thêm GIF"
                  >
                    <GiftIcon className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    ref={stickerButtonRef}
                    onClick={() => togglePanel("sticker")}
                    className={`flex h-7 w-7 items-center justify-center rounded-full transition-colors ${
                      activePanel === "sticker"
                        ? "bg-[#4A306D]/10 text-[#4A306D]"
                        : "text-gray-500 hover:bg-gray-200 hover:text-[#4A306D]"
                    }`}
                    title="Thêm sticker"
                  >
                    <Sticker className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    ref={cameraButtonRef}
                    onClick={() => togglePanel("camera")}
                    className={`flex h-7 w-7 items-center justify-center rounded-full transition-colors ${
                      activePanel === "camera"
                        ? "bg-[#4A306D]/10 text-[#4A306D]"
                        : "text-gray-500 hover:bg-gray-200 hover:text-[#4A306D]"
                    }`}
                    title="Thêm hình ảnh"
                  >
                    <Camera className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    ref={attachmentButtonRef}
                    onClick={() => togglePanel("attachment")}
                    className={`flex h-7 w-7 items-center justify-center rounded-full transition-colors ${
                      activePanel === "attachment"
                        ? "bg-[#4A306D]/10 text-[#4A306D]"
                        : "text-gray-500 hover:bg-gray-200 hover:text-[#4A306D]"
                    }`}
                    title="Đính kèm tệp"
                  >
                    <Paperclip className="h-4 w-4" />
                  </button>

                  {/* Emoji Panel */}
                  {activePanel === "emoji" && (
                    <div
                      ref={panelRef}
                      className="absolute bottom-10 left-0 z-10 w-64 rounded-lg border border-gray-200 bg-white p-2 shadow-lg"
                    >
                      <div className="flex items-center justify-between border-b border-gray-100 pb-2 mb-2">
                        <h3 className="text-sm font-medium text-gray-700">Biểu tượng cảm xúc</h3>
                        <button
                          type="button"
                          onClick={() => setActivePanel(null)}
                          className="rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                      <div className="grid grid-cols-8 gap-1">
                        {popularEmojis.map((emoji, index) => (
                          <button
                            key={index}
                            type="button"
                            onClick={() => insertEmoji(emoji)}
                            className="flex h-8 w-8 items-center justify-center rounded hover:bg-gray-100"
                          >
                            <span className="text-lg">{emoji}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Sticker Panel */}
                  {activePanel === "sticker" && (
                    <div
                      ref={panelRef}
                      className="absolute bottom-10 left-0 z-10 w-64 rounded-lg border border-gray-200 bg-white p-2 shadow-lg"
                    >
                      <div className="flex items-center justify-between border-b border-gray-100 pb-2 mb-2">
                        <h3 className="text-sm font-medium text-gray-700">Sticker</h3>
                        <button
                          type="button"
                          onClick={() => setActivePanel(null)}
                          className="rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                      <div className="grid grid-cols-4 gap-2">
                        {/* Placeholder stickers */}
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                          <button
                            key={num}
                            type="button"
                            className="flex h-12 w-12 items-center justify-center rounded bg-gray-100 hover:bg-gray-200"
                          >
                            <Sticker className="h-6 w-6 text-gray-500" />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* GIF Panel */}
                  {activePanel === "gif" && (
                    <div
                      ref={panelRef}
                      className="absolute bottom-10 left-0 z-10 w-64 rounded-lg border border-gray-200 bg-white p-2 shadow-lg"
                    >
                      <div className="flex items-center justify-between border-b border-gray-100 pb-2 mb-2">
                        <h3 className="text-sm font-medium text-gray-700">GIF</h3>
                        <button
                          type="button"
                          onClick={() => setActivePanel(null)}
                          className="rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                      <div className="p-2">
                        <Input type="text" placeholder="Tìm kiếm GIF..." className="mb-2 h-8 text-sm" />
                        <div className="grid grid-cols-2 gap-2">
                          {/* Placeholder GIFs */}
                          {[1, 2, 3, 4].map((num) => (
                            <div key={num} className="h-20 rounded bg-gray-100 flex items-center justify-center">
                              <GiftIcon className="h-8 w-8 text-gray-400" />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Camera Panel */}
                  {activePanel === "camera" && (
                    <div
                      ref={panelRef}
                      className="absolute bottom-10 left-0 z-10 w-64 rounded-lg border border-gray-200 bg-white p-2 shadow-lg"
                    >
                      <div className="flex items-center justify-between border-b border-gray-100 pb-2 mb-2">
                        <h3 className="text-sm font-medium text-gray-700">Thêm hình ảnh</h3>
                        <button
                          type="button"
                          onClick={() => setActivePanel(null)}
                          className="rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                      <div className="p-2 text-center">
                        <div className="mb-3 flex items-center justify-center rounded-lg border-2 border-dashed border-gray-300 p-6">
                          <Camera className="h-8 w-8 text-gray-400" />
                        </div>
                        <Button type="button" variant="outline" size="sm" className="w-full text-xs">
                          Chọn từ thiết bị
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* Attachment Panel */}
                  {activePanel === "attachment" && (
                    <div
                      ref={panelRef}
                      className="absolute bottom-10 left-0 z-10 w-64 rounded-lg border border-gray-200 bg-white p-2 shadow-lg"
                    >
                      <div className="flex items-center justify-between border-b border-gray-100 pb-2 mb-2">
                        <h3 className="text-sm font-medium text-gray-700">Đính kèm tệp</h3>
                        <button
                          type="button"
                          onClick={() => setActivePanel(null)}
                          className="rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                      <div className="p-2 text-center">
                        <div className="mb-3 flex items-center justify-center rounded-lg border-2 border-dashed border-gray-300 p-6">
                          <Paperclip className="h-8 w-8 text-gray-400" />
                        </div>
                        <Button type="button" variant="outline" size="sm" className="w-full text-xs">
                          Chọn tệp đính kèm
                        </Button>
                      </div>
                    </div>
                  )}
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

