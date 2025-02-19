import { useEffect } from "react";
import { useRouter } from "next/router";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const XacNhanTaiKhoan = () => {
  const router = useRouter();

  useEffect(() => {
    const { email, password } = router.query;

    const activateAccount = async () => {
      if (email && password) {
        try {
          const response = await fetch("/api/user/active_account", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
          });

          const data = await response.json();
          if (data.error) {
            toast.error(`Kích hoạt thất bại: ${data.error}`);
          } else {
            toast.success("Tài khoản của bạn đã được kích hoạt!");
            setTimeout(() => router.push("/"), 2000); // Chờ 2s rồi redirect về home
          }
        } catch (error) {
          console.error("Error during account activation:", error);
          toast.error("Có lỗi xảy ra, vui lòng thử lại sau.");
        }
      } else {
        toast.error("Thiếu thông tin cần thiết.");
        setTimeout(() => router.push("/"), 2000);
      }
    };

    activateAccount();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query]);

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="p-6 rounded-lg shadow-lg bg-gradient-to-r from-teal-500 to-green-500 text-white text-center max-w-md">
          <h1 className="text-2xl font-bold mb-4">Xác Nhận Tài Khoản</h1>
          <p className="text-lg mb-4">Đang kích hoạt tài khoản của bạn...</p>
          <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto"></div>
        </div>
      </div>
    </>
  );
};

export default XacNhanTaiKhoan;
