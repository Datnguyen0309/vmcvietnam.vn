"use client";
import { useQuery } from "react-query";
import { handleUserInfo } from "@/utils/fetch-auth-odoo";
import nookies from "nookies"; // To handle cookies
import { ProfileSideBar } from "./ProfileSideBar";
import { useEffect } from "react";
import { useRouter } from "next/router";

export const MyProfilePage = () => {
  
  const cookies = nookies.get();
  const sessionLogId = cookies.session_log_id;
  const router = useRouter();
  const { data, isLoading } = useQuery(`getUserInfo,${sessionLogId}`, () =>
    handleUserInfo({
      session_log_id: sessionLogId,
    })
  );
  useEffect(() => {
    if (!isLoading && data?.detail?.error) {
      router.push("/");
    }
  }, [data, isLoading, router]);
  const Gender = [
    {
      value: "male",
      label: "Nam",
    },
    {
      value: "female",
      label: "Nữ",
    },
    {
      value: "other",
      label: "Khác",
    },
  ];
  useEffect(() => {
    if (!sessionLogId) router.push("/");
  }, [router, sessionLogId]);
  return (
    <>
      <div className="bg-[#fafafa] py-20">
        <div className="mx-auto max-w-[1320px] py-8">
          <div className="flex flex-col xl:flex-row gap-8">
            <ProfileSideBar />
            <div className="flex-grow mx-[10px] xl:mx-0">
              <div className="bg-white rounded-lg border border-[#e9ecef] p-6">
                <h2 className="text-2xl font-semibold mb-6">Thông tin cá nhân</h2>
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm text-gray-500 font-semibold ">Họ và tên</p>
                    <p className="text-base text-gray-700">
                      {data?.user_info?.user_info?.name || "user Name"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-semibold">Email</p>
                    <p className="text-base text-gray-700">
                      {data?.user_info?.user_info?.email || "gmailexample.com"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-semibold">Số điện thoại</p>
                    <p className="text-base text-gray-700">
                      {data?.user_info?.user_info?.phone || "________"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-semibold">Nghề nghiệp</p>
                    <p className="text-base text-gray-700">
                      {data?.user_info?.user_info?.career || "________"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-semibold">Tuổi</p>
                    <p className="text-base text-gray-700">
                      {data?.user_info?.user_info?.age || "23"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-semibold">Giới tính</p>
                    {!isLoading && (
                      <p className="text-base text-gray-700">
                        {
                          Gender.find(
                            (items: any) =>
                              items.value == (data?.user_info?.user_info?.gender || "male")
                          )?.label
                        }
                      </p>
                    )}
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
