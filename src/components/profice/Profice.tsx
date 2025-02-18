import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export const  Profice =()=> {
  const router = useRouter();
  const [user, setUser] = useState<{
    name: string;
    email: string;
    phone?: string;
    address?: string;
    dob?: string;
    gender?: string;
  } | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (!token || !storedUser) {
      router.push("/"); 
    } else {
      setUser(JSON.parse(storedUser)); 
    }
  }, );

  if (!user) return null; 

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold">Tài khoản của tôi</h1>
      <div className="mt-4 p-4 border rounded-lg shadow-md bg-gray-100">
        <p><strong>Họ và tên:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        {user.phone && <p><strong>Số điện thoại:</strong> {user.phone}</p>}
        {user.address && <p><strong>Địa chỉ:</strong> {user.address}</p>}
        {user.dob && <p><strong>Ngày sinh:</strong> {user.dob}</p>}
        {user.gender && <p><strong>Giới tính:</strong> {user.gender}</p>}
      </div>
      
      <button
        onClick={() => {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          router.push("/");
        }}
        className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
      >
        Đăng xuất
      </button>
    </div>
  );
}
