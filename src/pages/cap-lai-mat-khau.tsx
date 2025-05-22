import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCookie } from "nookies";
import { toast } from "react-toastify";
import { logout } from "@/redux/features/loginSlice";

const ReissuePasswordPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  // Hàm handler call đến API đổi mật khẩu
  const handlerReissuePassword = async (email: string, password: string) => {
    try {
      const response = await fetch("/api/user/reissue_password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email, new_password: password }),
      });

      const data = await response.json();
      if (response.ok) {
        toast.success("Cập nhật mật khẩu thành công");
        dispatch(logout());
        setCookie(null, "session_log_id", "", {
          maxAge: -1,
          path: "/",
        });
        router.push("/"); 
      } else {
    
        toast.error(data.error || "Đã có lỗi xảy ra, vui lòng thử lại.");
      }
    } catch (error) {
 
      toast.error("Không thể cập nhật mật khẩu. Vui lòng thử lại sau.");
    }
  };

  useEffect(() => {
    const { em, mk } = router.query;
    if (em && mk) {
      // Gọi hàm handler để cập nhật mật khẩu
      handlerReissuePassword(em as string, mk as string);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query]);

  return <div>Đang xử lý yêu cầu của bạn...</div>;
};

export default ReissuePasswordPage;
