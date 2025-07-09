"use client";

import { useState } from "react";
import { ProfileSideBar } from "../profile/ProfileSideBar";
import { toast } from "react-toastify";
import { handleChangePassword } from "@/utils/fetch-auth-odoo";
import nookies, { setCookie } from "nookies";
import { useDispatch } from "react-redux";
import { logout } from "@/redux/features/loginSlice";

export const ChangePasswordPage = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [strength, setStrength] = useState(0);
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const cookies = nookies.get();
  const dispatch = useDispatch();
  const sessionLogId = cookies.session_log_id;

  const evaluateStrength = (value: string) => {
    let score = 0;
    if (value.length >= 8) score++;
    if (/[A-Z]/.test(value)) score++;
    if (/[a-z]/.test(value)) score++;
    if (/\d/.test(value)) score++;
    if (/[^A-Za-z0-9]/.test(value)) score++;
    setStrength(score);
  };

  const handlePasswordChange = (e: any) => {
    const value = e.target.value;
    setNewPassword(value);
    evaluateStrength(value);
  };

  const handleCheckPassword = async () => {
    if (newPassword.length < 6) {
      toast.error("Mật khẩu mới phải có ít nhất 6 ký tự");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Mật khẩu mới và xác nhận không khớp");
      return;
    }

    const result = await handleChangePassword({
      session_log_id: sessionLogId,
      old_password: oldPassword,
      new_password: newPassword,
    });

    if (result.error) {
      toast.error(result.error);
    } else {
      toast.success("Đổi mật khẩu thành công. Vui lòng đăng nhập lại");

      localStorage.clear();
      setCookie(null, "session_log_id", "", { maxAge: -1, path: "/" });
      await dispatch(logout());

      window.location.href = "/"; // ✅ Force full reload và đăng xuất
    }
  };

  return (
    <div className="bg-[#fafafa] lg:py-20">
      <div className="mx-auto max-w-[1320px] py-8">
        <div className="flex flex-col xl:flex-row gap-8">
          <ProfileSideBar />
          <div className="flex-grow mx-[10px] xl:mx-0">
            <div className="bg-white rounded-lg border border-[#e9ecef] p-6">
              <h2 className="text-2xl font-semibold mb-2">Đổi mật khẩu</h2>
              <p className="text-sm text-gray-500 mb-6">
                Chỉnh sửa cài đặt tài khoản của bạn và thay đổi mật khẩu tại đây.
              </p>
              <div className="grid grid-cols-1 xl:grid-cols-2">
                <div className="grid gap-6">
                  {/* Mật khẩu cũ */}
                  <div className="relative">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Mật khẩu cũ
                    </label>
                    <input
                      type={showOld ? "text" : "password"}
                      onChange={(e) => setOldPassword(e.target.value)}
                      className="form-control w-full p-3 border border-gray-300 rounded-lg pr-10"
                    />
                    <span
                      onClick={() => setShowOld(!showOld)}
                      className="absolute right-3 top-[38px] cursor-pointer text-gray-500"
                    >
                      {showOld ? "👁️" : "🙈"}
                    </span>
                  </div>

                  {/* Mật khẩu mới */}
                  <div className="relative">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Mật khẩu mới
                    </label>
                    <input
                      type={showNew ? "text" : "password"}
                      value={newPassword}
                      onChange={handlePasswordChange}
                      className="form-control w-full p-3 border border-gray-300 rounded-lg pr-10"
                    />
                    <span
                      onClick={() => setShowNew(!showNew)}
                      className="absolute right-3 top-[38px] cursor-pointer text-gray-500"
                    >
                      {showNew ? "👁️" : "🙈"}
                    </span>
                    <div className="flex items-center mt-2">
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <span
                            key={i}
                            className={`block w-10 h-2 rounded-full ${i < strength ? "bg-green-500" : "bg-gray-300"}`}
                          ></span>
                        ))}
                      </div>
                      <span className="ml-2 text-sm text-gray-500">
                        {["Rất yếu", "Yếu", "Trung bình", "Khá", "Mạnh"][strength]}
                      </span>
                    </div>
                  </div>

                  {/* Nhập lại mật khẩu */}
                  <div className="relative">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nhập lại mật khẩu mới
                    </label>
                    <input
                      type={showConfirm ? "text" : "password"}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="form-control w-full p-3 border border-gray-300 rounded-lg pr-10"
                    />
                    <span
                      onClick={() => setShowConfirm(!showConfirm)}
                      className="absolute right-3 top-[38px] cursor-pointer text-gray-500"
                    >
                      {showConfirm ? "👁️" : "🙈"}
                    </span>
                  </div>

                  {/* Submit */}
                  <button
                    onClick={handleCheckPassword}
                    className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors w-[180px]"
                  >
                    Đặt lại mật khẩu
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
