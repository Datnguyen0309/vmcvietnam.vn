"use client";

import ForgotPasswordModal from "@/components/ForgotPasswordModal";
import AuthModal from "@/components/LoginModal";
import ShoppingCartButton from "@/components/ui/CartButton";
import { logout, User } from "@/redux/features/loginSlice";
import { useAppSelector } from "@/redux/store";
import { handleUserInfo } from "@/utils/fetch-auth-odoo";
import { motion } from "framer-motion";
import { Mail, Phone, LogIn } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";
import nookies, { setCookie } from "nookies";
import { useEffect, useState } from "react";
import { MdLogout } from "react-icons/md";
import { PiNotePencilBold } from "react-icons/pi";
import { useDispatch } from "react-redux";

export const HeaderTop = ({ headerTop }: { headerTop: any }) => {
  const [user, setUser] = useState<User | null>(null);
  const [sessionLogId, setSessionLogId] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const totalQuantity = useAppSelector((state) => state.cart.totalQuantity);
  const dispatch = useDispatch();
  const router = useRouter();

  const list = [
    {
      path: "thong-tin-ca-nhan",
      title: "Thông tin cá nhân",
      icon: <PiNotePencilBold size={"20px"} />,
    },
  ];

  useEffect(() => {
    setIsClient(true);
    const cookies = nookies.get();
    if (cookies.session_log_id) {
      setSessionLogId(cookies.session_log_id);
    }
  }, []);

  useEffect(() => {
    if (sessionLogId) {
      handleUserInfo({ session_log_id: sessionLogId }).then((dataUser) => {
        const info = dataUser?.user_info?.user_info;
        if (info) {
          setUser({
            name: info.name,
            email: info.email,
            image: info.image,
            age: info.age,
            phone: info.phone,
            gender: info.gender,
            career: info.career,
          });
        }
      });
    }
  }, [sessionLogId]);

  const openAuthModal = (loginMode: boolean) => {
    setModalOpen(true);
    setIsLogin(loginMode);
  };

  const closeModal = () => setModalOpen(false);
  const toggleAuth = () => setIsLogin((prev) => !prev);
  const OpenForgotModel = () => {
    setModalOpen(false);
    setForgotPasswordOpen(true);
  };

  if (!isClient) return null;

  return (
    <>
      <header className="bg-[#4A3B63] text-white py-2 md:py-4">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="flex xl:flex-wrap xl:items-center justify-between gap-4">
            {!headerTop ? (
              <div className="flex items-center gap-6 animate-pulse">
                {[1, 2, 3].map((_, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm">
                    <div className="h-4 w-4 bg-gray-400 rounded-full" />
                    <div className="h-3 w-24 bg-gray-300 rounded" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex items-center gap-6">
                <Link
                  href={`mailto:${headerTop?.mail?.mail_to}`}
                  className="flex items-center gap-2 text-sm hover:text-gray-200"
                >
                  <Mail className="h-4 w-4" />
                  <span className="hidden md:inline">
                    {headerTop?.mail?.mail_label || "Contact"}
                  </span>
                </Link>
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4" />
                  <span>{headerTop?.phone || "0123456789"}</span>
                </div>
                <div className="hidden md:flex items-center gap-2 text-sm">
                  <span>{headerTop?.time || "08:00 - 17:00"}</span>
                </div>
              </div>
            )}

            <div className="flex space-x-4 justify-center items-center">
              <div className="flex items-center">
                <Link
                  href="https://lms.ome.edu.vn/login/"
                  target="_blank"
                  className="md:hidden mr-3"
                >
                  <button className="flex items-center gap-1 px-3 py-1 rounded-full bg-[#E65F1D] text-white text-xs shadow-sm">
                    📘 Học
                  </button>
                </Link>

                <Link
                  href="https://lms.ome.edu.vn/login/"
                  target="_blank"
                  className="hidden md:flex mr-8"
                >
                  <motion.button
                    className="flex items-center gap-2 bg-gradient-to-r from-[#B7042D] to-[#E65F1D] px-4 py-2 rounded-full text-white text-sm font-semibold shadow-md"
                    animate={{ scaleX: [1, 1.2, 1] }}
                    initial={{ scaleX: 1 }}
                    transition={{
                      duration: 1,
                      ease: "easeInOut",
                      repeat: Infinity,
                      repeatType: "reverse",
                    }}
                  >
                    CLICK VÀO ĐỂ HỌC
                  </motion.button>
                </Link>

                <div className="hidden xl:flex space-x-2">
                  {!sessionLogId && (
                    <>
                      <button onClick={() => openAuthModal(true)}>Đăng nhập</button>
                      <span>|</span>
                      <button onClick={() => openAuthModal(false)}>Đăng ký</button>
                    </>
                  )}
                </div>

                <div className="flex xl:hidden">
                  {!sessionLogId && (
                    <button onClick={() => openAuthModal(true)} className="p-2">
                      <LogIn size={24} />
                    </button>
                  )}
                  <Link href="/gio-hang" className="relative pt-1">
                    <ShoppingCartButton itemCount={totalQuantity} />
                  </Link>
                </div>
              </div>

              {sessionLogId && user && (
                <div
                  className="relative"
                  onMouseEnter={() => setIsOpen(true)}
                  onMouseLeave={() => setIsOpen(false)}
                >
                  <div className="cursor-pointer flex justify-center items-center w-[32px] h-[32px] xl:w-[50px] xl:h-[50px] rounded-full xl:border-[3px] border-[1px] border-slate-200">
                    <div
                      className="border border-gray-200 bg-cover bg-center w-full h-auto rounded-full aspect-square"
                      style={{
                        backgroundImage: `url(${user.image || "/assets/default-kh.jpg"})`,
                      }}
                    ></div>
                  </div>
                  <div
                    className={`absolute z-[60] left-[-190px] lg:left-[-60px] right-[-50px] mt-2 xl:w-[300px] w-[240px] bg-white shadow-xl rounded-xl p-4 border border-gray-200 transition-all duration-200 ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"
                      }`}
                  >
                    <div className="inline-flex space-x-2">
                      <div className="flex flex-col space-y-1">
                        <span className="text-green-600 text-base xl:text-lg font-semibold">
                          {user.name}
                        </span>
                        <span className="text-gray-500 text-xs">{user.email}</span>
                      </div>
                    </div>
                    <div className="border-t border-gray-300 my-2"></div>
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
                        setCookie(null, "session_log_id", "", {
                          path: "/",
                          maxAge: -1,
                        });
                        router.reload(); // 💥 reload lại giao diện
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
