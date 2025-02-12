const token_next = process.env.NEXT_PUBLIC_TOKEN_NEXT || "";
export const fetchAuthOdoo = ({
  api_url,
  method = "POST",
  form_data
}: {
  api_url: string;
  method?: "GET" | "POST" | "PUT" | "DELETE";
  form_data?: any;
}) =>
  fetch(api_url, {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token_next}`
    },
    ...(form_data &&
      (method === "POST" || method === "PUT") && {
        body: JSON.stringify(form_data)
      })
  });

export const getSingleModel = async ({
  slug,
  root,
  type
}: {
  slug: string;
  root: string;
  type: string;
}) => {
  try {
    const res = await fetchAuthOdoo({
      api_url: `/api/general/single-model/?slug=${slug}&root=${root}&type=${type}`,
      method: "POST"
    });
    const data = await res.json();

    return data;
  } catch (error) {
    console.log(error);
    return { error: `Failed to get ${root} ${type}` };
  }
};

export const getListModel = async ({
  root,
  type,
  teacher = "all",
  categories = "all",
  page = "1",
  perpage = "99"
}: {
  root: string;
  type: string;
  teacher?: string;
  categories?: string;
  page?: string;
  perpage?: string;
}) => {
  try {
    const res = await fetchAuthOdoo({
      api_url: `/api/general/list-model/?root=${root}&type=${type}&teacher=${teacher}&categories=${categories}&page=${page}&perpage=${perpage}`,
      method: "POST"
    });
    const data = await res.json();

    return data;
  } catch (error) {
    console.log(error);
    return { error: `Failed to get ${root} ${type}` };
  }
};

export const getDataSetUp = async ({
  root,
  type
}: {
  root: string;
  type: string;
}) => {
  try {
    const res = await fetchAuthOdoo({
      api_url: `/api/general/data-setup/?root=${root}&type=${type}`,
      method: "POST"
    });
    const data = await res.json();

    return data;
  } catch (error) {
    console.log(error);
    return { error: `Failed to get ${root} ${type}` };
  }
};
