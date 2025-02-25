import ForgotPasswordModal from "@/components/ForgotPasswordModal";
import AuthModal from "@/components/LoginModal";
import { logout, User } from "@/redux/features/loginSlice";
import { useAppSelector } from "@/redux/store";
import { handleUserInfo } from "@/utils/fetch-auth-odoo";
import { Mail, Phone, LogIn } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";
import nookies, { setCookie } from "nookies";
import { useEffect, useState } from "react";
import { MdLogout } from "react-icons/md";
import { PiNotePencilBold } from "react-icons/pi";
import { useDispatch } from "react-redux";

export const HeaderTop = ({ headerTop }: { headerTop: any }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false);
  const OpenForgotModel = () => (setModalOpen(false), setForgotPasswordOpen(true));
  const cookies = nookies.get();
  const [user, setUser] = useState<User>(useAppSelector((state) => state.login.user));
  const router = useRouter();
  const dispatch = useDispatch();

  const openAuthModal = (loginMode: boolean) => {
    setModalOpen(true);
    setIsLogin(loginMode);
  };
  const closeModal = () => setModalOpen(false);
  const toggleAuth = () => setIsLogin((prev) => !prev);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const list = [
    {
      path: "thong-tin-ca-nhan",
      title: "Thông tin cá nhân",
      icon: <PiNotePencilBold size={"20px"} />,
    },
  ];

  const sessionLogId = cookies.session_log_id;
  useEffect(() => {
    const handleUserInfoIN = async () => {
      if (sessionLogId != undefined) {
        const dataUser = await handleUserInfo({ session_log_id: sessionLogId });
        setUser({
          name: dataUser?.user_info?.user_info?.name,
          email: dataUser?.user_info?.user_info?.email,
          image: dataUser?.user_info?.user_info?.image,
          age: dataUser?.user_info?.user_info?.age,
          phone: dataUser?.user_info?.user_info?.phone,
          gender: dataUser?.user_info?.user_info?.gender,
          career: dataUser?.user_info?.user_info?.career,
        });
        return dataUser;
      }
      return null;
    };
    handleUserInfoIN();
  }, [router]);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <header className="bg-[#4A3B63] text-white py-2">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-6">
              <Link
                href={`mailto:${headerTop?.mail?.mail_to || "contact@example.com"}`}
                className="flex items-center gap-2 text-sm hover:text-gray-200"
              >
                <Mail className="h-4 w-4" />
                <span className="hidden sm:inline">
                  {headerTop?.mail?.mail_label || "CONTACT"}
                </span>
              </Link>
              <div className="flex items-center gap-2 text-sm">
                <Phone className="h-4 w-4" />
                <span>{headerTop?.phone || "+47 900 99 000"}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span>{headerTop?.time || "08:00 - 17:00"}</span>
              </div>
            </div>
            <div className="flex space-x-4 justify-center items-center">
              {/* Nếu chưa đăng nhập, chỉ hiển thị icon đăng nhập */}
              <div className="flex items-center">
                {/* Dành cho desktop: hiển thị nút đăng nhập và đăng ký */}
                <div className="hidden md:flex space-x-2">
                  {!sessionLogId && (
                    <>
                      <button onClick={() => openAuthModal(true)}>Đăng nhập</button>
                      <span>|</span>
                      <button onClick={() => openAuthModal(false)}>Đăng ký</button>
                    </>
                  )}
                </div>

                {/* Dành cho mobile: hiển thị icon đăng nhập */}
                <div className="flex md:hidden">
                  {!sessionLogId && (
                    <button onClick={() => openAuthModal(true)} className="p-2">
                      <LogIn size={24} />
                    </button>
                  )}
                </div>
              </div>

              {sessionLogId && (
                <div
                  className="relative"
                  onMouseEnter={() => setIsOpen(true)}
                  onMouseLeave={() => setIsOpen(false)}
                >
                  <div className="cursor-pointer flex justify-center items-center w-[32px] h-[32px] xl:w-[50px] xl:h-[50px] rounded-full xl:border-[3px] border-[1px] border-slate-200">
                    <div
                      className="border border-gray-200 bg-cover bg-center w-full h-auto rounded-full aspect-square"
                      style={{ backgroundImage: `url(${user.image || "/assets/default-kh.jpg"})` }}
                    ></div>
                  </div>
                  <div
                    className={`absolute z-[60] xl:left-[-60px] right-[-50px] mt-2 xl:w-[300px] w-[240px] bg-white shadow-xl rounded-xl p-4 border border-gray-200 transition-all duration-200 ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"
                      }`}
                  >
                    <div>
                      <div className="inline-flex space-x-2">
                        <div className="flex flex-col space-y-1">
                          <span className="text-green-600 text-base xl:text-lg font-semibold">
                            {user.name}
                          </span>
                          <span className="text-gray-500 text-xs">{user.email}</span>
                        </div>
                      </div>
                      <div className="border-t border-gray-300 my-2"></div>
                    </div>
                    {list.map((item, index) => (
                      <a
                        key={index}
                        href={`/${item.path}`}
                        className="flex items-center text-black space-x-2 py-2 px-4 my-1 rounded-md xl:text-[16px] text-[14px] bg-gray-100 hover:bg-gray-200 hover:text-purple-700 transition"
                      >
                        <div>{item.icon}</div>
                        <span>{item.title}</span>
                      </a>
                    ))}
                    <div
                      onClick={() => {
                        dispatch(logout());
                        setCookie(null, "session_log_id", "", { maxAge: -1, path: "/" });
                        router.push("/");
                      }}
                      className="flex items-center space-x-2 py-2 px-4 xl:text-[16px] text-[14px] rounded-md bg-gray-100 hover:bg-gray-200 cursor-pointer transition"
                    >
                      <MdLogout size="20px" />
                      <span className="text-red-500">Đăng xuất</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
      <AuthModal
        openForgot={OpenForgotModel}
        isOpen={isModalOpen}
        onClose={closeModal}
        isLogin={isLogin}
        toggleAuth={toggleAuth}
      />
      <ForgotPasswordModal
        isOpen={forgotPasswordOpen}
        onClose={() => setForgotPasswordOpen(false)}
      />
    </>
  );
};
