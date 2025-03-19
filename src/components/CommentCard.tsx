import { FaReply } from "react-icons/fa6";
import { CommentForm, CommentFormProps } from "./CommentForm";
import { Avatar } from "./Avatar";
import { formatDate } from "@/utils/date";
import { clean } from "./lib/sanitizeHtml";

export interface CommentData {
  id: number;
  author: string;
  date: string;
  content: string;
  replies?: CommentData[];
}

export const CommentComponent: React.FC<{
  comment: CommentData;
  onReply: ({ parentId, commentsId }: { parentId: number | undefined; commentsId: number }) => void;
  parentId: number | undefined;
  commentFormProps: CommentFormProps;
}> = ({ comment, onReply, parentId, commentFormProps }) => {
  return (
    <div className="comment-container">
      <div className="rounded-lg border bg-white p-6">
        <div className="flex items-start gap-4">
          <Avatar className="h-12 w-12" fallback={comment.author[0]}>
            <span className="text-[#999] font-semibold">{comment.author[0]}</span>
          </Avatar>
          <div className="flex-1 space-y-2">
            <div>
              <a href="#" className="font-semibold text-Dark-Blue hover:underline">
                {comment.author}
              </a>
              <div className="text-sm text-[#666]">{formatDate(comment.date)}</div>
            </div>
            <p
              className="text-[#666]"
              dangerouslySetInnerHTML={{
                __html: clean(comment.content || `<p>Đây là bình luận</p>`),
              }}
            />
            <button
              onClick={() => onReply({ parentId: parentId, commentsId: comment.id })}
              className="flex justify-center items-center gap-2 mt-2 rounded bg-[#f0f0f1] px-4 py-1 text-sm text-[#666] hover:bg-[#e0e0e1]"
            >
              <FaReply className="text-[12px] " />
              Trả lời
            </button>
            {parentId && parentId == comment.id && <CommentForm {...commentFormProps} />}
          </div>
        </div>
      </div>
      {comment.replies && (
        <div className="ml-16 mt-6 space-y-6">
          {comment.replies.map((reply: any, index: number) => (
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
  );
};
