"use client";

import { useState, useEffect } from "react";
import type { Challenge } from "@/lib/challenges";
import UserForm from "./UserForm";
import GachaSpinner, { type Prize } from "./GachaSpinner";
import {
  IconFlame,
  IconMuscle,
  IconAt,
  IconCheckCircle,
  IconEdit,
} from "@/components/icons";

interface UserInfo {
  name: string;
  userId: string;
}

interface AcceptChallengeProps {
  challenge: Challenge;
  dateKey: string;
}

// form → ready → gacha → accepted
type State = "form" | "ready" | "gacha" | "accepted";

export default function AcceptChallenge({ challenge, dateKey }: AcceptChallengeProps) {
  const [user, setUser]                 = useState<UserInfo | null>(null);
  const [uiState, setUiState]           = useState<State>("form");
  const [prize, setPrize]               = useState<Prize | null>(null);
  const [justAccepted, setJustAccepted] = useState(false);

  /* Khôi phục từ localStorage */
  useEffect(() => {
    try {
      const savedUser   = localStorage.getItem("dtknUser");
      const savedAccept = localStorage.getItem(`dtknAccept_${dateKey}`);
      if (savedUser) {
        const parsed: UserInfo = JSON.parse(savedUser);
        setUser(parsed);
        setUiState(savedAccept === "true" ? "accepted" : "ready");
      }
    } catch { /* ignore */ }
  }, [dateKey]);

  function handleUserSubmit(info: UserInfo) {
    localStorage.setItem("dtknUser", JSON.stringify(info));
    setUser(info);
    setUiState("ready");
  }

  function handleAcceptClick() {
    // Chuyển sang gacha trước khi confirmed
    setUiState("gacha");
  }

  function handleGachaDone(result: Prize) {
    setPrize(result);
    localStorage.setItem(`dtknAccept_${dateKey}`, "true");
    setJustAccepted(true);
    setUiState("accepted");
  }

  const isCAM       = challenge.type === "CAM";
  const primary     = isCAM ? "#FF4D4D" : "#00C896";
  const gradientBtn = isCAM
    ? "linear-gradient(135deg, #FF4D4D 0%, #FF6B35 100%)"
    : "linear-gradient(135deg, #00C896 0%, #00E5B0 100%)";
  const glowColor = isCAM ? "rgba(255,77,77,0.45)" : "rgba(0,200,150,0.45)";
  const textColor = isCAM ? "#ffffff" : "#080808";

  /* ── FORM ───────────────────────────────────────────── */
  if (uiState === "form") {
    return <UserForm onSubmit={handleUserSubmit} />;
  }

  /* ── READY ──────────────────────────────────────────── */
  if (uiState === "ready") {
    return (
      <div className="flex flex-col gap-3 w-full animate-slide-up">
        <p className="text-center text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>
          Xin chào,{" "}
          <span className="font-semibold text-white">{user?.name}</span>
        </p>

        <button
          onClick={handleAcceptClick}
          className="relative w-full py-4 rounded-2xl font-bold text-base overflow-hidden press group"
          style={{
            background: gradientBtn,
            color: textColor,
            boxShadow: `0 8px 32px ${glowColor}, 0 2px 8px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.25)`,
          }}
        >
          <span
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              background:
                "linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.22) 50%, transparent 65%)",
            }}
          />
          <span className="relative flex items-center justify-center gap-2.5">
            <IconMuscle size={20} color={textColor} />
            <span>Tôi Chấp Nhận</span>
          </span>
        </button>

        <button
          onClick={() => {
            localStorage.removeItem("dtknUser");
            setUser(null);
            setUiState("form");
          }}
          className="flex items-center justify-center gap-1.5 text-xs py-1 mx-auto transition-colors duration-200"
          style={{ color: "rgba(255,255,255,0.22)" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.45)")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.22)")}
        >
          <IconEdit size={11} color="currentColor" strokeWidth={1.5} />
          <span>Đổi thông tin</span>
        </button>
      </div>
    );
  }

  /* ── GACHA ──────────────────────────────────────────── */
  if (uiState === "gacha") {
    return (
      <div className="w-full animate-scale-in">
        {/* Section header */}
        <div
          className="rounded-3xl p-5 mb-0"
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          <GachaSpinner
            primaryColor={primary}
            onComplete={handleGachaDone}
          />
        </div>
      </div>
    );
  }

  /* ── ACCEPTED ───────────────────────────────────────── */
  return (
    <div
      className={`flex flex-col items-center gap-4 w-full py-6 px-5 rounded-3xl ${
        justAccepted ? "animate-scale-in" : "animate-fade-in"
      }`}
      style={{
        background: `${primary}0A`,
        border: `1px solid ${primary}20`,
      }}
    >
      {/* Flame */}
      <div
        className="animate-float"
        style={{ filter: `drop-shadow(0 0 14px ${glowColor})` }}
      >
        <IconFlame size={44} color={primary} />
      </div>

      {/* Status */}
      <div className="text-center">
        <p className="font-bold text-lg mb-1" style={{ color: primary }}>
          Đang thực hiện!
        </p>
        <p className="text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>
          <span className="text-white font-medium">{user?.name}</span>{" "}
          đang thử thách hôm nay.{" "}
          <span style={{ color: "rgba(255,255,255,0.3)" }}>Chúc bạn làm được!</span>
        </p>
      </div>

      {/* Prize badge */}
      {prize && prize.id !== "nothing" && (
        <div
          className="flex items-center gap-2 px-4 py-2 rounded-2xl animate-fade-up"
          style={{
            background: `${prize.color}12`,
            border: `1px solid ${prize.color}30`,
          }}
        >
          <div
            className="w-2 h-2 rounded-full flex-shrink-0"
            style={{
              background: prize.color,
              boxShadow: `0 0 8px ${prize.color}`,
            }}
          />
          <div>
            <p className="text-xs font-semibold" style={{ color: prize.color }}>
              Được tài trợ
            </p>
            <p className="text-sm font-bold text-white leading-tight">
              {prize.label}
            </p>
          </div>
        </div>
      )}

      {prize && prize.id === "nothing" && (
        <p className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>
          Thử thách chính là phần thưởng rồi!
        </p>
      )}

      {/* User ID badge */}
      <div
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono font-medium"
        style={{
          background: `${primary}12`,
          border: `1px solid ${primary}30`,
          color: primary,
        }}
      >
        <IconAt size={12} color={primary} strokeWidth={1.5} />
        <span>{user?.userId}</span>
      </div>

      {/* Sub note */}
      <div
        className="flex items-center gap-1.5 text-xs"
        style={{ color: "rgba(255,255,255,0.22)" }}
      >
        <IconCheckCircle size={13} color="rgba(255,255,255,0.22)" strokeWidth={1.5} />
        <span>Kết quả cộng đồng cập nhật lúc 23:59</span>
      </div>
    </div>
  );
}
