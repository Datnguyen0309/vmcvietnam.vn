import { useState } from "react";
import ForgotPasswordModal from "./ForgotPasswordModal";

export default function AuthModal({ isOpen, onClose, type, onLoginSuccess }:any) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [modalType, setModalType] = useState(type);
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    setError("");
    try {
      if (!process.env.NEXT_PUBLIC_USE_REAL_API) {
        setTimeout(() => {
          localStorage.setItem("token", "fake-token");
          onLoginSuccess();
          onClose();
          setLoading(false);
        }, 1000);
        return;
      }

      const response = await fetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: { "Content-Type": "application/json" },
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("token", data.token);
        onLoginSuccess();
        onClose();
      } else {
        setError(data.message || "Đăng nhập thất bại!");
      }
    } catch (err) {
      setError("Lỗi kết nối đến máy chủ!");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {!isForgotPasswordOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg">
            <div className="flex justify-between items-center px-4 py-3">
              <h2 className="text-lg font-semibold flex-1 text-center">
                {modalType === "login" ? "Đăng nhập" : "Đăng ký"}
              </h2>
              <button className="text-red-500 font-bold" onClick={onClose}>
                ✕
              </button>
            </div>

            {modalType === "register" && (
              <div className="flex flex-col gap-1">
                <label className="block text-sm font-medium">
                  Tên người dùng <span className="text-red-500">*</span>
                </label>
                <input
                  name="username"
                  placeholder="Nhập tên người dùng"
                  className="w-full p-2 border rounded mb-2"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
            )}

            <label className="block text-sm font-medium">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              placeholder="Nhập email"
              className="w-full p-2 border rounded mb-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label className="block text-sm font-medium">
              Mật khẩu <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              placeholder="Nhập mật khẩu"
              className="w-full p-2 border rounded mb-2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <div
              className="text-right text-blue-500 text-sm cursor-pointer mb-4"
              onClick={() => setIsForgotPasswordOpen(true)}
            >
              Quên mật khẩu?
            </div>

            {error && <p className="text-red-500 mb-2">{error}</p>}
            <button
              onClick={handleLogin}
              disabled={loading}
              className="bg-blue-500 text-white w-full py-2 rounded disabled:opacity-50"
            >
              {loading ? "Đang xử lý..." : modalType === "login" ? "Đăng nhập" : "Đăng ký"}
            </button>

            <p className="text-sm text-center mt-4">
              {modalType === "login" ? (
                <>
                  Chưa có tài khoản? <span className="text-blue-500 cursor-pointer" onClick={() => setModalType("register")}>Đăng ký ngay</span>
                </>
              ) : (
                <>
                  Đã có tài khoản? <span className="text-blue-500 cursor-pointer" onClick={() => setModalType("login")}>Đăng nhập</span>
                </>
              )}
            </p>
          </div>
        </div>
      )}

      {/* Forgot Password Modal */}
      {isForgotPasswordOpen && (
        <ForgotPasswordModal
          isOpen={isForgotPasswordOpen}
          onClose={() => setIsForgotPasswordOpen(false)}
        />
      )}
    </>
  );
}
