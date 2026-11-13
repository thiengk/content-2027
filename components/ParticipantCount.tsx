"use client";

import { useEffect, useState } from "react";

// Simulate participant count với random số thực tế hơn
function getParticipantCount(): number {
  const today = new Date();
  const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
  // Pseudo-random từ date seed — cùng ngày cùng số
  const base = ((seed * 1103515245 + 12345) & 0x7fffffff) % 500 + 100;
  return base;
}

export default function ParticipantCount() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    const base = getParticipantCount();
    setCount(base);

    // Tăng nhẹ theo giờ để trông thật hơn
    const interval = setInterval(() => {
      setCount((prev) => (prev ? prev + Math.floor(Math.random() * 3) : prev));
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  if (count === null) return null;

  return (
    <p className="text-center text-gray-400 text-sm">
      👥{" "}
      <span className="text-white font-semibold">{count.toLocaleString("vi-VN")}</span>{" "}
      người đang thử hôm nay
    </p>
  );
}
