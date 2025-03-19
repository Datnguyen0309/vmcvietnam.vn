import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import nookies from "nookies";
import { useQuery } from "react-query";
import { getUserOrders } from "@/utils/fetch-auth-odoo";
import ReactPaginate from "react-paginate";
import { ProfileSideBar } from "../profile/ProfileSideBar";

export const OrderHistoryPage = () => {
  const router = useRouter();
  const cookies = nookies.get();
  const sessionLogId = cookies.session_log_id;

  const { data, isLoading } = useQuery(`getUserOrdersHistory`, () =>
    getUserOrders({ session_log_id: sessionLogId })
  );

  const [currentPage, setCurrentPage] = useState(0);
  const ordersPerPage = 7; // Số đơn hàng trên mỗi trang

  useEffect(() => {
    if (!sessionLogId) router.push("/");
  }, [router, sessionLogId]);

  // Tính toán chỉ mục để cắt dữ liệu theo trang
  const offset = currentPage * ordersPerPage;
  const currentOrders = data?.data?.slice(offset, offset + ordersPerPage) || [];

  // Số trang tối đa
  const pageCount = Math.ceil((data?.data?.length || 0) / ordersPerPage);

  // Xử lý khi chuyển trang
  const handlePageClick = ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
  };

  return (
    <div className="bg-[#fafafa] py-20">
      <div className="mx-auto max-w-[1320px] py-8">
        <div className="flex flex-col xl:flex-row gap-8">
          <ProfileSideBar />
          <div className="bg-white overflow-x-auto hidden md:block md:mx-[10px]">
            <table className="min-w-full border-collapse border border-[#e9ecef] table-fixed">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-[#e9ecef] px-4 py-2 text-left w-1/8">Đơn hàng</th>
                  <th className="border border-[#e9ecef] px-4 py-2 text-left w-3/6">Tên khóa học</th>
                  <th className="border border-[#e9ecef] px-4 py-2 text-left w-1/6">Ngày</th>
                  <th className="border border-[#e9ecef] px-4 py-2 text-left w-1/6">Giá</th>
                  <th className="border border-[#e9ecef] px-4 py-2 text-left w-1/6">Trạng thái</th>
                </tr>
              </thead>
              <tbody>
                {!isLoading &&
                  currentOrders.map((order: any, index: number) => (
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
        </div>
        <div className="mt-4">
            <ReactPaginate
              previousLabel={"←"}
              nextLabel={"→"}
              breakLabel={"..."}
              pageCount={pageCount}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={handlePageClick}
              containerClassName={"flex justify-center space-x-2"}
              activeClassName={"bg-blue-500 text-white px-3 py-1 rounded"}
              pageClassName={"px-3 py-1 border rounded"}
              previousClassName={"px-3 py-1 border rounded"}
              nextClassName={"px-3 py-1 border rounded"}
              disabledClassName={"text-gray-400"}
            />
          </div>
      </div>
    </div>
  );
};
