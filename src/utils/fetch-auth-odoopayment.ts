const token_next = process.env.NEXT_PUBLIC_TOKEN_NEXT_PAYMENT || "";
export const fetchAuthOdooPayment = ({
  api_url,
  method = "POST",
  form_data,
}: {
  api_url: string;
  method?: "GET" | "POST" | "PUT" | "DELETE";
  form_data?: any;
}) =>
  fetch(api_url, {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token_next}`,
    },
    ...(form_data &&
      (method === "POST" || method === "PUT") && {
        body: JSON.stringify(form_data),
      }),
  });