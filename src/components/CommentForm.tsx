import React from "react";

export interface CommentFormProps {
  isReview?: boolean;
  replyTo?: string;
  name: string;
  email: string;
  comment: string;
  rememberMe: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onRememberMeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
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
    <div className="xl:mx-0 mx-[10px] rounded-lg border bg-white p-6 mt-10">
      <h2 className="mb-6 text-[22px] font-bold text-Dark-Blue">
        {replyTo
          ? `Phản hồi bình luận - ${replyTo}`
          : isReview
          ? "Đánh giá của bạn"
          : "Để lại bình luận"}
      </h2>
      <form className="space-y-5" onSubmit={onSubmit}>
        <div className="space-y-2">
          <label className="block text-[#646970]">
            {isReview ? "Đánh giá của bạn" : "Bình luận của bạn"}
            <span className="ml-1 text-red-500">*</span>
          </label>
          <textarea
            name="comment"
            value={comment}
            onChange={onChange}
            required
            className="min-h-[120px] w-full rounded border border-[#8c8f94] p-3 text-[#646970] focus:border-[#2271b1] focus:outline-none"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-[#646970]">
            Tên<span className="ml-1 text-red-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={onChange}
            required
            className="w-full rounded border border-[#8c8f94] p-2 text-[#646970] focus:border-[#2271b1] focus:outline-none"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-[#646970]">
            Email<span className="ml-1 text-red-500">*</span>
          </label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={onChange}
            required
            className="w-full rounded border border-[#8c8f94] p-2 text-[#646970] focus:border-[#2271b1] focus:outline-none"
          />
        </div>

        <div className="flex items-start gap-2">
          <input
            type="checkbox"
            id="save-info"
            checked={rememberMe}
            onChange={onRememberMeChange}
            className="mt-1 h-4 w-4 rounded border-gray-300"
          />
          <label htmlFor="save-info" className="text-sm text-[#646970]">
            Lưu tên, email của tôi trong trình duyệt này cho lần tiếp theo tôi bình luận.
          </label>
        </div>

        <button
          type="submit"
          className="rounded bg-[#ff4b6c] px-6 py-2.5 text-white hover:bg-[#ff3459] transition-colors"
        >
          {isReview ? "Đăng đánh giá" : "Đăng bình luận"}
        </button>
      </form>
    </div>
  );
};
