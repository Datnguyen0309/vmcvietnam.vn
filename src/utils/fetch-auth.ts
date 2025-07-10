const token_next = process.env.NEXT_PUBLIC_TOKEN_NEXT || "";
export const fetchAuth = ({
  api_url,
  method,
  form_data,
}: {
  api_url: string;
  method?: "GET" | "POST" | "PUT" | "DELETE";
  form_data?: any;
}) =>
  fetch(api_url, {
    method: method || "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: token_next,
    },
    body: form_data ? JSON.stringify(form_data) : null,
  });

export const getPosts = async ({
  page,
  perpage,
  type,
}: {
  type?: "news" | "notifis";
  page?: string | number;
  perpage: string | number;
}) => {
  const res = await fetchAuth({
    api_url: `/api/posts/?type=${type}&page=${page}&perpage=${perpage}`,
  });

  const data = await res.json();

  return data;
};

export const getSearchPosts = async ({
  page,
  perpage,
  type,
  searchtext,
}: {
  type?: "news" | "notifis";
  page?: string | number;
  perpage: string | number;
  searchtext: string;
}) => {
  const res = await fetchAuth({
    api_url: `/api/search/?type=${type}&page=${page}&perpage=${perpage}&searchtext=${searchtext}`,
  });

  const data = await res.json();

  return data;
};

export const postComment = async ({
  postId,
  parentId,
  authorName,
  authorEmail,
  content,
}: {
  postId: number;
  parentId?: number;
  authorName: string;
  authorEmail: string;
  content: string;
}) => {
  try {
    const apiUrl = "http://10.10.51.16:8686//wp-json/wp/v2";
    const bodyData: Record<string, any> = {
      post: postId,
      author_name: authorName,
      author_email: authorEmail,
      content: content,
      ...(parentId !== undefined ? { parent: parentId } : {}),
    };

    const response = await fetch(`${apiUrl}/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodyData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Lỗi khi đăng bình luận");
    }

    return await response.json();
  } catch (error) {
    console.error("Lỗi khi gửi bình luận:", error);
    throw error;
  }
};

export const fetchComments = async ({ postId }: { postId: number }) => {
  try {
    const apiUrl = "http://10.10.51.16:8686//wp-json/wp/v2";
    const response = await fetch(`${apiUrl}/comments?post=${postId}`);

    if (!response.ok) {
      throw new Error("Lỗi khi lấy danh sách bình luận");
    }

    return await response.json(); // Trả về danh sách bình luận
  } catch (error) {
    console.error("Lỗi khi gọi API bình luận:", error);
    return [];
  }
};
