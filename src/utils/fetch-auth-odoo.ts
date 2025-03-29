import CryptoJS from "crypto-js";

const token_next = process.env.NEXT_PUBLIC_TOKEN_NEXT || "";
export const fetchAuthOdoo = ({
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

export const fetchAuthOdooPersonalToken = ({
  api_url,
  method = "POST",
  form_data,
  personal_token,
}: {
  api_url: string;
  method?: "GET" | "POST" | "PUT" | "DELETE";
  form_data?: any;
  personal_token: string;
}) =>
  fetch(api_url, {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${personal_token}`,
    },
    ...(form_data &&
      (method === "POST" || method === "PUT") && {
        body: JSON.stringify(form_data),
      }),
  });

export const getSingleModel = async ({
  slug,
  root,
  type,
}: {
  slug: string;
  root: string;
  type: string;
}) => {
  try {
    const res = await fetchAuthOdoo({
      api_url: `/api/general/single-model/?slug=${slug}&root=${root}&type=${type}`,
      method: "POST",
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
  perpage = "99",
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
      method: "POST",
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
  type,
  sortType = "all",
}: {
  root: string;
  type: string;
  sortType?: string;
}) => {
  try {
    const res = await fetchAuthOdoo({
      api_url: `/api/general/data-setup/?root=${root}&type=${type}&sortType=${sortType}`,
      method: "POST",
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
    return { error: `Failed to get ${root} ${type}` };
  }
};
export const handleRegister = async ({
  name,
  email,
  password,
}: {
  name: string;
  email: string;
  password: string;
}) => {
  try {
    const response: any = await fetch("/api/user/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        email: email,
        password: CryptoJS.SHA256(password).toString(),
      }),
    });

    const data: any = await response.json();
    if (data.error) {
      return { error: data.error };
    } else {
      return data;
    }
  } catch (error) {
    console.error("Lỗi hệ thống:", error);
  }
};

export const handleLogin = async ({ email, password }: { email: string; password: string }) => {
  try {
    const response: any = await fetch("/api/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: CryptoJS.SHA256(password).toString(),
      }),
    });

    const data: any = await response.json();
    if (data.error) {
      return { error: data.error };
    } else {
      return data;
    }
  } catch (error) {
    console.error("Error: ", error);
  }
};

export const handleSendEmail = async ({
  email,
  text,
  html,
}: {
  email: string;
  text?: string;
  html?: string;
}) => {
  try {
    const res = await fetch("/api/send-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: html
        ? JSON.stringify({
            to: email,
            subject: "Xác nhận tạo đơn hàng thành công",
            html: html,
          })
        : JSON.stringify({
            to: email,
            subject: "Xác nhận tài khoản",
            text: text,
          }),
    });

    if (res.ok) {
      alert(`Đã gửi email xác nhận tới ${email}.`);
    } else {
      alert("Failed to send email.");
    }
  } catch (error) {
    console.error("Error: ", error);
  }
};

export const handleUserInfo = async ({ session_log_id }: { session_log_id: string }) => {
  try {
    const response = await fetch("/api/user/get_user_info", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        session_log_id: session_log_id,
      }),
    });

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error: ", error);
    throw error;
  }
};

export const handleUpdateUserInfo = async ({
  session_log_id,
  name,
  email,
  image,
  age,
  phone,
  gender,
  career,
}: {
  session_log_id: string;
  name: string;
  email: string;
  image: string;
  age: number;
  phone: string;
  gender: string;
  career: string;
}) => {
  try {
    const response = await fetch("/api/user/update_user_info", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        session_log_id: session_log_id,
        name: name,
        email: email,
        image: image,
        age: age,
        phone: phone,
        gender: gender,
        career: career,
      }),
    });

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error: ", error);
    throw error; // Optional: throw error to handle in the calling function
  }
};

export const handleChangePassword = async ({
  session_log_id,
  old_password,
  new_password,
}: {
  session_log_id: string;
  old_password: string;
  new_password: string;
}) => {
  try {
    const response = await fetch("/api/user/change_password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        session_log_id: session_log_id,
        old_password: CryptoJS.SHA256(old_password).toString(),
        new_password: CryptoJS.SHA256(new_password).toString(),
      }),
    });

    const data = await response.json();

    return data; // Trả về dữ liệu từ phản hồi
  } catch (error) {
    console.error("Error: ", error);
    throw error; // Tùy chọn: ném lỗi để xử lý trong hàm gọi
  }
};

export const checkEmailExist = async (email: string) => {
  try {
    const response = await fetch("/api/user/check_email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    const result = await response.json();

    return result; // Giả sử API trả về `exists: true` nếu email tồn tại
  } catch (error) {
    console.error("Error checking email existence:", error);
    return false;
  }
};

//------order--------------------------
export const handleCreateOrder = async ({
  partner_name = "public",
  partner_email = "09999999999",
  partner_phone = "public@gmail.com",
  items,
}: {
  partner_name?: string;
  partner_email?: string;
  partner_phone?: string;
  items: { product_id: number; quantity: number; price_unit: number }[];
}) => {
  try {
    const response = await fetch("/api/order/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        partner_name,
        partner_email,
        partner_phone,
        items,
      }),
    });

    const data = await response.json();
    if (data.success) {
      return data;
    } else {
      return { error: data.message };
    }
  } catch (error) {
    console.error("Error: ", error);
    return { error: "Lỗi kết nối API" };
  }
};

export const fetchOrderDetails = async (order_id: number) => {
  try {
    const response = await fetch(`/api/order/details?order_id=${order_id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    if (!data.success) {
      return { error: data.message };
    }

    return data;
  } catch (error) {
    console.error("Lỗi khi lấy thông tin đơn hàng:", error);
    return { error: "Lỗi hệ thống" };
  }
};

export const fetchPromotions = async (order_id: number) => {
  try {
    const response = await fetch(`/api/order/promotions?order_id=${order_id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    if (!data.success) {
      return { error: data.message };
    }

    return data;
  } catch (error) {
    console.error("Lỗi khi lấy danh sách khuyến mãi:", error);
    return { error: "Lỗi hệ thống" };
  }
};

export const fetchApplyPromotion = async (order_id: number, promotion_id: number) => {
  try {
    const response = await fetch("/api/order/apply_promotion", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ order_id, promotion_id }),
    });

    const data = await response.json();
    if (!data.success) {
      return { error: data.message };
    }

    return data;
  } catch (error) {
    console.error("Lỗi khi áp dụng khuyến mãi:", error);
    return { error: "Lỗi hệ thống" };
  }
};

export const fetchApplyPromoCode = async (order_id: number, promo_code: string) => {
  try {
    const response = await fetch("/api/order/apply_promo_code", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ order_id, promo_code }),
    });

    const data = await response.json();
    if (!data.success) {
      return { error: data.message };
    }

    return data;
  } catch (error) {
    console.error("Lỗi khi áp dụng mã khuyến mãi:", error);
    return { error: "Lỗi hệ thống" };
  }
};

export interface OrderItem {
  product_id: number;
  quantity: number;
  price_unit: number;
  is_reward_line?: boolean;
}
export const fetchUpdateOrder = async (
  order_id: number,
  partner_name: string,
  partner_email: string,
  partner_phone?: string,
  items?: { product_id: number; quantity: number; price_unit: number }[]
) => {
  try {
    const response = await fetch("/api/order/update", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        order_id,
        partner_name,
        partner_email,
        ...(partner_phone && { partner_phone }),
        ...(items && { items }),
      }),
    });

    const data = await response.json();
    if (!data.success) {
      return { error: data.message };
    }

    return data;
  } catch (error) {
    console.error("Lỗi khi cập nhật đơn hàng:", error);
    return { success: false, message: "Lỗi hệ thống", error: "Lỗi hệ thống" };
  }
};

export const fetchConfirmPayment = async (order_id: number) => {
  try {
    const response = await fetch("/api/order/confirm_payment", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ order_id }),
    });

    const data = await response.json();
    if (!data.success) {
      return { error: data.message };
    }
    return data;
  } catch (error) {
    console.error("Lỗi khi xác nhận thanh toán:", error);
    return { success: false, message: "Lỗi hệ thống", error: "Lỗi hệ thống" };
  }
};

export const fetchUpdateOrderStatus = async (order_id: number) => {
  try {
    const response = await fetch("/api/order/update_status", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ order_id: order_id }),
    });

    const data = await response.json();
    if (!data.success) {
      return { error: data.message };
    }

    return data;
  } catch (error) {
    console.error("Lỗi khi cập nhật trạng thái đơn hàng:", error);
    return { success: false, message: "Lỗi hệ thống", error: "Lỗi hệ thống" };
  }
};

export const getUserOrders = async ({ session_log_id }: { session_log_id: string }) => {
  try {
    const response = await fetch("/api/order/user_orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        session_log_id: session_log_id,
      }),
    });
    const data = await response.json();

    if (!data.success) {
      console.error("Lỗi lấy danh sách đơn hàng:", data.message);
      return data.message;
    }

    return data;
  } catch (error) {
    console.error("Lỗi hệ thống:", error);
    return { success: false, message: "Lỗi hệ thống", error: "Lỗi hệ thống" };
  }
};
