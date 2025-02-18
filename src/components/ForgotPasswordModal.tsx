import { useState } from "react";

interface ForgotPasswordModalProps {
    isOpen: boolean;
    onClose: () => void;
  }
  
  const ForgotPasswordModal = ({ isOpen, onClose }: ForgotPasswordModalProps) => {
    const [email, setEmail] = useState("");
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
          <div className="flex justify-between items-center border-b px-4 py-2">
            <h2 className="text-lg font-semibold text-center w-full">Quên mật khẩu</h2>
            <button className=" text-Blush-Pink font-bold" onClick={onClose}>
              ✕
            </button>
          </div>
  
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
  
          <div className="flex justify-center px-6 py-4">
            <button
              onClick={() => alert("Lấy lại mật khẩu!")}
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
  