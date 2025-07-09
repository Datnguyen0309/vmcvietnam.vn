"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export const ConsultationCard = () => {
  const [phone, setPhone] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = new URLSearchParams();
    data.append("phone", phone);
    data.append("time", new Date().toISOString());

    try {
      await fetch(
        "https://script.google.com/macros/s/AKfycbwn9-F3tVpiogm5tnl9ACdNmncMAS6o3Xr0tZ-AzCH0cY7O2lDn60oTH4EkY_dFuH9vpw/exec",
        {
          method: "POST",
          body: data,
        }
      );
      toast.success("✅ Đăng ký tư vấn thành công!");
      setPhone("");
    } catch (err) {
      toast.error("❌ Gửi thất bại. Vui lòng thử lại.");
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
  return (
    <div
      className="max-w-sm mx-auto rounded-[20px] p-[30px] text-white text-[14px]"
      style={{
        background: "linear-gradient(138.62deg, #BC0D2C 7.45%, #E65F1E 85.72%)",
      }}
    >
      <h2 className="text-2xl font-bold mb-2">
     {content?.group_1?.title || "Doanh nghiệp của bạn đã sẵn sàng chuyển đổi tốt hơn...?" }
      </h2>
      <p className="mb-6 text-white whitespace-pre-line">
           {content?.group_1?.desc || " Ứng dụng công nghệ tự động hàng đầu ngay bây giờ cùng chuyên gia của chúng tôi!..."}
      </p>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <input
          type="tel"
          inputMode="numeric"
          pattern="[0-9]*"
          placeholder="Số điện thoại"
          value={phone}
          onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
          className="w-full px-4 py-2 text-gray-800 bg-white rounded-lg focus:outline-none focus:ring focus:ring-purple-500"
          required
        />
        <button
          type="submit"
          className="w-full bg-[#463266] text-white font-semibold py-2 rounded-lg hover:bg-purple-800 transition"
        >
         {content?.group_1?.name_button || " Đăng ký tư vấn!"}
        </button>
      </form>
    </div>
  );
};
