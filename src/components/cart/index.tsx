"use client";

import { CartItem, deleteItem } from "@/redux/features/cartSlice";
import { useAppSelector } from "@/redux/store";
import Image from "next/image";
import { useState } from "react";
import { useDispatch } from "react-redux";

export default function ShoppingCart() {
  // const [items, setItems] = useState<CartItem[]>([
  //   {
  //     id: 1,
  //     name: "Fullstack WordPress Developer Online ",
  //     price: 260000,
  //     quantity: 1,
  //   },
  //   {
  //     id: 2,
  //     name: "Advanced Android 12 & Kotlin Development",
  //     price: 150000,
  //     quantity: 1,
  //   },
  // ]);
  const cartItems: CartItem[] = useAppSelector((state) => state.cart.cartItems);
  const totalPrice: number = useAppSelector((state) => state.cart.totalAmount);
  const dispatch = useDispatch();

  const [couponCode, setCouponCode] = useState("");

  return (
    <>
      <div className="bg-Soft-Snow">
        <div className="max-w-[1320px] mx-auto px-[10px] xl:px-auto pt-20 pb-16 ">
          <div className="flex flex-col xl:flex-row gap-8">
            {/* Cart Items Table */}
            <div className="lg:flex-1">
              <div className="lg:flex-1  ">
                {/* Table for desktop */}
                <table className="hidden xl:table w-full border bg-[#f7f7f7] border-[#0000001a]">
                  <thead>
                    <tr className="border border-[#0000001a]">
                      <th className="text-left px-[10px] py-4 font-medium">Sản phẩm</th>
                      <th className="text-left px-1 py-4 font-medium">Giá tiền</th>
                      {/* <th className="text-left px-1 py-4 font-medium">Quantity</th>
                      <th className="text-left px-1 py-4 font-medium">Subtotal</th> */}
                      <th></th>
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    {cartItems.map((item) => (
                      <tr key={item.id} className="border-b border-[#E5F0FF]">
                        <td className="px-[10px] py-6">
                          <div className="flex items-center gap-6">
                            <Image
                              src={item.image || ""}
                              alt=""
                              width={80}
                              height={80}
                              className="rounded"
                            />
                            <span className="text-Iron-Shadow px-1">{item.name}</span>
                          </div>
                        </td>
                        <td className="text-Iron-Shadow px-1">
                          {(item.price * item.quantity).toLocaleString("vi-VN")} {" đ"}
                        </td>
                        <td>
                          <button
                            onClick={() => dispatch(deleteItem(item.id))}
                            className="px-1 border border-Blush-Pink text-Blush-Pink hover:text-[#FF3557] transition-colors"
                          >
                            Xóa
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* Responsive list for mobile */}
                <div className="xl:hidden space-y-4">
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="bg-white p-4 border border-[#E5F0FF] rounded shadow-sm"
                    >
                      <div className="flex gap-4 items-start">
                        <Image
                          src=""
                          alt=""
                          width={80}
                          height={80}
                          className="rounded mt-2"
                        />
                        <div className="flex flex-col flex-1">
                          <span className="text-lg font-semibold">{item.name}</span>
                          <span className="text-sm text-gray-500">Giá: {item.price} đ</span>
                          <div className="flex items-center gap-4 mt-2">
                            {/* Button giảm số lượng */}
                            {/* <button
                              onClick={() => {
                                const newItems = [...items];
                                const index = newItems.findIndex((i) => i.id === item.id);
                                if (newItems[index].quantity > 1) {
                                  newItems[index].quantity -= 1;
                                  setItems(newItems);
                                }
                              }}
                              className="p-2 "
                            >
                              <AiOutlineMinus className="text-Blush-Pink w-5 h-5" />
                            </button> */}

                            {/* Hiển thị số lượng */}
                            {/* <span className="w-8 text-center">{item.quantity}</span> */}

                            {/* Button tăng số lượng */}
                            {/* <button
                              onClick={() => {
                                const newItems = [...items];
                                const index = newItems.findIndex((i) => i.id === item.id);
                                newItems[index].quantity += 1;
                                setItems(newItems);
                              }}
                              className="p-2 "
                            >
                              <AiOutlinePlus className="text-Blush-Pink w-5 h-5" />
                            </button> */}
                          </div>
                          {/* <span className="text-sm text-gray-500">
                            Subtotal: ${item.price * item.quantity}
                          </span> */}
                        </div>
                      </div>
                      <button
                        onClick={() => dispatch(deleteItem(item.id))}
                        className="mt-2 text-Blush-Pink hover:text-red-600 text-sm"
                      >
                        Xóa
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Coupon Section */}
              <div className="grid xl:grid-cols-2 gap-8 mt-8 bg-white border border-[#0000001a] p-4">
                <div className="flex flex-row w-full">
                  <input
                    type="text"
                    placeholder="Mã giảm giá"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="border max-w-[160px] xl:max-w-[225px]  border-[#E5F0FF] rounded-l-[5px] px-4 py-[10px] focus:outline-none"
                  />
                  <button className="bg-Blush-Pink font-semibold text-white px-6 py-[10px] rounded-r-[5px] hover:bg-[#FF3557] w-full transition-colors">
                    Áp dụng mã giảm giá
                  </button>
                </div>
                <button className="border w-full font-semibold text-Blush-Pink text-opacity-70 border-Blush-Pink px-6 py-[10px] rounded hover:border-Blush-Pink hover:text-Blush-Pink transition-colors ml-auto">
                  Cập nhật giỏ hàng
                </button>
              </div>
            </div>

            {/* Cart Totals */}
            <div className="lg:w-[320px]">
              <div className="border border-t-[#0000001a] border-r-[#0000001a] border-l-[#0000001a] rounded-t-[5px] p-5">
                <h2 className="text-xl font-medium text-Dark-Blue">Thông tin đơn hàng</h2>
              </div>
              <div className="border border-[#0000001a] rounded-b-[5px] p-5">
                <div className="space-y-4">
                  <div className="flex mt-6 justify-between pb-4 border-b border-[#0000001a]">
                    <span className="text-Iron-Shadow">Tạm tính</span>
                    <span className="text-Iron-Shadow">
                      {totalPrice.toLocaleString("vi-VN")}
                      {" đ"}
                    </span>
                  </div>
                  <div className="flex justify-between font-semibold">
                    <span>Tổng</span>
                    <span>
                      {totalPrice.toLocaleString("vi-VN")} {" đ"}
                    </span>
                  </div>
                  <button className="w-full bg-Blush-Pink text-white py-3 rounded hover:bg-[#FF3557] transition-colors mt-4">
                    Tiến hành thanh toán
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
