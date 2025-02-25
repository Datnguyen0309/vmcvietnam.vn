"use client";

import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { RootState } from '@/redux/store';
import { completeOrder } from '@/redux/features/cartSlice';

export default function CheckoutPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.cartItems);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePayment = () => {
    alert('Thanh toán thành công!');
    dispatch(completeOrder());
    router.push('/');
  };

  return (
    <div className="container max-w-6xl mx-auto px-4 py-20">
      <h1 className="text-2xl font-bold text-[#4A306D] mb-6">Thanh toán</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="border p-6 rounded-lg shadow">
          <h2 className="text-lg font-bold">Đơn hàng của bạn</h2>
          <div className="mt-4 border-t pt-4">
            {cartItems.length > 0 ? (
              cartItems.map((item, index) => (
                <div key={index} className="flex items-center gap-4 mb-4">
                  <Image src={item.image} alt={item.name} width={80} height={80} className="rounded" />
                  <div>
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-sm text-gray-500">{item.price.toLocaleString('vi-VN')} VND</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500">Giỏ hàng trống</p>
            )}
          </div>
        </div>

        {/* Thông tin thanh toán */}
        <div className="border p-6 rounded-lg shadow">
          <h2 className="text-lg font-bold text-[#4A306D]">Thông tin thanh toán</h2>
          <Input name="name" placeholder="Họ và tên" value={formData.name} onChange={handleInputChange} className="mt-4" />
          <Input name="phone" placeholder="Số điện thoại" value={formData.phone} onChange={handleInputChange} className="mt-4" />
          <Input name="email" placeholder="Email" value={formData.email} onChange={handleInputChange} className="mt-4" />
          <div className="mt-6 p-4 bg-[#4A306D] text-white rounded">
            <input type="radio" checked readOnly className="mr-2" /> Thanh toán bằng chuyển khoản ngân hàng
          </div>
          <Button onClick={handlePayment} className="w-full bg-[#4A306D] hover:bg-[#FF8162] text-white mt-4">Thanh toán ngay</Button>
        </div>
      </div>
    </div>
  );
}
