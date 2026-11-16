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

/* ─── Random sponsor ─────────────────────────────────────── */
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
const diffLabel: Record<string, string>  = { dễ: "Dễ", vừa: "Vừa", khó: "Khó" };

/* ─── Platform icons ──────────────────────────────────────── */
function IconTikTok({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z"/>
    </svg>
  );
}
function IconFacebook({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  );
}
function IconInstagram({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
    </svg>
  );
}

/* ─── Done Popup ──────────────────────────────────────────── */
interface DonePopupProps {
  sponsor: Prize;
  onConfirm: (data: { videoUrl: string; stk: string; bank: string }) => void;
  onSkip: () => void;
}

const PLATFORMS = [
  { id: "tiktok",  label: "TikTok",    icon: <IconTikTok size={16} />,    color: "#ffffff", placeholder: "https://tiktok.com/@bạn/video/..." },
  { id: "reels",   label: "FB Reels",  icon: <IconFacebook size={16} />,  color: "#1877F2", placeholder: "https://fb.watch/..." },
  { id: "instagram", label: "Instagram", icon: <IconInstagram size={16} />, color: "#E1306C", placeholder: "https://instagram.com/reel/..." },
];

function DonePopup({ sponsor, onConfirm, onSkip }: DonePopupProps) {
  const [platform, setPlatform] = useState("tiktok");
  const [videoUrl, setVideoUrl] = useState("");
  const [stk, setStk]           = useState("");
  const [bank, setBank]         = useState("");
  const [submitting, setSubmitting] = useState(false);

  const selectedPlatform = PLATFORMS.find(p => p.id === platform)!;
  const canSubmit = videoUrl.trim().startsWith("http") && stk.trim().length >= 6 && bank.trim().length > 0;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;
    setSubmitting(true);
    // TODO: gửi lên backend
    await new Promise(r => setTimeout(r, 800));
    onConfirm({ videoUrl, stk, bank });
  }

  return (
    <>
      <style>{`
        @keyframes popupIn {
          from { opacity: 0; transform: scale(0.92) translateY(16px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>

      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 flex items-end justify-center px-4 pb-6"
        style={{ background: "rgba(0,0,0,0.75)", backdropFilter: "blur(8px)" }}
        onClick={(e) => e.target === e.currentTarget && onSkip()}
      >
        <div
          className="w-full max-w-sm rounded-3xl overflow-hidden"
          style={{
            background: "linear-gradient(170deg, #161616 0%, #0d0d0d 100%)",
            border: "1px solid rgba(0,200,150,0.25)",
            boxShadow: "0 0 0 1px rgba(0,200,150,0.1), 0 32px 64px rgba(0,0,0,0.7)",
            animation: "popupIn 0.4s cubic-bezier(0.34,1.56,0.64,1) both",
          }}
        >
          {/* Header */}
          <div className="px-5 pt-5 pb-4" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
            <div className="flex items-center gap-3 mb-1">
              <div style={{ filter: "drop-shadow(0 0 8px rgba(0,200,150,0.6))" }}>
                <IconCheckCircle size={28} color="#00C896" strokeWidth={1.5} />
              </div>
              <div>
                <p className="font-extrabold text-white text-lg leading-tight">Hoàn thành! 🎉</p>
                <p className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>
                  Streak +1 ngày
                </p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="px-5 py-4 flex flex-col gap-4">

            {/* Sponsor info */}
            <div
              className="flex items-center gap-3 p-3 rounded-2xl"
              style={{ background: `${sponsor.color}10`, border: `1px solid ${sponsor.color}25` }}
            >
              <div
                className="relative flex-shrink-0 rounded-xl overflow-hidden"
                style={{ width: 40, height: 40, background: `${sponsor.color}20`, border: `1px solid ${sponsor.color}30` }}
              >
                {sponsor.image
                  ? <Image src={sponsor.image} alt={sponsor.label} fill className="object-contain p-1" />
                  : <div className="w-full h-full flex items-center justify-center text-xs font-bold" style={{ color: sponsor.color }}>?</div>
                }
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold" style={{ color: `${sponsor.color}99` }}>Nhà tài trợ của bạn</p>
                <p className="text-sm font-bold text-white truncate">{sponsor.label}</p>
              </div>
            </div>

            {/* Section: Video */}
            <div className="flex flex-col gap-2">
              <p className="text-xs font-bold" style={{ color: "rgba(255,255,255,0.5)", letterSpacing: "0.08em", textTransform: "uppercase" }}>
                Link video POV của bạn
              </p>

              {/* Platform tabs */}
              <div className="flex gap-2">
                {PLATFORMS.map(p => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => { setPlatform(p.id); setVideoUrl(""); }}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all"
                    style={{
                      background: platform === p.id ? `${p.color}20` : "rgba(255,255,255,0.04)",
                      border: platform === p.id ? `1px solid ${p.color}60` : "1px solid rgba(255,255,255,0.08)",
                      color: platform === p.id ? p.color : "rgba(255,255,255,0.4)",
                    }}
                  >
                    <span style={{ color: platform === p.id ? p.color : "rgba(255,255,255,0.4)" }}>{p.icon}</span>
                    {p.label}
                  </button>
                ))}
              </div>

              {/* URL input */}
              <div className="relative">
                <input
                  type="url"
                  value={videoUrl}
                  onChange={e => setVideoUrl(e.target.value)}
                  placeholder={selectedPlatform.placeholder}
                  className="w-full rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 outline-none"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    fontSize: "0.78rem",
                  }}
                />
              </div>

              {/* Hashtag hint */}
              <p className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>
                Bắt buộc có hashtag{" "}
                <span
                  className="font-bold"
                  style={{ color: "#00C896" }}
                >
                  #damthukhongnao
                </span>{" "}
                trong video
              </p>
            </div>

            {/* Section: STK */}
            <div className="flex flex-col gap-2">
              <p className="text-xs font-bold" style={{ color: "rgba(255,255,255,0.5)", letterSpacing: "0.08em", textTransform: "uppercase" }}>
                Nhận tài trợ — STK ngân hàng
              </p>
              <input
                type="text"
                value={bank}
                onChange={e => setBank(e.target.value)}
                placeholder="Tên ngân hàng (VD: Vietcombank)"
                className="w-full rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 outline-none"
                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", fontSize: "0.78rem" }}
              />
              <input
                type="text"
                inputMode="numeric"
                value={stk}
                onChange={e => setStk(e.target.value.replace(/\D/g, ""))}
                placeholder="Số tài khoản"
                className="w-full rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 outline-none font-mono"
                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", fontSize: "0.78rem", letterSpacing: "0.05em" }}
              />
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-2 pt-1">
              <button
                type="submit"
                disabled={!canSubmit || submitting}
                className="relative w-full py-3.5 rounded-2xl font-bold text-sm overflow-hidden group"
                style={{
                  background: canSubmit ? "linear-gradient(135deg, #00C896, #00E5B0)" : "rgba(255,255,255,0.07)",
                  color: canSubmit ? "#080808" : "rgba(255,255,255,0.3)",
                  border: "none",
                  boxShadow: canSubmit ? "0 6px 24px rgba(0,200,150,0.35)" : "none",
                  transition: "all 0.3s",
                  cursor: canSubmit ? "pointer" : "not-allowed",
                }}
              >
                <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                  style={{ background: "linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.22) 50%, transparent 65%)" }}
                />
                <span className="relative">
                  {submitting ? "Đang gửi..." : "Gửi & Nhận tài trợ"}
                </span>
              </button>

              <button
                type="button"
                onClick={onSkip}
                className="text-xs py-2 text-center transition-colors"
                style={{ color: "rgba(255,255,255,0.25)" }}
              >
                Bỏ qua, chỉ hoàn thành thôi
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

/* ─── MyChallengeActive ───────────────────────────────────── */
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
  const [status, setStatus]       = useState<"active" | "done" | "failed">("active");
  const [showDonePopup, setShowDonePopup] = useState(false);

  const isCAM   = challenge.type === "CAM";
  const primary = isCAM ? "#FF4D4D" : "#00C896";
  const glow    = isCAM ? "rgba(255,77,77,0.45)" : "rgba(0,200,150,0.45)";
  const diff    = diffColor[challenge.difficulty];

  function handleDoneClick() {
    setShowDonePopup(true);
  }

  function handlePopupConfirm(data: { videoUrl: string; stk: string; bank: string }) {
    console.log("Submit:", data); // TODO: gửi backend
    setShowDonePopup(false);
    setStatus("done");
  }

  function handlePopupSkip() {
    setShowDonePopup(false);
    setStatus("done");
  }

  /* ── Submitted state ───────────────────────────────────── */
  if (status !== "active") {
    const isDone = status === "done";
    const resultColor = isDone ? "#00C896" : "#FF4D4D";
    return (
      <div
        className="flex flex-col items-center gap-5 w-full py-8 px-5 rounded-3xl animate-scale-in"
        style={{ background: `${resultColor}0A`, border: `1px solid ${resultColor}25` }}
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
            {isDone ? "Tuyệt vời! Streak +1 ngày." : "Không sao, ngày mai thử lại nhé."}
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
    <>
      {/* Done popup */}
      {showDonePopup && (
        <DonePopup
          sponsor={sponsor}
          onConfirm={handlePopupConfirm}
          onSkip={handlePopupSkip}
        />
      )}

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
          <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full blur-3xl pointer-events-none"
            style={{ background: `radial-gradient(circle, ${glow} 0%, transparent 70%)` }} />

          <div className="relative">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider"
                style={{ background: `${primary}18`, border: `1px solid ${primary}35`, color: primary }}>
                {isCAM ? <IconBan size={11} color={primary} strokeWidth={2.5} /> : <IconCheck size={11} color={primary} strokeWidth={2.5} />}
                <span>{isCAM ? "CẤM" : "PHẢI"}</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full"
                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.5)" }}>
                <CategoryIcon category={challenge.category} size={11} color="rgba(255,255,255,0.5)" />
                <span>{categoryLabel[challenge.category]}</span>
              </div>
            </div>

            <p className="text-2xl font-extrabold text-white leading-tight mb-4 text-balance"
              style={{ letterSpacing: "-0.02em" }}>
              {challenge.content}
            </p>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full"
                style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.6)" }}>
                <IconClock size={12} color="rgba(255,255,255,0.6)" strokeWidth={1.5} />
                <span>{challenge.duration}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  {Array.from({ length: 3 }).map((_, i) => {
                    const filled = i < (challenge.difficulty === "dễ" ? 1 : challenge.difficulty === "vừa" ? 2 : 3);
                    return <div key={i} className="rounded-full" style={{ width: filled ? "18px" : "6px", height: "5px", background: filled ? diff : "rgba(255,255,255,0.1)" }} />;
                  })}
                </div>
                <span className="text-xs font-semibold" style={{ color: diff }}>{diffLabel[challenge.difficulty]}</span>
              </div>
            </div>
          </div>

          <div className="absolute bottom-0 left-5 right-5 h-px"
            style={{ background: `linear-gradient(90deg, transparent, ${primary}50, transparent)` }} />
        </div>

        {/* Sponsor card */}
        <div className="flex items-center gap-3 px-4 py-3 rounded-2xl"
          style={{ background: `${sponsor.color}0D`, border: `1px solid ${sponsor.color}25` }}>
          <div className="relative flex-shrink-0 rounded-xl overflow-hidden"
            style={{ width: 44, height: 44, background: `${sponsor.color}15`, border: `1px solid ${sponsor.color}30` }}>
            {sponsor.image
              ? <Image src={sponsor.image} alt={sponsor.label} fill className="object-contain p-1" />
              : <div className="w-full h-full flex items-center justify-center text-xs font-bold" style={{ color: sponsor.color }}>?</div>
            }
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold mb-0.5" style={{ color: `${sponsor.color}99` }}>Nhà tài trợ hôm nay</p>
            <p className="text-sm font-bold text-white truncate">{sponsor.label}</p>
          </div>
          <div className="w-2 h-2 rounded-full flex-shrink-0"
            style={{ background: sponsor.color, boxShadow: `0 0 8px ${sponsor.color}` }} />
        </div>

        {/* User greeting */}
        <div className="flex items-center gap-2 px-4 py-3 rounded-2xl"
          style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
          <div className="animate-float" style={{ filter: `drop-shadow(0 0 8px ${glow})` }}>
            <IconFlame size={20} color={primary} />
          </div>
          <div>
            <p className="text-sm font-semibold text-white">{userName} đang thực hiện</p>
            <p className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>Thử thách cá nhân · {dateKey}</p>
          </div>
        </div>

        {/* Submit buttons */}
        <div className="flex flex-col gap-3">
          <p className="text-center text-xs font-medium" style={{ color: "rgba(255,255,255,0.3)" }}>
            Báo kết quả cuối ngày
          </p>
          <div className="grid grid-cols-2 gap-3">

            {/* Done — mở popup */}
            <button
              onClick={handleDoneClick}
              className="relative py-4 rounded-2xl font-bold text-sm overflow-hidden press group"
              style={{ background: "linear-gradient(135deg, #00C896, #00E5B0)", color: "#080808", boxShadow: "0 6px 20px rgba(0,200,150,0.35)" }}
            >
              <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                style={{ background: "linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.25) 50%, transparent 65%)" }} />
              <span className="relative flex flex-col items-center gap-1">
                <IconCheckCircle size={18} color="#080808" strokeWidth={1.5} />
                <span>Hoàn thành</span>
              </span>
            </button>

            {/* Failed */}
            <button
              onClick={() => setStatus("failed")}
              className="relative py-4 rounded-2xl font-bold text-sm overflow-hidden press group"
              style={{ background: "rgba(255,77,77,0.12)", border: "1px solid rgba(255,77,77,0.3)", color: "#FF4D4D" }}
            >
              <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                style={{ background: "rgba(255,77,77,0.08)" }} />
              <span className="relative flex flex-col items-center gap-1">
                <IconBan size={18} color="#FF4D4D" strokeWidth={1.5} />
                <span>Chưa làm được</span>
              </span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
