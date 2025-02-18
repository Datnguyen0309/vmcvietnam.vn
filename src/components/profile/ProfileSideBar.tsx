import Image from "next/image";
import { FaSignOutAlt, FaLock, FaShoppingCart, FaEdit, FaUserCircle } from "react-icons/fa";
import nookies from "nookies"; // To handle cookies
import { useQuery } from "react-query";
import { handleUserInfo } from "@/utils/fetch-auth-odoo";

export const ProfileSideBar = () => {
  const cookies = nookies.get();
  const sessionLogId = cookies.session_log_id;

  const { data, isLoading } = useQuery(`getUserInfoSideBar,${sessionLogId}`, () =>
    handleUserInfo({
      session_log_id: sessionLogId,
    })
  );
  return (
    <div className="xl:w-[330px] mx-[10px] xl:mx-0 flex-shrink-0 ">
      <div className="sticky top-8 space-y-4">
        <div className="bg-white rounded-lg border border-[#e9ecef] overflow-hidden">
          <div className="relative">
            <div className="h-24 w-full bg-[#4A3B63]" />
            <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 h-24 w-24 rounded-full border-4 border-white overflow-hidden">
              <Image src="/assets/avata.png" alt="Profile" layout="fill" objectFit="cover" />
            </div>
          </div>
          <div className="pt-14 pb-6 px-4  text-center">
            <h2 className="text-xl font-semibold">
              {data?.user_info?.user_info?.name || "user Name"}
            </h2>
            <p className="text-sm text-gray-500">
              {data?.user_info?.user_info?.career || "Career"}
            </p>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-[#e9ecef] overflow-hidden">
          <nav className="px-4 py-6">
            <ul className="space-y-1">
              {[
                {
                  icon: FaUserCircle,
                  label: "Thông tin cá nhân",
                  href: "/thong-tin-ca-nhan",
                },
                {
                  icon: FaEdit,
                  label: "Sửa thông tin cá nhân",
                  href: "/thong-tin-ca-nhan/sua-thong-tin-ca-nhan",
                },
                {
                  icon: FaShoppingCart,
                  label: "Lịch sử mua hàng",
                  href: "/thong-tin-ca-nhan/lich-su-mua-hang",
                },
                {
                  icon: FaLock,
                  label: "Đổi mật khẩu",
                  href: "/thong-tin-ca-nhan/doi-mat-khau",
                },
                { icon: FaSignOutAlt, label: "Đăng xuất", href: "/" },
              ].map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="flex items-center px-4 py-2 text-gray-700 rounded-md hover:bg-gray-100"
                  >
                    <item.icon className="mr-3 h-5 w-5" />
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};
