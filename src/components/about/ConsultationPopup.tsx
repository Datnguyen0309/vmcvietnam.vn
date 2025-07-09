"use client";
import { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { toast } from "react-toastify";

export const ConsultationPopup = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    content: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = new URLSearchParams();
    data.append("fullName", formData.fullName);
    data.append("email", formData.email);
    data.append("phone", formData.phone);
    data.append("content", formData.content);
    data.append("time", new Date().toISOString());

    try {
      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbwn9-F3tVpiogm5tnl9ACdNmncMAS6o3Xr0tZ-AzCH0cY7O2lDn60oTH4EkY_dFuH9vpw/exec",
        {
          method: "POST",
          body: data,
        }
      );

      const result = await response.text();
      console.log("Gửi thành công:", result);

      toast.success("✅ Đăng ký thành công! Chúng tôi sẽ liên hệ bạn sớm.");

      setFormData({
        fullName: "",
        email: "",
        phone: "",
        content: "",
      });

      onClose();
      setTimeout(() => location.reload(), 2000);
    } catch (error) {
      console.error("Lỗi khi gửi:", error);
      toast.error("❌ Gửi thất bại! Vui lòng thử lại.");
    }
  };



  const [pageContent, setPageContent] = useState<any>(null);

  useEffect(() => {
    const getPageContent = async () => {
      try {
        const res = await fetch(`/api/content-page/?type=form`, {
          next: { revalidate: 3 }
        });
        const data = await res.json();
        setPageContent(data?.contentPage[0]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getPageContent();
  }, []);

  const content = pageContent?.acf
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 z-10"
        >
          <FaTimes size={20} />
        </button>

        <div className="p-6">
          <div className="border-2 border-purple-500 rounded-lg p-4 mb-6">
            <h2 className="text-center text-lg md:text-xl font-bold text-black leading-tight">
              <span style={{ fontFamily: "'Lobster', cursive" }}>
                {content?.group?.title || "Đăng Ký Để Nhận Tư Vấn Miễn Phí Từ Chuyên Gia."}
              </span>

            </h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="fullName"
              placeholder="Họ tên"
              value={formData.fullName}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
              required
            />

            <input
              type="tel"
              name="phone"
              placeholder="Số điện thoại"
              value={formData.phone}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, '');
                setFormData((prev) => ({ ...prev, phone: value }));
              }}
              onKeyDown={(e) => {
                // chỉ cho phím số, phím điều hướng, backspace
                if (
                  !/[0-9]/.test(e.key) &&
                  !['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'].includes(e.key)
                ) {
                  e.preventDefault();
                }
              }}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
              inputMode="numeric"
              required
            />
            <textarea
              name="content"
              placeholder="Nội dung cần nhắn"
              value={formData.content}
              onChange={handleInputChange}
              rows={4}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500 resize-none"
            />
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold py-3 px-6 rounded-full hover:from-orange-600 hover:to-orange-700 transition-all duration-300"
            >
              {content?.group?.name_button || "ĐĂNG KÝ NGAY."}
            </button>

            <p className="text-center text-gray-500 text-sm mt-4 whitespace-pre-line">
              {content?.group?.desc || "Lorem ipsum dolor sit amet, consectetur."}
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};
