import { checkEmailExist, handleSendEmail } from "@/utils/fetch-auth-odoo";
import { useState } from "react";
import { toast } from "react-toastify";
import CryptoJS from "crypto-js";
import { generateRandomPassword } from "@/utils/genPass";

interface ForgotPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ForgotPasswordModal = ({ isOpen, onClose }: ForgotPasswordModalProps) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false); // State để quản lý trạng thái tải

  // Hàm xử lý khi nhấn vào nút "Lấy lại mật khẩu"
  const handleForgotPassword = async () => {
    if (!email) {
      toast.error("Vui lòng nhập email của bạn");
      return;
    }

    setLoading(true);
    // Gọi hàm kiểm tra email tồn tại
    const emailExists = await checkEmailExist(email);
    if (!emailExists.data.exists) {
      toast.error("Email bạn nhập không có trong hệ thống");
      setLoading(false);
    } else {
      const password = generateRandomPassword();
      handleSendEmail({
        email: email,
        text: `Xin chào,  ${email} ! Đây là email xác nhận cấp lại mật khẩu của bạn.
          Mật khẩu mới của bạn là : ${password}
          Hãy click vào link này để kích hoạt tài khoản của bạn:  http://10.10.51.16:3333/cap-lai-mat-khau?em=${email}&mk=${CryptoJS.SHA256(
          password
        ).toString()}`,
      });
      toast.success("Vui lòng kiểm tra email để lấy lại mật khẩu");
      setLoading(false);
      onClose(); // Đóng modal sau khi thành công
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
        {/* Header */}
        <div className="flex justify-between items-center border-b px-4 py-2">
          <h2 className="text-lg font-semibold text-center w-full">Quên mật khẩu</h2>
          <button className=" text-Blush-Pink font-bold" onClick={onClose}>
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            type="email"
            placeholder="Nhập email của bạn"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>

        {/* Footer */}
        <div className="flex justify-center px-6 py-4">
          <button
            onClick={handleForgotPassword}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300"
          >
            Lấy lại mật khẩu
          </button>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordModal;
