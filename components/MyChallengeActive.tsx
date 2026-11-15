"use client";

import { useState } from "react";
import Image from "next/image";
import type { Challenge } from "@/lib/challenges";
import { PRIZES, type Prize } from "@/components/GachaSpinner";
import {
  IconFlame, IconBan, IconCheck, IconClock,
  IconCheckCircle, IconAt,
  IconSpeech, IconWalk, IconFood, IconPhone, IconSocial,
} from "@/components/icons";

/* ─── Random sponsor (fig cứng, chưa có backend) ────────── */
function getRandomSponsor(): Prize {
  const eligible = PRIZES.filter((p) => p.id !== "nothing");
  return eligible[Math.floor(Math.random() * eligible.length)];
}

function CategoryIcon({ category, size = 13, color }: { category: string; size?: number; color: string }) {
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

const categoryLabel: Record<string, string> = {
  ngôn_ngữ: "Ngôn Ngữ", di_chuyển: "Di Chuyển",
  ăn_uống: "Ăn Uống", điện_thoại: "Điện Thoại", xã_hội: "Xã Hội",
};

const diffColor: Record<string, string> = { dễ: "#00C896", vừa: "#FFB800", khó: "#FF4D4D" };
const diffLabel: Record<string, string> = { dễ: "Dễ", vừa: "Vừa", khó: "Khó" };

interface MyChallengeActiveProps {
  challenge: Challenge;
  userName: string;
  userId: string;
  dateKey: string;
}

export default function MyChallengeActive({
  challenge, userName, userId, dateKey,
}: MyChallengeActiveProps) {
  const [sponsor] = useState<Prize>(() => getRandomSponsor());
  const [status, setStatus] = useState<"active" | "done" | "failed">("active");

  const isCAM   = challenge.type === "CAM";
  const primary = isCAM ? "#FF4D4D" : "#00C896";
  const glow    = isCAM ? "rgba(255,77,77,0.45)" : "rgba(0,200,150,0.45)";
  const diff    = diffColor[challenge.difficulty];

  function handleSubmit(result: "done" | "failed") {
    setStatus(result);
    // TODO: persist to backend
  }

  /* ── Submitted state ───────────────────────────────────── */
  if (status !== "active") {
    const isDone = status === "done";
    const resultColor = isDone ? "#00C896" : "#FF4D4D";
    return (
      <div
        className="flex flex-col items-center gap-5 w-full py-8 px-5 rounded-3xl animate-scale-in"
        style={{
          background: `${resultColor}0A`,
          border: `1px solid ${resultColor}25`,
        }}
      >
        <div style={{ filter: `drop-shadow(0 0 16px ${resultColor}60)` }}>
          {isDone
            ? <IconCheckCircle size={52} color={resultColor} strokeWidth={1.5} />
            : <IconBan size={52} color={resultColor} strokeWidth={1.5} />
          }
        </div>
        <div className="text-center">
          <p className="font-extrabold text-xl mb-1" style={{ color: resultColor }}>
            {isDone ? "Hoàn thành!" : "Thất bại hôm nay"}
          </p>
          <p className="text-sm" style={{ color: "rgba(255,255,255,0.45)" }}>
            {isDone
              ? "Tuyệt vời! Streak +1 ngày."
              : "Không sao, ngày mai thử lại nhé."}
          </p>
        </div>
        <div
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono"
          style={{ background: `${resultColor}12`, border: `1px solid ${resultColor}30`, color: resultColor }}
        >
          <IconAt size={12} color={resultColor} strokeWidth={1.5} />
          <span>{userId}</span>
        </div>
      </div>
    );
  }

  /* ── Active state ──────────────────────────────────────── */
  return (
    <div className="flex flex-col gap-4 w-full animate-fade-up">

      {/* Challenge card */}
      <div
        className="relative overflow-hidden rounded-3xl p-5"
        style={{
          background: `linear-gradient(135deg, ${primary}14, ${primary}07)`,
          border: `1px solid ${primary}30`,
          boxShadow: `0 0 0 1px ${primary}12, 0 16px 48px ${glow}18`,
        }}
      >
        {/* Ambient glow */}
        <div
          className="absolute -top-8 -right-8 w-32 h-32 rounded-full blur-3xl pointer-events-none"
          style={{ background: `radial-gradient(circle, ${glow} 0%, transparent 70%)` }}
        />

        <div className="relative">
          {/* Type + category */}
          <div className="flex items-center justify-between mb-3">
            <div
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider"
              style={{ background: `${primary}18`, border: `1px solid ${primary}35`, color: primary }}
            >
              {isCAM
                ? <IconBan  size={11} color={primary} strokeWidth={2.5} />
                : <IconCheck size={11} color={primary} strokeWidth={2.5} />
              }
              <span>{isCAM ? "CẤM" : "PHẢI"}</span>
            </div>
            <div
              className="flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full"
              style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.5)" }}
            >
              <CategoryIcon category={challenge.category} size={11} color="rgba(255,255,255,0.5)" />
              <span>{categoryLabel[challenge.category]}</span>
            </div>
          </div>

          {/* Content */}
          <p
            className="text-2xl font-extrabold text-white leading-tight mb-4 text-balance"
            style={{ letterSpacing: "-0.02em" }}
          >
            {challenge.content}
          </p>

          {/* Meta */}
          <div className="flex items-center justify-between">
            <div
              className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full"
              style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.6)" }}
            >
              <IconClock size={12} color="rgba(255,255,255,0.6)" strokeWidth={1.5} />
              <span>{challenge.duration}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                {Array.from({ length: 3 }).map((_, i) => {
                  const filled = i < (challenge.difficulty === "dễ" ? 1 : challenge.difficulty === "vừa" ? 2 : 3);
                  return (
                    <div key={i} className="rounded-full" style={{ width: filled ? "18px" : "6px", height: "5px", background: filled ? diff : "rgba(255,255,255,0.1)" }} />
                  );
                })}
              </div>
              <span className="text-xs font-semibold" style={{ color: diff }}>
                {diffLabel[challenge.difficulty]}
              </span>
            </div>
          </div>
        </div>

        {/* Bottom glow line */}
        <div
          className="absolute bottom-0 left-5 right-5 h-px"
          style={{ background: `linear-gradient(90deg, transparent, ${primary}50, transparent)` }}
        />
      </div>

      {/* Sponsor card */}
      <div
        className="flex items-center gap-3 px-4 py-3 rounded-2xl"
        style={{ background: `${sponsor.color}0D`, border: `1px solid ${sponsor.color}25` }}
      >
        {/* Sponsor image */}
        <div
          className="relative flex-shrink-0 rounded-xl overflow-hidden"
          style={{ width: 44, height: 44, background: `${sponsor.color}15`, border: `1px solid ${sponsor.color}30` }}
        >
          {sponsor.image ? (
            <Image src={sponsor.image} alt={sponsor.label} fill className="object-contain p-1" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-xs font-bold" style={{ color: sponsor.color }}>?</div>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <p className="text-xs font-semibold mb-0.5" style={{ color: `${sponsor.color}99` }}>
            Nhà tài trợ hôm nay
          </p>
          <p className="text-sm font-bold text-white truncate">{sponsor.label}</p>
        </div>

        <div
          className="w-2 h-2 rounded-full flex-shrink-0"
          style={{ background: sponsor.color, boxShadow: `0 0 8px ${sponsor.color}` }}
        />
      </div>

      {/* User greeting */}
      <div
        className="flex items-center gap-2 px-4 py-3 rounded-2xl"
        style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}
      >
        <div className="animate-float" style={{ filter: `drop-shadow(0 0 8px ${glow})` }}>
          <IconFlame size={20} color={primary} />
        </div>
        <div>
          <p className="text-sm font-semibold text-white">{userName} đang thực hiện</p>
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>
            Thử thách cá nhân · {dateKey}
          </p>
        </div>
      </div>

      {/* Submit buttons */}
      <div className="flex flex-col gap-3">
        <p className="text-center text-xs font-medium" style={{ color: "rgba(255,255,255,0.3)" }}>
          Báo kết quả cuối ngày
        </p>
        <div className="grid grid-cols-2 gap-3">
          {/* Done */}
          <button
            onClick={() => handleSubmit("done")}
            className="relative py-4 rounded-2xl font-bold text-sm overflow-hidden press group"
            style={{
              background: "linear-gradient(135deg, #00C896, #00E5B0)",
              color: "#080808",
              boxShadow: "0 6px 20px rgba(0,200,150,0.35)",
            }}
          >
            <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400" style={{ background: "linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.25) 50%, transparent 65%)" }} />
            <span className="relative flex flex-col items-center gap-1">
              <IconCheckCircle size={18} color="#080808" strokeWidth={1.5} />
              <span>Hoàn thành</span>
            </span>
          </button>

          {/* Failed */}
          <button
            onClick={() => handleSubmit("failed")}
            className="relative py-4 rounded-2xl font-bold text-sm overflow-hidden press group"
            style={{
              background: "rgba(255,77,77,0.12)",
              border: "1px solid rgba(255,77,77,0.3)",
              color: "#FF4D4D",
            }}
          >
            <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400" style={{ background: "rgba(255,77,77,0.08)" }} />
            <span className="relative flex flex-col items-center gap-1">
              <IconBan size={18} color="#FF4D4D" strokeWidth={1.5} />
              <span>Chưa làm được</span>
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
