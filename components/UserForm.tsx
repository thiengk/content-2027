"use client";

import { useState } from "react";

interface UserInfo {
  name: string;
  userId: string;
}

interface UserFormProps {
  onSubmit: (user: UserInfo) => void;
}

export default function UserForm({ onSubmit }: UserFormProps) {
  const [name, setName] = useState("");
  const [userId, setUserId] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !userId.trim()) return;
    onSubmit({ name: name.trim(), userId: userId.trim() });
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-full">
      <p className="text-center text-gray-400 text-sm">
        Nhập thông tin để bắt đầu thử thách
      </p>

      <input
        type="text"
        placeholder="Tên của bạn"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        maxLength={30}
        className="w-full bg-[#1A1A1A] border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-gray-500 text-sm"
      />

      <input
        type="text"
        placeholder="ID của bạn (ví dụ: minhtu_hcm)"
        value={userId}
        onChange={(e) =>
          setUserId(e.target.value.replace(/\s+/g, "_").toLowerCase())
        }
        required
        maxLength={30}
        pattern="[a-z0-9_]+"
        title="Chỉ dùng chữ thường, số và dấu gạch dưới"
        className="w-full bg-[#1A1A1A] border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-gray-500 text-sm font-mono"
      />

      <button
        type="submit"
        disabled={!name.trim() || !userId.trim()}
        className="w-full bg-white text-[#0F0F0F] font-bold py-3 rounded-xl text-sm hover:bg-gray-200 active:scale-95 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
      >
        Tiếp theo →
      </button>
    </form>
  );
}
