"use client";

import { useState, useEffect } from "react";
import type { Challenge } from "@/lib/challenges";
import UserForm from "./UserForm";

interface UserInfo {
  name: string;
  userId: string;
}

interface AcceptChallengeProps {
  challenge: Challenge;
  dateKey: string; // "2026-11-13" — dùng để reset mỗi ngày
}

type State = "form" | "ready" | "accepted";

export default function AcceptChallenge({
  challenge,
  dateKey,
}: AcceptChallengeProps) {
  const [user, setUser] = useState<UserInfo | null>(null);
  const [uiState, setUiState] = useState<State>("form");

  // Khôi phục từ localStorage khi load
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem("dtknUser");
      const savedAccept = localStorage.getItem(`dtknAccept_${dateKey}`);

      if (savedUser) {
        const parsed: UserInfo = JSON.parse(savedUser);
        setUser(parsed);
        setUiState(savedAccept === "true" ? "accepted" : "ready");
      }
    } catch {
      // ignore parse error
    }
  }, [dateKey]);

  function handleUserSubmit(info: UserInfo) {
    localStorage.setItem("dtknUser", JSON.stringify(info));
    setUser(info);
    setUiState("ready");
  }

  function handleAccept() {
    localStorage.setItem(`dtknAccept_${dateKey}`, "true");
    setUiState("accepted");
  }

  const isCAM = challenge.type === "CAM";
  const color = isCAM ? "#FF4D4D" : "#00C896";
  const colorText = isCAM ? "text-[#FF4D4D]" : "text-[#00C896]";
  const colorBg = isCAM
    ? "bg-[#FF4D4D] text-white"
    : "bg-[#00C896] text-[#0F0F0F]";

  if (uiState === "form") {
    return <UserForm onSubmit={handleUserSubmit} />;
  }

  if (uiState === "ready") {
    return (
      <div className="flex flex-col gap-3 w-full">
        <p className="text-center text-gray-400 text-sm">
          Xin chào,{" "}
          <span className="text-white font-semibold">{user?.name}</span> 👋
        </p>
        <button
          onClick={handleAccept}
          className={`w-full font-bold text-lg py-4 rounded-2xl active:scale-95 transition-transform ${colorBg}`}
        >
          Tôi Chấp Nhận 💪
        </button>
        <button
          onClick={() => {
            localStorage.removeItem("dtknUser");
            setUser(null);
            setUiState("form");
          }}
          className="text-center text-gray-600 text-xs hover:text-gray-400 transition-colors"
        >
          Đổi thông tin
        </button>
      </div>
    );
  }

  // accepted
  return (
    <div className="flex flex-col items-center gap-2 w-full py-2">
      <p className={`font-bold text-lg ${colorText}`}>
        🔥 Đang thực hiện!
      </p>
      <p className="text-gray-400 text-sm text-center">
        <span className="text-white font-medium">{user?.name}</span> đang thử
        thách hôm nay.
        <br />
        Chúc bạn làm được nhé!
      </p>
      <div
        className="mt-1 text-xs px-3 py-1 rounded-full border"
        style={{ borderColor: color, color }}
      >
        @{user?.userId}
      </div>
    </div>
  );
}
