"use client";

import { useState, useEffect, useRef } from "react";
import { challenges, type Challenge } from "@/lib/challenges";
import {
  IconBan, IconCheck, IconClock,
  IconSpeech, IconWalk, IconFood, IconPhone, IconSocial,
} from "@/components/icons";

/* ─── Helpers ────────────────────────────────────────────── */
const categoryLabel: Record<string, string> = {
  ngôn_ngữ: "Ngôn Ngữ", di_chuyển: "Di Chuyển",
  ăn_uống: "Ăn Uống", điện_thoại: "Điện Thoại", xã_hội: "Xã Hội",
};

function CategoryIcon({ category, size = 12, color }: { category: string; size?: number; color: string }) {
  const p = { size, color };
  switch (category) {
    case "ngôn_ngữ":   return <IconSpeech {...p} />;
    case "di_chuyển":  return <IconWalk   {...p} />;
    case "ăn_uống":    return <IconFood   {...p} />;
    case "điện_thoại": return <IconPhone  {...p} />;
    case "xã_hội":     return <IconSocial {...p} />;
    default:            return null;
  }
}

const diffColor: Record<string, string> = { dễ: "#00C896", vừa: "#FFB800", khó: "#FF4D4D" };

/** Deal 6 thử thách ngẫu nhiên, seed theo ngày + userId để cùng user cùng ngày = cùng bộ */
function dealChallenges(dateKey: string, userId: string): Challenge[] {
  // Simple seeded shuffle
  let seed = 0;
  for (const c of `${dateKey}-${userId}`) seed = (seed * 31 + c.charCodeAt(0)) & 0xfffffff;
  const rng = () => { seed = (seed * 1664525 + 1013904223) & 0xffffffff; return (seed >>> 0) / 0x100000000; };
  const pool = [...challenges].sort(() => rng() - 0.5);
  return pool.slice(0, 6);
}

/* ─── Single deal card ───────────────────────────────────── */
function DealCard({
  challenge, index, selected, locked, onSelect,
}: {
  challenge: Challenge;
  index: number;
  selected: boolean;
  locked: boolean;
  onSelect: () => void;
}) {
  const isCAM   = challenge.type === "CAM";
  const primary = isCAM ? "#FF4D4D" : "#00C896";
  const diff    = diffColor[challenge.difficulty];
  const [revealed, setRevealed] = useState(false);

  // Staggered reveal animation on mount
  useEffect(() => {
    const t = setTimeout(() => setRevealed(true), index * 110 + 80);
    return () => clearTimeout(t);
  }, [index]);

  return (
    <div
      onClick={!locked ? onSelect : undefined}
      className="relative overflow-hidden rounded-2xl transition-all duration-300"
      style={{
        opacity: revealed ? 1 : 0,
        transform: revealed ? "translateY(0) scale(1)" : "translateY(16px) scale(0.95)",
        cursor: locked ? "default" : "pointer",
        background: selected
          ? `linear-gradient(135deg, ${primary}22, ${primary}10)`
          : "rgba(255,255,255,0.04)",
        border: selected
          ? `1.5px solid ${primary}60`
          : "1px solid rgba(255,255,255,0.08)",
        boxShadow: selected
          ? `0 0 20px ${primary}30, 0 8px 24px rgba(0,0,0,0.3)`
          : "0 2px 8px rgba(0,0,0,0.2)",
      }}
    >
      {/* Selected glow */}
      {selected && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse at top, ${primary}18 0%, transparent 65%)`,
          }}
        />
      )}

      {/* Top shimmer line on selected */}
      {selected && (
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{ background: `linear-gradient(90deg, transparent, ${primary}80, transparent)` }}
        />
      )}

      <div className="p-4">
        {/* Header row */}
        <div className="flex items-center justify-between mb-3">
          <div
            className="flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-bold uppercase tracking-wider"
            style={{
              background: `${primary}18`,
              border: `1px solid ${primary}30`,
              color: primary,
            }}
          >
            {isCAM
              ? <IconBan  size={10} color={primary} strokeWidth={2.5} />
              : <IconCheck size={10} color={primary} strokeWidth={2.5} />
            }
            <span style={{ fontSize: "0.65rem" }}>{isCAM ? "CẤM" : "PHẢI"}</span>
          </div>

          <div
            className="flex items-center gap-1 text-xs px-2 py-0.5 rounded-full"
            style={{
              background: "rgba(255,255,255,0.05)",
              color: "rgba(255,255,255,0.4)",
              fontSize: "0.65rem",
            }}
          >
            <CategoryIcon category={challenge.category} size={10} color="rgba(255,255,255,0.4)" />
            <span>{categoryLabel[challenge.category]}</span>
          </div>
        </div>

        {/* Content */}
        <p
          className="font-bold text-white leading-tight mb-3"
          style={{ fontSize: "0.9rem", letterSpacing: "-0.01em" }}
        >
          {challenge.content}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between">
          <div
            className="flex items-center gap-1 text-xs"
            style={{ color: "rgba(255,255,255,0.4)" }}
          >
            <IconClock size={11} color="rgba(255,255,255,0.4)" strokeWidth={1.5} />
            <span style={{ fontSize: "0.7rem" }}>{challenge.duration}</span>
          </div>

          {/* Difficulty dots */}
          <div className="flex items-center gap-1">
            {Array.from({ length: 3 }).map((_, i) => {
              const filled = i < (challenge.difficulty === "dễ" ? 1 : challenge.difficulty === "vừa" ? 2 : 3);
              return (
                <div
                  key={i}
                  className="rounded-full transition-all duration-200"
                  style={{
                    width: filled ? "14px" : "6px",
                    height: "4px",
                    background: filled ? diff : "rgba(255,255,255,0.1)",
                  }}
                />
              );
            })}
          </div>
        </div>
      </div>

      {/* Selected checkmark overlay */}
      {selected && (
        <div
          className="absolute top-3 right-3 w-5 h-5 rounded-full flex items-center justify-center"
          style={{ background: primary }}
        >
          <IconCheck size={12} color={primary === "#FF4D4D" ? "#fff" : "#080808"} strokeWidth={2.5} />
        </div>
      )}
    </div>
  );
}

/* ─── ChallengeDeal ──────────────────────────────────────── */
interface ChallengeDealProps {
  dateKey: string;
  userId: string;
  onSelect: (challenge: Challenge) => void;
}

export default function ChallengeDeal({ dateKey, userId, onSelect }: ChallengeDealProps) {
  const dealt   = useRef(dealChallenges(dateKey, userId)).current;
  const [chosen, setChosen] = useState<number | null>(null);
  const [confirmed, setConfirmed] = useState(false);

  function handleConfirm() {
    if (chosen === null) return;
    setConfirmed(true);
    setTimeout(() => onSelect(dealt[chosen]), 400);
  }

  const selectedChallenge = chosen !== null ? dealt[chosen] : null;
  const isCAM  = selectedChallenge?.type === "CAM";
  const primary = isCAM ? "#FF4D4D" : "#00C896";

  return (
    <div className="flex flex-col gap-5 w-full animate-fade-up">
      {/* Header */}
      <div className="text-center">
        <p
          className="text-xs font-bold tracking-widest uppercase mb-2"
          style={{ color: "rgba(255,255,255,0.3)", letterSpacing: "0.12em" }}
        >
          Thử thách hôm nay của bạn
        </p>
        <h2
          className="text-xl font-extrabold text-white"
          style={{ letterSpacing: "-0.03em" }}
        >
          Chọn 1 trong 6
        </h2>
        <p className="text-sm mt-1" style={{ color: "rgba(255,255,255,0.4)" }}>
          Hệ thống đã deal riêng cho bạn hôm nay
        </p>
      </div>

      {/* 6 cards — 2 columns */}
      <div className="grid grid-cols-2 gap-3">
        {dealt.map((challenge, i) => (
          <DealCard
            key={challenge.id}
            challenge={challenge}
            index={i}
            selected={chosen === i}
            locked={confirmed}
            onSelect={() => !confirmed && setChosen(i)}
          />
        ))}
      </div>

      {/* CTA */}
      <div
        className="transition-all duration-300"
        style={{ opacity: chosen !== null ? 1 : 0.4, pointerEvents: chosen !== null ? "auto" : "none" }}
      >
        <button
          onClick={handleConfirm}
          disabled={chosen === null || confirmed}
          className="relative w-full py-4 rounded-2xl font-bold text-base overflow-hidden press group"
          style={{
            background: chosen !== null
              ? `linear-gradient(135deg, ${primary}, ${primary}CC)`
              : "rgba(255,255,255,0.08)",
            color: chosen !== null ? (isCAM ? "#fff" : "#080808") : "rgba(255,255,255,0.3)",
            boxShadow: chosen !== null ? `0 8px 28px ${primary}40` : "none",
            transition: "all 0.3s",
          }}
        >
          <span
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{ background: "linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.2) 50%, transparent 65%)" }}
          />
          <span className="relative">
            {confirmed ? "Đang xử lý..." : chosen !== null ? "Chấp nhận thử thách này" : "Chọn một thử thách"}
          </span>
        </button>
      </div>

      {/* Hint */}
      <p className="text-center text-xs" style={{ color: "rgba(255,255,255,0.18)" }}>
        Mỗi ngày chỉ chọn được 1 lần · Thử thách đổi lúc 00:00
      </p>
    </div>
  );
}
