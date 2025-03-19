import { BreadCrumb } from "@/components/BreadCrumb";
import { ProfileSideBar } from "../profile/ProfileSideBar";
import { useRouter } from "next/router";
import nookies from "nookies"; // To handle cookies
import { useEffect } from "react";
import { getUserOrders } from "@/utils/fetch-auth-odoo";
import { useQuery } from "react-query";

export const OrderHistoryPage = () => {
  const router = useRouter();
  const cookies = nookies.get();
  const sessionLogId = cookies.session_log_id;
  const { data, isLoading } = useQuery(`getUserOrdersHistory`, () =>
    getUserOrders({
      session_log_id: sessionLogId,
    })
  );

  useEffect(() => {
    if (!sessionLogId) router.push("/");
  }, [router, sessionLogId]);

  return (
    <>
      <div className="bg-[#fafafa] py-20">
        <div className="mx-auto max-w-[1320px] py-8">
          <div className="flex flex-col xl:flex-row gap-8">
            <ProfileSideBar />
            <div className="bg-white overflow-x-auto hidden md:block md:mx-[10px]">
              <table className="min-w-full border-collapse border border-[#e9ecef] table-fixed">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-[#e9ecef] px-4 py-2 text-left w-1/8">Đơn hàng</th>
                    <th className="border border-[#e9ecef] px-4 py-2 text-left w-3/6">
                      Tên khóa học
                    </th>
                    <th className="border border-[#e9ecef] px-4 py-2 text-left w-1/6">Ngày</th>
                    <th className="border border-[#e9ecef] px-4 py-2 text-left w-1/6">Giá</th>
                    <th className="border border-[#e9ecef] px-4 py-2 text-left w-1/6">
                      Trạng thái
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {!isLoading &&
                    data?.data?.map((order: any, index: number) => (
                      <tr key={index} className="border-b border-[#e9ecef]">
                        <td className="border border-[#e9ecef] px-4 py-2">{order.order_name}</td>
                        <td className="border border-[#e9ecef] px-4 py-2 whitespace-pre-wrap">
                          <div className="space-y-2">
                            {order.items.map((item: any, idx: number) => (
                              <div
                                key={idx}
                                className={`px-2 py-1 border rounded ${
                                  item.is_reward_line ? "bg-[#Ff6575] text-white" : "bg-white"
                                }`}
                              >
                                {item.name}
                              </div>
                            ))}
                          </div>
                        </td>
                        <td className="border border-[#e9ecef] px-4 py-2">{order.create_time}</td>
                        <td className="border border-[#e9ecef] px-4 py-2">
                          {order.total_price.toLocaleString()} VND
                        </td>
                        <td className="border border-[#e9ecef] px-4 py-2">
                          <span
                            className={
                              order.status === "sale"
                                ? "text-blue-500"
                                : order.status === "cancel"
                                ? "text-red-500"
                                : order.status === "done"
                                ? "text-green-500"
                                : ""
                            }
                          >
                            {order.status === "sale"
                              ? "Đang xử lý"
                              : order.status === "cancel"
                              ? "Đã huỷ"
                              : order.status === "done"
                              ? "Thành công"
                              : order.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>

            {/* Mobile View */}
            <div className="md:hidden space-y-4 mx-[10px]">
              {!isLoading &&
                data?.data?.map((order: any, index: number) => (
                  <div
                    key={index}
                    className="bg-white p-4 rounded-lg border border-[#e9ecef] shadow-md"
                  >
                    <div className="flex justify-between">
                      <div className="text-lg font-semibold">{order.order_name}</div>
                      <span
                        className={`px-2 py-1 rounded text-sm font-medium ${
                          order.status === "sale"
                            ? "bg-blue-100 text-blue-600"
                            : order.status === "cancel"
                            ? "bg-red-100 text-red-600"
                            : order.status === "done"
                            ? "bg-green-100 text-green-600"
                            : ""
                        }`}
                      >
                        {order.status === "sale"
                          ? "Đang xử lý"
                          : order.status === "cancel"
                          ? "Đã huỷ"
                          : order.status === "done"
                          ? "Thành công"
                          : order.status}
                      </span>
                    </div>
                    <div className="text-sm text-gray-500 mt-1">{order.create_time}</div>
                    <div className="text-lg font-bold mt-2">
                      {order.total_price.toLocaleString()} VND
                    </div>
                    <div className="mt-3 space-y-1">
                      {order.items.map((item: any, idx: number) => (
                        <div
                          key={idx}
                          className={`px-2 py-1 border rounded ${
                            item.is_reward_line ? "bg-[#Ff6575] text-white" : "bg-gray-100"
                          }`}
                        >
                          {item.name}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
