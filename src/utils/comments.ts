export interface CommentData {
  id: number;
  author: string;
  date: string;
  content: string;
  replies?: CommentData[];
}

export const buildCommentTree = (comments: any[]): CommentData[] => {
  const commentMap: Record<number, CommentData> = {};
  const rootComments: CommentData[] = [];

  // Chuyển đổi mỗi comment thành object theo cấu trúc mong muốn
  comments.forEach((comment) => {
    commentMap[comment.id] = {
      id: comment.id,
      author: comment.author_name,
      date: comment.date,
      content: comment.content.rendered,
      replies: [],
    };
  });

  // Xây dựng cây comment
  comments.forEach((comment) => {
    if (comment.parent === 0) {
      // Comment gốc
      rootComments.push(commentMap[comment.id]);
    } else {
      // Comment con, thêm vào replies của comment cha nếu tồn tại
      const parentComment = commentMap[comment.parent];
      if (parentComment) {
        parentComment.replies?.push(commentMap[comment.id]);
      }
    }
  });

  return rootComments;
};
