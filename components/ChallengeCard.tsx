import type { Challenge } from "@/lib/challenges";
import {
  IconBan,
  IconCheck,
  IconClock,
  IconSpeech,
  IconWalk,
  IconFood,
  IconPhone,
  IconSocial,
} from "@/components/icons";

interface ChallengeCardProps {
  challenge: Challenge;
}

const categoryLabel: Record<string, string> = {
  ngôn_ngữ:   "Ngôn Ngữ",
  di_chuyển:  "Di Chuyển",
  ăn_uống:    "Ăn Uống",
  điện_thoại: "Điện Thoại",
  xã_hội:     "Xã Hội",
};

function CategoryIcon({ category, size = 14, color }: { category: string; size?: number; color: string }) {
  const props = { size, color };
  switch (category) {
    case "ngôn_ngữ":   return <IconSpeech {...props} />;
    case "di_chuyển":  return <IconWalk   {...props} />;
    case "ăn_uống":    return <IconFood   {...props} />;
    case "điện_thoại": return <IconPhone  {...props} />;
    case "xã_hội":     return <IconSocial {...props} />;
    default:            return null;
  }
}

const difficultyConfig: Record<string, { label: string; color: string }> = {
  dễ:  { label: "Dễ",  color: "#00C896" },
  vừa: { label: "Vừa", color: "#FFB800" },
  khó: { label: "Khó", color: "#FF4D4D" },
};

const difficultyIndex: Record<string, number> = { dễ: 1, vừa: 2, khó: 3 };

export default function ChallengeCard({ challenge }: ChallengeCardProps) {
  const isCAM = challenge.type === "CAM";
  const diff  = difficultyConfig[challenge.difficulty];
  const dIdx  = difficultyIndex[challenge.difficulty];

  const primary     = isCAM ? "#FF4D4D" : "#00C896";
  const primaryGlow = isCAM ? "rgba(255,77,77,0.4)" : "rgba(0,200,150,0.4)";
  const gradientBg  = isCAM
    ? "linear-gradient(135deg, rgba(255,77,77,0.12) 0%, rgba(255,140,66,0.06) 100%)"
    : "linear-gradient(135deg, rgba(0,200,150,0.10) 0%, rgba(0,229,176,0.05) 100%)";

  return (
    <div
      className="relative overflow-hidden rounded-3xl animate-fade-up delay-200"
      style={{
        background: gradientBg,
        border: `1px solid ${primary}30`,
        boxShadow: `0 0 0 1px ${primary}18, 0 20px 60px ${primaryGlow}20`,
      }}
    >
      {/* Ambient glow */}
      <div
        className="absolute -top-10 -right-10 w-40 h-40 rounded-full blur-3xl pointer-events-none"
        style={{ background: `radial-gradient(circle, ${primaryGlow} 0%, transparent 70%)` }}
      />

      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(${primary} 1px, transparent 1px), linear-gradient(90deg, ${primary} 1px, transparent 1px)`,
          backgroundSize: "24px 24px",
        }}
      />

      <div className="relative p-6">
        {/* Top row */}
        <div className="flex items-center justify-between mb-5">
          {/* Type badge */}
          <div
            className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase"
            style={{
              background: `${primary}18`,
              border: `1px solid ${primary}35`,
              color: primary,
            }}
          >
            {isCAM
              ? <IconBan  size={13} color={primary} strokeWidth={2.5} />
              : <IconCheck size={13} color={primary} strokeWidth={2.5} />
            }
            <span>{isCAM ? "CẤM" : "PHẢI"}</span>
          </div>

          {/* Category */}
          <div
            className="flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full"
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.08)",
              color: "rgba(255,255,255,0.5)",
            }}
          >
            <CategoryIcon category={challenge.category} size={13} color="rgba(255,255,255,0.5)" />
            <span>{categoryLabel[challenge.category]}</span>
          </div>
        </div>

        {/* Challenge content */}
        <p
          className="text-[1.6rem] font-bold leading-[1.25] text-white text-balance mb-6"
          style={{ letterSpacing: "-0.02em" }}
        >
          {challenge.content}
        </p>

        {/* Bottom meta */}
        <div className="flex items-center justify-between">
          {/* Duration pill */}
          <div
            className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full"
            style={{
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.08)",
              color: "rgba(255,255,255,0.6)",
            }}
          >
            <IconClock size={13} color="rgba(255,255,255,0.6)" strokeWidth={1.5} />
            <span>{challenge.duration}</span>
          </div>

          {/* Difficulty */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              {Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="rounded-full transition-all duration-300"
                  style={{
                    width:  i < dIdx ? "20px" : "8px",
                    height: "6px",
                    background: i < dIdx ? diff.color : "rgba(255,255,255,0.1)",
                    boxShadow: i < dIdx ? `0 0 6px ${diff.color}80` : "none",
                  }}
                />
              ))}
            </div>
            <span className="text-xs font-semibold" style={{ color: diff.color }}>
              {diff.label}
            </span>
          </div>
        </div>
      </div>

      {/* Bottom glow line */}
      <div
        className="absolute bottom-0 left-6 right-6 h-px"
        style={{ background: `linear-gradient(90deg, transparent, ${primary}50, transparent)` }}
      />
    </div>
  );
}
