import { useEffect, useState } from "react";
import { setCookie } from "nookies";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { handleLogin, handleRegister, handleSendEmail } from "@/utils/fetch-auth-odoo";
import CryptoJS from "crypto-js";
import { LoginState, setLoginStatus } from "@/redux/features/loginSlice";

interface AuthModalProps {
  openForgot: () => void;
  isOpen: boolean;
  onClose: () => void;
  isLogin: boolean;
  toggleAuth: () => void;
}

const AuthModal = ({ openForgot, isOpen, onClose, isLogin, toggleAuth }: AuthModalProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [userLogin, setUserLogin] = useState<LoginState>();
  const router = useRouter();
  const dispatch = useDispatch();

  const [errors, setErrors] = useState({
    email: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "email") {
      setEmail(value);
      const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      setErrors({
        ...errors,
        email: emailPattern.test(value) ? "" : "Email không hợp lệ",
      });
    }
  };

  const handleAuth = async () => {
    if (isLogin) {
      const dataLogin = await handleLogin({
        email: email,
        password: password,
      });
      if (dataLogin.error) {
        console.log(dataLogin)
        toast.error(`Đăng nhập thất bại! = ${dataLogin.error}`);
      } else {
        setCookie(null, "session_log_id", dataLogin.token, {
          maxAge: 7 * 24 * 60 * 60,
          path: "/",
        });
        toast.success("Đăng nhập thành công!");

        onClose();
        router.push("/");
        setUserLogin({
          loginCheck: true,
          user: {
            name: dataLogin.user.name,
            email: dataLogin.user.email,
            image: "",
            career: dataLogin.user.career,
            age: dataLogin.user.age,
            phone: dataLogin.user.phone,
            gender: dataLogin.user.gender,
          },
        });
        userLogin && dispatch(setLoginStatus(userLogin));
        resetFormFields();
        router.push("/");
      }
    } else {
      if (!username || !email || !password) {

        toast.error("Vui lòng điền đầy đủ thông tin!");

        return;
      } else {
        const data = await handleRegister({
          name: username,
          email: email,
          password: password,
        });
        if (data && data.error) {
          toast.error("Đăng ký thất bại!");
        } else {
          handleSendEmail({
            email: email,
            text: `Xin chào,  ${username} ! Đây là email xác nhận tài khoản của bạn.
        Hãy click vào link này để kích hoạt tài khoản của bạn: http://10.10.51.16:8686/xac-nhan-tai-khoan?email=${email}&password=${CryptoJS.SHA256(
              password
            ).toString()}`,
          });
          toast.success("Đăng ký thành công!");
          resetFormFields();
          onClose();
        }
      }
    }
  };

  const resetFormFields = () => {
    setEmail("");
    setPassword("");
    setUsername("");
  };

  useEffect(() => {
    resetFormFields();
  }, [isLogin]);

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
          <div className="flex justify-between items-center border-b px-4 py-3">
            <h2 className="text-lg font-semibold text-center w-full">
              {isLogin ? "Đăng nhập" : "Đăng ký"}
            </h2>
            <button
              className="text-Blush-Pink font-bold"
              onClick={() => {
                resetFormFields();
                onClose();
              }}
            >
              ✕
            </button>
          </div>

          {/* Body */}
          <div className="px-6 py-4">
            {!isLogin && (
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tên người dùng
                </label>
                <input
                  type="text"
                  placeholder="Nhập tên người dùng"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            )}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Nhập email"
                value={email}
                onChange={handleInputChange}
                className={`block w-full px-3 py-2 border ${errors.email ? "border-red-500" : "border-gray-300"
                  } rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Mật khẩu</label>
              <input
                type="password"
                placeholder="Nhập mật khẩu"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>

            {isLogin && (
              <div
                className="text-right mt-2 text-blue-500 cursor-pointer text-sm"
                onClick={() => {
                  openForgot();
                }}
              >
                Quên mật khẩu?
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex justify-center px-6 py-4">
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300"
              onClick={() => {
                handleAuth();
              }}
            >
              {isLogin ? "Đăng nhập" : "Đăng ký"}
            </button>
          </div>
          {isLogin ? (
            <p className="text-center mb-4 text-sm text-gray-700">
              Chưa có tài khoản?{" "}
              <span className="text-blue-500 font-medium cursor-pointer" onClick={toggleAuth}>
                Đăng ký ngay
              </span>
            </p>
          ) : (
            <p className="text-center mb-4 text-sm text-gray-700">
              Đã có tài khoản?{" "}
              <span className="text-blue-500 font-medium cursor-pointer" onClick={toggleAuth}>
                Đăng nhập
              </span>
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default AuthModal;
