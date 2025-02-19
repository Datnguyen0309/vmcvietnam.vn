import { ProfileSideBar } from "../profile/ProfileSideBar";

export const OrderHistoryPage = () => {
  return (
    <>
      <div className="bg-[#fafafa] lg:py-20">
        <div className="mx-auto max-w-[1320px] py-8">
          <div className="flex flex-col xl:flex-row gap-8">
            <ProfileSideBar />
            <div className="flex-grow mx-[10px] xl:mx-0">
              <div className="bg-white rounded-lg border border-[#e9ecef] p-6">
                <div className="space-y-6 mb-6">
                  <div>
                    <h2 className="text-2xl font-semibold">Lịch sử mua hàng</h2>
                  </div>
                  <div className="flex space-x-4 mb-6">
                    {["Hôm nay", "Tháng này", "Năm này"].map((tab) => (
                      <button
                        key={tab}
                        className="px-6 py-2 bg-gray-100 rounded-md text-gray-700 hover:bg-gray-200"
                      >
                        {tab}
                      </button>
                    ))}
                  </div>
                  <div className="overflow-x-auto">
                    <table className="min-w-full border-collapse border border-[#e9ecef]">
                      <thead>
                        <tr className="bg-gray-100">
                          {["Đơn hàng", "Tên khóa học", "Ngày", "Giá", "Trạng thái"].map(
                            (header) => (
                              <th
                                key={header}
                                className="border border-[#e9ecef] px-4 py-2 text-left"
                              >
                                {header}
                              </th>
                            )
                          )}
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          {
                            id: "#3022",
                            courseName:
                              "Fullstack WordPress Developer Online Course\nAdvanced Android 12 & Kotlin Development Course",
                            date: "December 30, 2024",
                            price: "$275",
                            status: "On Hold",
                          },
                        ].map((order, index) => (
                          <tr key={index} className="border-b border-[#e9ecef]">
                            <td className="border border-[#e9ecef] px-4 py-2">{order.id}</td>
                            <td className="border border-[#e9ecef] px-4 py-2 whitespace-pre-wrap">
                              {order.courseName}
                            </td>
                            <td className="border border-[#e9ecef] px-4 py-2">{order.date}</td>
                            <td className="border border-[#e9ecef] px-4 py-2">{order.price}</td>
                            <td className="border border-[#e9ecef] px-4 py-2">
                              <span className="text-yellow-500">{order.status}</span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
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
