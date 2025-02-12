export const ConsultationCard = () => {
  return (
    <div
      className="max-w-sm mx-auto rounded-[20px] p-[30px] text-white text-[14px]"
      style={{
        background: "linear-gradient(138.62deg, #BC0D2C 7.45%, #E65F1E 85.72%)"
      }}
    >
      <h2 className="text-2xl font-bold mb-2">
        Doanh nghiệp của bạn đã sẵn sàng chuyển đổi tốt hơn?
      </h2>
      <p className="mb-6 text-white">
        Ứng dụng công nghệ tự động hàng đầu ngay bây giờ cùng chuyên gia của
        chúng tôi!
      </p>
      <form className="space-y-4">
        <input
          type="text"
          placeholder="Số điện thoại"
          className="w-full px-4 py-2 text-gray-800 bg-white rounded-lg focus:outline-none focus:ring focus:ring-purple-500"
        />
        <button
          type="submit"
          className="w-full bg-[#463266] text-white font-semibold py-2 rounded-lg hover:bg-purple-800 transition"
        >
          Đăng ký tư vấn
        </button>
      </form>
    </div>
  );
};
