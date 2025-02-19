import { ProfileSideBar } from "../profile/ProfileSideBar";
import nookies from "nookies"; // To handle cookies
import { useQuery } from "react-query";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { handleUpdateUserInfo, handleUserInfo } from "@/utils/fetch-auth-odoo";
import { changeUserInfo, User } from "@/pages/redux/features/loginSlice";
export const EditProfilePage = () => {
  const [tempUser, setTempUser] = useState<User>({
    name: "",
    email: "",
    image: "",
    age: 0,
    phone: "",
    gender: "",
    career: "",
  } as User);
  const dispatch = useDispatch();
  const cookies = nookies.get();
  const sessionLogId = cookies.session_log_id;

  useEffect(() => {
    const handleUserInfoIN = async () => {
      if (sessionLogId != null) {
        const dataUser = await handleUserInfo({
          session_log_id: sessionLogId,
        });
        const fetchedUserInfo = dataUser?.user_info?.user_info;

        setTempUser({
          name: fetchedUserInfo?.name,
          email: fetchedUserInfo?.email,
          image: fetchedUserInfo?.image,
          age: fetchedUserInfo?.age,
          phone: fetchedUserInfo?.phone,
          gender: fetchedUserInfo?.gender,
          career: fetchedUserInfo?.career,
        });

        return dataUser;
      }
      return null;
    };
    handleUserInfoIN();
  }, [sessionLogId]);

  const { data, isLoading } = useQuery(`getUserInfo,${sessionLogId}`, () =>
    handleUserInfo({
      session_log_id: sessionLogId,
    })
  );

  const handleSave = async () => {
    dispatch(changeUserInfo(tempUser));
    const dataupdate = await handleUpdateUserInfo({
      session_log_id: sessionLogId,
      ...tempUser,
    });
    if (dataupdate?.updated_user_info?.success) {
      toast.success("Cập nhật thành công");
    }
  };
  console.log(tempUser);
  console.log(!isLoading && data);

  return (
    <>
      <div className="bg-[#fafafa] lg:py-20">
        <div className="mx-auto max-w-[1320px] py-8">
          <div className="flex flex-col xl:flex-row gap-8">
            <ProfileSideBar />
            <div className="flex-grow mx-[10px] xl:mx-0">
              <div className="bg-white rounded-lg border border-[#e9ecef]  p-6">
                <div className="space-y-6 mb-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Thông tin chi tiết</h3>
                    <p className="text-sm text-gray-500 mb-4">
                      Chỉnh sửa thông tin cá nhân của bạn.
                    </p>
                    <form className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label
                          htmlFor="userName"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Họ và tên
                        </label>
                        <input
                          type="text"
                          id="userName"
                          name="userName"
                          required
                          defaultValue={tempUser.name || ""}
                          onChange={(e) => setTempUser({ ...tempUser, name: e.target.value })}
                          placeholder="Nhập họ và tên của bạn"
                          className="mt-1 block w-full py-2 px-2 rounded-md border border-[#e9ecef]"
                        />
                      </div>
                      <div className="space-y-2">
                        <label
                          htmlFor="phoneNumber"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Email
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          defaultValue={tempUser.email || ""}
                          readOnly
                          onChange={(e) => setTempUser({ ...tempUser, email: e.target.value })}
                          placeholder="Nhập email của bạn"
                          className="mt-1 block w-full py-2 px-2 rounded-md border border-[#e9ecef]"
                        />
                      </div>
                      <div className="space-y-2">
                        <label
                          htmlFor="phoneNumber"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Số điện thoại
                        </label>
                        <input
                          type="tel"
                          id="phoneNumber"
                          name="phoneNumber"
                          defaultValue={tempUser.phone || ""}
                          onChange={(e) => setTempUser({ ...tempUser, phone: e.target.value })}
                          placeholder="Nhập số điện thoại của bạn"
                          className="mt-1 block w-full py-2 px-2 rounded-md border border-[#e9ecef]"
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="career" className="block text-sm font-medium text-gray-700">
                          Nghề nghiệp
                        </label>
                        <input
                          type="text"
                          id="career"
                          name="career"
                          defaultValue={tempUser.career || ""}
                          onChange={(e) => setTempUser({ ...tempUser, career: e.target.value })}
                          placeholder="Nhập nghề nghiệp của bạn"
                          className="mt-1 block w-full py-2 px-2 rounded-md border border-[#e9ecef]"
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="age" className="block text-sm font-medium text-gray-700">
                          Tuổi
                        </label>
                        <input
                          type="number"
                          id="age"
                          name="age"
                          defaultValue={tempUser.age || ""}
                          onChange={(e) =>
                            setTempUser({ ...tempUser, age: Number(e.target.value) })
                          }
                          placeholder="Nhập tuổi của bạn"
                          className="mt-1 block w-full py-2 px-2 rounded-md border border-[#e9ecef]"
                        />
                      </div>
                      <div className="space-y-2">
                        <div>
                          <label
                            htmlFor="gender"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Giới tính
                          </label>
                          <select
                            value={tempUser.gender}
                            onChange={(e) => setTempUser({ ...tempUser, gender: e.target.value })}
                            className="form-control w-full p-3 border border-gray-300 rounded-lg"
                          >
                            <option value="male">Nam</option>
                            <option value="female">Nữ</option>
                            <option value="other">Khác</option>
                          </select>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
                <button
                  onClick={handleSave}
                  className="px-6 py-3 bg-Blush-Pink text-white rounded-md hover:bg-Regal-Violet transition-colors xl:w-auto w-[120px]"
                >
                  Cập nhật thông tin
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
