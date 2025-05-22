"use client"

import type React from "react"

import { useState } from "react"
import { ThumbsUp, MoreHorizontal } from "lucide-react"
import { formatDate } from "@/utils/date"
import { CommentForm, CommentFormProps } from "./CommentForm"
import { Avatar } from "./Avatar"
import { clean } from "./lib/sanitizeHtml"

export interface CommentData {
  id: number
  author: string
  date: string
  content: string
  likes?: number
  replies?: CommentData[]
}

export const CommentComponent: React.FC<{
  comment: CommentData
  onReply: ({ parentId, commentsId }: { parentId: number | undefined; commentsId: number }) => void
  parentId: number | undefined
  commentFormProps: CommentFormProps
}> = ({ comment, onReply, parentId, commentFormProps }) => {
  const [liked, setLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(comment.likes || 0)

  const handleLike = () => {
    if (liked) {
      setLikeCount((prev) => prev - 1)
    } else {
      setLikeCount((prev) => prev + 1)
    }
    setLiked(!liked)
  }

  return (
    <div className="comment-container mb-3">
      <div className="flex">
        {/* Avatar */}
        <div className="mr-2">
          <Avatar className="h-9 w-9 rounded-full border border-gray-200" fallback={comment.author[0]}>
            <span className="text-[#4A306D] font-semibold">{comment.author[0]}</span>
          </Avatar>
        </div>

        {/* Comment content */}
        <div className="flex-1">
          <div className="relative group">
            {/* Comment bubble */}
            <div className="rounded-2xl bg-gray-100 px-3 py-2">
              <div className="flex items-center">
                <a href="#" className="font-semibold text-[#4A306D] hover:underline">
                  {comment.author}
                </a>
                <button className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
                  <MoreHorizontal className="h-4 w-4 text-gray-500" />
                </button>
              </div>

              <div
                className="mt-0.5 text-sm text-gray-700"
                dangerouslySetInnerHTML={{
                  __html: clean(comment.content || `<p>Đây là bình luận</p>`),
                }}
              />
            </div>

            {/* Actions */}
            <div className="mt-0.5 flex items-center gap-3 px-3 text-xs font-medium">
              <button
                onClick={handleLike}
                className={`${liked ? "text-[#4A306D] font-semibold" : "text-gray-500 hover:text-[#4A306D]"}`}
              >
                Thích
              </button>
              <button
                onClick={() => onReply({ parentId: parentId, commentsId: comment.id })}
                className="text-gray-500 hover:text-[#4A306D]"
              >
                Phản hồi
              </button>
              <span className="text-gray-400">{formatDate(comment.date)}</span>

              {likeCount > 0 && (
                <div className="ml-auto flex items-center gap-1 rounded-full bg-white px-1.5 py-0.5 shadow-sm">
                  <div className="flex h-4 w-4 items-center justify-center rounded-full bg-[#4A306D]">
                    <ThumbsUp className="h-2.5 w-2.5 text-white" />
                  </div>
                  <span className="text-xs text-gray-600">{likeCount}</span>
                </div>
              )}
            </div>
          </div>

          {/* Reply form */}
          {parentId && parentId === comment.id && (
            <div className="mt-2 pl-2">
              <CommentForm {...commentFormProps} />
            </div>
          )}

          {/* Replies */}
          {comment.replies && comment.replies.length > 0 && (
            <div className="mt-2 border-l-2 border-gray-200 pl-4">
              {comment.replies.map((reply: CommentData, index: number) => (
                <CommentComponent
                  key={index}
                  comment={reply}
                  onReply={onReply}
                  parentId={parentId}
                  commentFormProps={{ ...commentFormProps, replyTo: reply.author }}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

