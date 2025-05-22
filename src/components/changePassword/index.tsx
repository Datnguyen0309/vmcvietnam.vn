import { useState } from "react";
import { ProfileSideBar } from "../profile/ProfileSideBar";
import { toast } from "react-toastify";
import { handleChangePassword } from "@/utils/fetch-auth-odoo";
import nookies, { setCookie } from "nookies";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { logout } from "@/redux/features/loginSlice";

export const ChangePasswordPage = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [strength, setStrength] = useState(0);
  const cookies = nookies.get();
  const dispatch = useDispatch();
  const router = useRouter();

  const sessionLogId = cookies.session_log_id;
  const evaluateStrength = (newPassword: any) => {
    let score = 0;
    if (newPassword.length >= 8) score++;
    if (/[A-Z]/.test(newPassword)) score++;
    if (/[a-z]/.test(newPassword)) score++;
    if (/\d/.test(newPassword)) score++;
    if (/[^A-Za-z0-9]/.test(newPassword)) score++;
    setStrength(score);
  };

  const handlePasswordChange = (e: any) => {
    const newPassword = e.target.value;
    setNewPassword(newPassword);
    evaluateStrength(newPassword);
  };

  const handleCheckPassword = async () => {
    if (newPassword !== confirmPassword) {
      // toast({
      //   title: "Mật khẩu mới và xác nhận không khớp",
      //   description: ``,
      //   status: "error",
      //   duration: 3000,
      //   isClosable: true,
      // });
      toast.error("Mật khẩu mới và xác nhận không khớp");
      return;
    }

    const result = await handleChangePassword({
      session_log_id: sessionLogId,
      old_password: oldPassword,
      new_password: newPassword,
    });
    if (result.error) {
      // toast({
      //   title: result.error,
      //   description: ``,
      //   status: "error",
      //   duration: 3000,
      //   isClosable: true,
      // });
      toast.error(result.error);
    } else {
      // toast({
      //   title: "Đổi mật khẩu thành công",
      //   description: `Mời bạn đăng nhập lại`,
      //   status: "success",
      //   duration: 3000,
      //   isClosable: true,
      // });
      toast.success("Đổi mật khẩu thành công");
      dispatch(logout());
      setCookie(null, "session_log_id", "", {
        maxAge: -1,
        path: "/",
      });
      router.push("/");
    }
  };

  return (
    <>
      <div className="bg-[#fafafa] lg:py-20">
        <div className="mx-auto max-w-[1320px] py-8">
          <div className="flex flex-col xl:flex-row gap-8">
            <ProfileSideBar />
            <div className="flex-grow mx-[10px] xl:mx-0">
              <div className="bg-white rounded-lg border border-[#e9ecef] p-6">
                <h2 className="text-2xl font-semibold mb-2">Đổi mật khẩu</h2>
                <p className="text-sm text-gray-500 mb-6">
                  Chỉnh sửa cài đặt tài khoản của bạn và thay đổi mật khẩu của bạn ở đây.
                </p>
                <div className="grid grid-cols-1 xl:grid-cols-2">
                  <div className="grid gap-6">
                    {/* Current Password */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Mật khẩu cũ
                      </label>
                      <input
                        type="password"
                        name="previous_password"
                        className="form-control w-full p-3 border border-gray-300 rounded-lg"
                        onChange={(e) => setOldPassword(e.target.value)}
                      />
                    </div>

                    {/* New Password */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Mật khẩu mới
                      </label>
                      <input
                        type="password"
                        name="new_password"
                        value={newPassword}
                        onChange={handlePasswordChange}
                        className="form-control w-full p-3 border border-gray-300 rounded-lg"
                      />
                      <div className="flex items-center mt-2">
                        <div className="flex gap-1">
                          {[...Array(5)].map((_, i) => (
                            <span
                              key={i}
                              className={`block w-10 h-2 rounded-full ${
                                i < strength ? "bg-green-500" : "bg-gray-300"
                              }`}
                            ></span>
                          ))}
                        </div>
                        <span className="ml-2 text-sm text-gray-500">
                          {strength === 0
                            ? "Rất yếu"
                            : strength === 1
                            ? "Yếu"
                            : strength === 2
                            ? "Trung bình"
                            : strength === 3
                            ? "Khá"
                            : "Mạnh"}
                        </span>
                      </div>
                    </div>

                    {/* Confirm Password */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Nhập lại mật khẩu mới
                      </label>
                      <input
                        type="password"
                        name="confirm_new_password"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="form-control w-full p-3 border border-gray-300 rounded-lg"
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      onClick={handleCheckPassword}
                      className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors  w-[180px]"
                    >
                      Đặt lại mật khẩu
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
