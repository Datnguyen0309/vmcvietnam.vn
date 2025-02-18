import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function EditProfile() {
  const router = useRouter();
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    dob: "",
    gender: "",
  });

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    localStorage.setItem("user", JSON.stringify(user));
    alert("Thông tin đã được cập nhật!");
    router.push("/trang-ca-nhan");
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold">Chỉnh sửa thông tin cá nhân</h1>
      <div className="mt-4 p-4 border rounded-lg shadow-md bg-gray-100">
        <div className="mb-3">
          <label className="block text-sm font-medium">Họ và tên</label>
          <input
            type="text"
            name="name"
            value={user.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        <div className="mb-3">
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={user.email}
            disabled // Không cho phép thay đổi email
            className="w-full px-3 py-2 border rounded bg-gray-200"
          />
        </div>

        <div className="mb-3">
          <label className="block text-sm font-medium">Số điện thoại</label>
          <input
            type="text"
            name="phone"
            value={user.phone}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        <div className="mb-3">
          <label className="block text-sm font-medium">Địa chỉ</label>
          <input
            type="text"
            name="address"
            value={user.address}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        <div className="mb-3">
          <label className="block text-sm font-medium">Ngày sinh</label>
          <input
            type="date"
            name="dob"
            value={user.dob}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        <div className="mb-3">
          <label className="block text-sm font-medium">Giới tính</label>
          <select
            name="gender"
            value={user.gender}
            onChange={(e) => setUser({ ...user, gender: e.target.value })}
            className="w-full px-3 py-2 border rounded"
          >
            <option value="">Chọn giới tính</option>
            <option value="Nam">Nam</option>
            <option value="Nữ">Nữ</option>
            <option value="Khác">Khác</option>
          </select>
        </div>
      </div>

      <div className="mt-4 flex gap-4">
        <button onClick={handleSave} className="px-4 py-2 bg-green-500 text-white rounded">
          Lưu thay đổi
        </button>
        <button onClick={() => router.push("/dashboard")} className="px-4 py-2 bg-gray-500 text-white rounded">
          Hủy
        </button>
      </div>
    </div>
  );
}
