"use client";

import { useState } from "react";

export default function EmailSignup() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;

    setStatus("loading");

    // TODO: Kết nối API thực — hiện tại mock sau 1 giây
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Lưu tạm vào localStorage để demo
    try {
      const existing = JSON.parse(localStorage.getItem("subscribers") || "[]");
      if (!existing.includes(email)) {
        existing.push(email);
        localStorage.setItem("subscribers", JSON.stringify(existing));
      }
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="text-center py-4">
        <p className="text-[#00C896] font-bold text-lg">🎉 Đã đăng ký!</p>
        <p className="text-gray-400 text-sm mt-1">
          Chúng tôi sẽ thông báo khi app ra mắt.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <p className="text-center text-gray-400 text-sm mb-3">
        Nhận thông báo khi ra mắt đầy đủ
      </p>
      <div className="flex gap-2">
        <input
          type="email"
          placeholder="email của bạn"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="flex-1 bg-[#1A1A1A] border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-gray-500 text-sm"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="bg-white text-[#0F0F0F] font-bold px-5 py-3 rounded-xl text-sm hover:bg-gray-200 active:scale-95 transition-all disabled:opacity-50 whitespace-nowrap"
        >
          {status === "loading" ? "..." : "Đăng ký"}
        </button>
      </div>
      {status === "error" && (
        <p className="text-[#FF4D4D] text-xs mt-2 text-center">
          Có lỗi xảy ra. Thử lại nhé.
        </p>
      )}
    </form>
  );
}
