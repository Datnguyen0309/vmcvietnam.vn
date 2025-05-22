/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useRouter } from "next/router";
import { useState, useEffect } from "react";

export function CountdownTimer({ initialMinutes = 15 }) {
  const [timeLeft, setTimeLeft] = useState(initialMinutes * 60);
  const router = useRouter();
  useEffect(() => {
    if (timeLeft <= 0) {
      router.back(); // Quay lại trang trước đó
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="flex gap-1">
      <div className="flex h-6 w-6 items-center justify-center rounded bg-gray-900 text-sm text-white">
        {String(minutes).padStart(2, "0")}
      </div>
      <p className="text-gray-900 font-bold"> : </p>
      <div className="flex h-6 w-6 items-center justify-center rounded bg-gray-900 text-sm text-white">
        {String(seconds).padStart(2, "0")}
      </div>
    </div>
  );
}
