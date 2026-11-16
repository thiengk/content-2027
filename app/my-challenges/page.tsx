"use client";

import { useState, useEffect } from "react";
import type { Challenge } from "@/lib/challenges";
import ChallengeDeal    from "@/components/ChallengeDeal";
import MyChallengeActive from "@/components/MyChallengeActive";
import { IconFlame, IconCalendar } from "@/components/icons";

function getDateKey(): string {
  const today = new Date();
  return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
}

function getDayLabel(): string {
  const days = ["Chủ Nhật", "Thứ Hai", "Thứ Ba", "Thứ Tư", "Thứ Năm", "Thứ Sáu", "Thứ Bảy"];
  return days[new Date().getDay()];
}

function getDateLabel(): string {
  const t = new Date();
  return `${t.getDate()}/${t.getMonth() + 1}/${t.getFullYear()}`;
}

interface UserInfo { name: string; userId: string; }

type Phase = "loading" | "deal" | "active";

export default function MyChallengesPage() {
  const dateKey  = getDateKey();
  const dayLabel = getDayLabel();
  const dateLabel = getDateLabel();

  const [user, setUser]       = useState<UserInfo | null>(null);
  const [phase, setPhase]     = useState<Phase>("loading");
  const [chosen, setChosen]   = useState<Challenge | null>(null);

  /* Restore from localStorage */
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem("dtknUser");
      const savedPick = localStorage.getItem(`dtknMyPick_${dateKey}`);

      if (savedUser) {
        const parsed: UserInfo = JSON.parse(savedUser);
        setUser(parsed);

        if (savedPick) {
          const c: Challenge = JSON.parse(savedPick);
          setChosen(c);
          setPhase("active");
        } else {
          setPhase("deal");
        }
      } else {
        setPhase("deal");
      }
    } catch {
      setPhase("deal");
    }
  }, [dateKey]);

  function handleSelect(challenge: Challenge) {
    localStorage.setItem(`dtknMyPick_${dateKey}`, JSON.stringify(challenge));
    setChosen(challenge);
    setPhase("active");
  }

  /* Determine bg color */
  const primary = chosen?.type === "CAM" ? "#FF4D4D" : "#00C896";
  const hasChallenge = phase === "active";

  /* ── Loading skeleton ──────────────────────────────────── */
  if (phase === "loading") {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 rounded-full shimmer" />
          <div className="w-32 h-3 rounded-full shimmer" />
        </div>
      </main>
    );
  }

  return (
    <main
      className="min-h-screen flex flex-col items-center px-4 pb-6 pt-10 overflow-x-hidden"
    >
      {/* Subtle per-page color accent on top of aurora */}
      <div
        aria-hidden
        className="fixed inset-0 pointer-events-none"
        style={{
          background: hasChallenge
            ? chosen?.type === "CAM"
              ? "radial-gradient(ellipse 70% 40% at 20% 10%, rgba(255,77,77,0.07) 0%, transparent 60%)"
              : "radial-gradient(ellipse 70% 40% at 20% 10%, rgba(0,200,150,0.06) 0%, transparent 60%)"
            : "none",
        }}
      />

      <div className="relative w-full max-w-sm flex flex-col gap-5">

        {/* ── Header ── */}
        <header className="text-center animate-fade-up">
          <div className="flex items-center justify-center gap-2.5 mb-2.5">
            <div className="animate-float" style={{ filter: `drop-shadow(0 0 10px ${hasChallenge ? primary + "80" : "rgba(120,120,255,0.6)"})` }}>
              <IconFlame size={26} color={hasChallenge ? primary : "rgba(255,255,255,0.6)"} />
            </div>
            <h1 className="text-xl font-extrabold tracking-tight text-white" style={{ letterSpacing: "-0.03em" }}>
              Thử Thách Của Tôi
            </h1>
          </div>

          {/* Date pill */}
          <div className="flex items-center justify-center">
            <span
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium"
              style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)", color: "rgba(255,255,255,0.5)" }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                style={{
                  background: hasChallenge ? primary : "rgba(255,255,255,0.4)",
                  boxShadow: hasChallenge ? `0 0 6px ${primary}` : "none",
                }}
              />
              <IconCalendar size={12} color="rgba(255,255,255,0.4)" strokeWidth={1.5} />
              <span>{dayLabel} · {dateLabel}</span>
            </span>
          </div>
        </header>

        {/* ── No user warning ── */}
        {!user && phase === "deal" && (
          <div
            className="rounded-2xl px-4 py-3 text-center animate-fade-up"
            style={{ background: "rgba(255,183,0,0.08)", border: "1px solid rgba(255,183,0,0.2)" }}
          >
            <p className="text-sm font-medium" style={{ color: "#FFB800" }}>
              Vào trang chủ đăng nhập trước nhé
            </p>
            <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.35)" }}>
              Cần tên + ID để deal thử thách riêng cho bạn
            </p>
          </div>
        )}

        {/* ── Deal screen ── */}
        {phase === "deal" && (
          <ChallengeDeal
            dateKey={dateKey}
            userId={user?.userId ?? "guest"}
            onSelect={handleSelect}
          />
        )}

        {/* ── Active screen ── */}
        {phase === "active" && chosen && user && (
          <MyChallengeActive
            challenge={chosen}
            userName={user.name}
            userId={user.userId}
            dateKey={dateKey}
          />
        )}

        {/* ── Active but no user (edge case) ── */}
        {phase === "active" && chosen && !user && (
          <MyChallengeActive
            challenge={chosen}
            userName="Người dùng"
            userId="guest"
            dateKey={dateKey}
          />
        )}

      </div>
    </main>
  );
}
