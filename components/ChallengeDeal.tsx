"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { challenges, type Challenge } from "@/lib/challenges";
import {
  IconBan, IconCheck, IconClock,
  IconSpeech, IconWalk, IconFood, IconPhone, IconSocial,
} from "@/components/icons";

const MAX_REROLLS = 3;

/* ─── Tier config — Bạc / Vàng / Prismatic ───────────────── */
type Tier = "silver" | "gold" | "prismatic";

const TIER_MAP: Record<string, Tier> = {
  dễ:  "silver",
  vừa: "gold",
  khó: "prismatic",
};

const TIER_CONFIG = {
  silver: {
    label:        "Bạc",
    labelColor:   "#C0C8D8",
    border:       "rgba(192,200,216,0.55)",
    borderHover:  "rgba(192,200,216,0.9)",
    glow:         "rgba(192,200,216,0.25)",
    topBar:       "linear-gradient(90deg, #8899AA, #C0C8D8, #8899AA)",
    cardBg:       "linear-gradient(170deg, #1a1e24 0%, #0d0f12 100%)",
    cardBgSel:    "linear-gradient(170deg, #252c35 0%, #0d0f12 55%)",
    iconBorder:   "rgba(192,200,216,0.35)",
    iconGlow:     "rgba(192,200,216,0.3)",
    cornerColor:  "rgba(192,200,216,0.4)",
    shimmer:      "rgba(192,200,216,0.15)",
    diffColor:    "#C0C8D8",
    sparkColor:   "#C0C8D8",
    textureClass: "tier-silver",
  },
  gold: {
    label:        "Vàng",
    labelColor:   "#FFD166",
    border:       "rgba(255,183,0,0.55)",
    borderHover:  "rgba(255,209,80,0.9)",
    glow:         "rgba(255,183,0,0.3)",
    topBar:       "linear-gradient(90deg, #B8860B, #FFD700, #FFA500, #FFD700, #B8860B)",
    cardBg:       "linear-gradient(170deg, #1e1a0e 0%, #0d0b06 100%)",
    cardBgSel:    "linear-gradient(170deg, #2a2210 0%, #0d0b06 55%)",
    iconBorder:   "rgba(255,183,0,0.4)",
    iconGlow:     "rgba(255,183,0,0.4)",
    cornerColor:  "rgba(255,209,80,0.55)",
    shimmer:      "rgba(255,209,80,0.2)",
    diffColor:    "#FFD166",
    sparkColor:   "#FFD700",
    textureClass: "tier-gold",
  },
  prismatic: {
    label:        "Tinh Hoa",
    labelColor:   "#E040FB",
    border:       "transparent", // replaced by gradient border
    borderHover:  "transparent",
    glow:         "rgba(160,80,255,0.4)",
    topBar:       "linear-gradient(90deg, #FF4D9D, #A855F7, #38BDF8, #A855F7, #FF4D9D)",
    cardBg:       "linear-gradient(170deg, #1a0e2a 0%, #0a080f 100%)",
    cardBgSel:    "linear-gradient(170deg, #2a1040 0%, #0a080f 55%)",
    iconBorder:   "rgba(168,85,247,0.5)",
    iconGlow:     "rgba(168,85,247,0.6)",
    cornerColor:  "#A855F7",
    shimmer:      "rgba(168,85,247,0.25)",
    diffColor:    "#E040FB",
    sparkColor:   "#A855F7",
    textureClass: "tier-prismatic",
  },
};

/* ─── Helpers ─────────────────────────────────────────────── */
const categoryLabel: Record<string, string> = {
  ngôn_ngữ: "Ngôn Ngữ", di_chuyển: "Di Chuyển",
  ăn_uống: "Ăn Uống", điện_thoại: "Điện Thoại", xã_hội: "Xã Hội",
};

function CategoryIcon({ category, size = 28, color }: { category: string; size?: number; color: string }) {
  const p = { size, color };
  switch (category) {
    case "ngôn_ngữ":   return <IconSpeech {...p} />;
    case "di_chuyển":  return <IconWalk   {...p} />;
    case "ăn_uống":    return <IconFood   {...p} />;
    case "điện_thoại": return <IconPhone  {...p} />;
    case "xã_hội":     return <IconSocial {...p} />;
    default:            return <IconCheck  {...p} />;
  }
}

function IconReroll({ size = 15, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M1 4v6h6M23 20v-6h-6" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4-4.64 4.36A9 9 0 0 1 3.51 15" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ─── Seeding ─────────────────────────────────────────────── */
function makeRng(seed: number) {
  let s = seed;
  return () => { s = (s * 1664525 + 1013904223) & 0xffffffff; return (s >>> 0) / 0x100000000; };
}
function dealThree(exclude: number[], seed: number): Challenge[] {
  const rng = makeRng(seed);
  const pool = challenges.filter((c) => !exclude.includes(c.id));
  return [...pool].sort(() => rng() - 0.5).slice(0, 3);
}
function initialSeed(dateKey: string, userId: string): number {
  let seed = 0;
  for (const c of `${dateKey}-${userId}`) seed = (seed * 31 + c.charCodeAt(0)) & 0xfffffff;
  return seed;
}

/* ─── Corner ornament (LoL-style) ────────────────────────── */
function Corner({ pos, color, tier }: { pos: "tl" | "tr" | "bl" | "br"; color: string; tier: Tier }) {
  const style: React.CSSProperties = { position: "absolute", width: 12, height: 12 };
  if (pos === "tl") { style.top = 5; style.left = 5; }
  if (pos === "tr") { style.top = 5; style.right = 5; }
  if (pos === "bl") { style.bottom = 5; style.left = 5; }
  if (pos === "br") { style.bottom = 5; style.right = 5; }
  const rotate = { tl: 0, tr: 90, bl: 270, br: 180 }[pos];
  // Prismatic corners are diamond-shaped
  if (tier === "prismatic") {
    return (
      <div style={{ ...style, transform: `rotate(${rotate}deg)` }}>
        <svg width={12} height={12} viewBox="0 0 12 12" aria-hidden>
          <path d="M0 12 L0 0 L12 0" stroke={color} strokeWidth="1.5" fill="none" strokeLinecap="square" />
          <circle cx="0" cy="0" r="2" fill={color} opacity="0.8" />
        </svg>
      </div>
    );
  }
  return (
    <svg width={12} height={12} viewBox="0 0 12 12" style={{ ...style, transform: `rotate(${rotate}deg)` }} aria-hidden>
      <path d="M0 12 L0 0 L12 0" stroke={color} strokeWidth="1.5" fill="none" strokeLinecap="square" />
    </svg>
  );
}

/* ─── Spark burst ─────────────────────────────────────────── */
function SparkBurst({ tier }: { tier: Tier }) {
  const cfg = TIER_CONFIG[tier];
  const colors = tier === "prismatic"
    ? ["#FF4D9D", "#A855F7", "#38BDF8", "#E040FB", "#FF4D9D", "#A855F7", "#38BDF8", "#ffffff"]
    : [cfg.sparkColor, cfg.labelColor, "#ffffff", cfg.sparkColor, cfg.labelColor, "#ffffff", cfg.sparkColor, cfg.labelColor];

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-[14px]" aria-hidden>
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i / 12) * 360;
        const color = colors[i % colors.length];
        return (
          <div key={i} className="absolute" style={{
            left: "50%", top: "50%",
            width: i % 3 === 0 ? 5 : 3, height: i % 3 === 0 ? 5 : 3,
            borderRadius: "50%", background: color,
            transform: `translate(-50%,-50%) rotate(${angle}deg) translateY(0px)`,
            animation: `sparkFly 0.6s ease-out ${i * 0.025}s both`,
            boxShadow: `0 0 8px ${color}`,
          }} />
        );
      })}
    </div>
  );
}

/* ─── Click ripple ────────────────────────────────────────── */
interface RipplePoint { x: number; y: number; id: number }
function ClickRipple({ x, y, tier }: { x: number; y: number; tier: Tier }) {
  const cfg = TIER_CONFIG[tier];
  const color = tier === "prismatic" ? "#A855F7" : cfg.labelColor;
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-[14px]" aria-hidden>
      {/* Inner fast ripple */}
      <div style={{
        position: "absolute",
        left: x, top: y,
        width: 8, height: 8,
        borderRadius: "50%",
        background: color,
        transform: "translate(-50%,-50%) scale(0)",
        animation: "rippleInner 0.45s ease-out forwards",
        opacity: 0.9,
      }} />
      {/* Outer slow ring */}
      <div style={{
        position: "absolute",
        left: x, top: y,
        width: 8, height: 8,
        borderRadius: "50%",
        border: `2px solid ${color}`,
        transform: "translate(-50%,-50%) scale(0)",
        animation: "rippleOuter 0.7s ease-out forwards",
      }} />
      {/* Second outer ring (delayed) */}
      <div style={{
        position: "absolute",
        left: x, top: y,
        width: 8, height: 8,
        borderRadius: "50%",
        border: `1px solid ${color}80`,
        transform: "translate(-50%,-50%) scale(0)",
        animation: "rippleOuter 0.9s ease-out 0.08s forwards",
      }} />
    </div>
  );
}

/* ─── Sunburst beam rays ──────────────────────────────────── */
function SunburstRays({ tier }: { tier: Tier }) {
  const cfg = TIER_CONFIG[tier];
  const rayCount = tier === "prismatic" ? 16 : tier === "gold" ? 12 : 8;
  const rayColors = tier === "prismatic"
    ? ["#FF4D9D", "#A855F7", "#38BDF8", "#E040FB", "#A855F7", "#FF4D9D", "#38BDF8", "#ffffff",
       "#FF4D9D", "#A855F7", "#38BDF8", "#E040FB", "#A855F7", "#FF4D9D", "#38BDF8", "#ffffff"]
    : Array(rayCount).fill(cfg.labelColor);

  return (
    <div
      className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden rounded-[14px]"
      aria-hidden
    >
      {Array.from({ length: rayCount }).map((_, i) => {
        const angle = (i / rayCount) * 360;
        const len   = tier === "prismatic" ? 120 : tier === "gold" ? 100 : 80;
        const width = tier === "prismatic" ? (i % 2 === 0 ? 2 : 1) : (i % 2 === 0 ? 1.5 : 1);
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              width: width,
              height: len,
              background: `linear-gradient(to top, ${rayColors[i]}, transparent)`,
              transformOrigin: "50% 100%",
              transform: `rotate(${angle}deg) translateY(-50%)`,
              animation: `rayShoot 0.6s ease-out ${i * 0.012}s both`,
              opacity: 0,
              borderRadius: 2,
            }}
          />
        );
      })}
    </div>
  );
}

/* ─── Screen flash overlay ────────────────────────────────── */
function ScreenFlash({ tier, active }: { tier: Tier; active: boolean }) {
  if (!active) return null;
  const color = tier === "prismatic"
    ? "rgba(168,85,247,0.18)"
    : tier === "gold"
    ? "rgba(255,183,0,0.14)"
    : "rgba(192,200,216,0.1)";
  return (
    <div
      aria-hidden
      style={{
        position: "fixed", inset: 0, zIndex: 100,
        background: color,
        pointerEvents: "none",
        animation: "screenFlash 0.5s ease-out forwards",
      }}
    />
  );
}

/* ─── Tier label badge ────────────────────────────────────── */
function TierBadge({ tier }: { tier: Tier }) {
  const cfg = TIER_CONFIG[tier];
  if (tier === "silver") {
    return (
      <div style={{
        display: "inline-flex", alignItems: "center", gap: 4,
        padding: "2px 8px", borderRadius: 4,
        background: "linear-gradient(135deg, rgba(192,200,216,0.12), rgba(192,200,216,0.06))",
        border: "1px solid rgba(192,200,216,0.3)",
        fontSize: "0.58rem", fontWeight: 800, letterSpacing: "0.1em",
        color: cfg.labelColor, textTransform: "uppercase" as const,
      }}>
        ◆ {cfg.label}
      </div>
    );
  }
  if (tier === "gold") {
    return (
      <div style={{
        display: "inline-flex", alignItems: "center", gap: 4,
        padding: "2px 8px", borderRadius: 4,
        background: "linear-gradient(135deg, rgba(255,183,0,0.18), rgba(255,140,0,0.08))",
        border: "1px solid rgba(255,209,80,0.4)",
        fontSize: "0.58rem", fontWeight: 800, letterSpacing: "0.1em",
        color: cfg.labelColor, textTransform: "uppercase" as const,
        boxShadow: "0 1px 8px rgba(255,183,0,0.2)",
      }}>
        ✦ {cfg.label}
      </div>
    );
  }
  // Prismatic
  return (
    <div
      className="tier-prismatic-badge"
      style={{
        display: "inline-flex", alignItems: "center", gap: 4,
        padding: "2px 9px", borderRadius: 4,
        fontSize: "0.58rem", fontWeight: 800, letterSpacing: "0.1em",
        textTransform: "uppercase" as const,
        background: "linear-gradient(135deg, rgba(168,85,247,0.2), rgba(56,189,248,0.1))",
        border: "1px solid rgba(168,85,247,0.5)",
        color: "transparent",
        backgroundClip: "text" as const,
        WebkitBackgroundClip: "text" as const,
        WebkitTextFillColor: "transparent",
        backgroundImage: "linear-gradient(90deg, #FF4D9D, #A855F7, #38BDF8, #A855F7, #FF4D9D)",
        backgroundSize: "200% auto",
        animation: "prismaticText 2s linear infinite",
      }}
    >
      ✦ {cfg.label}
    </div>
  );
}

/* ─── Single LoL augment card ─────────────────────────────── */
function LolCard({
  challenge, index, selected, locked, rerolling,
  onSelect, onReroll, rerollsLeft,
}: {
  challenge: Challenge; index: number; selected: boolean;
  locked: boolean; rerolling: boolean;
  onSelect: () => void; onReroll: () => void; rerollsLeft: number;
}) {
  const isCAM   = challenge.type === "CAM";
  const primary = isCAM ? "#FF4D4D" : "#00C896";
  const tier    = TIER_MAP[challenge.difficulty] ?? "silver";
  const cfg     = TIER_CONFIG[tier];

  const [dealIn, setDealIn]       = useState(false);
  const [showSpark, setShowSpark] = useState(false);
  const [showRays, setShowRays]   = useState(false);
  const [ripple, setRipple]       = useState<RipplePoint | null>(null);
  const rippleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const raysTimer   = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const t = setTimeout(() => setDealIn(true), index * 130 + 60);
    return () => clearTimeout(t);
  }, [index]);

  useEffect(() => {
    if (selected) {
      setShowSpark(true);
      setShowRays(true);
      const t1 = setTimeout(() => setShowSpark(false), 700);
      const t2 = setTimeout(() => setShowRays(false), 650);
      return () => { clearTimeout(t1); clearTimeout(t2); };
    }
  }, [selected]);

  const [rerollRipple, setRerollRipple] = useState<RipplePoint | null>(null);
  const rerollRippleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  function handleRerollClick(e: React.MouseEvent<HTMLButtonElement>) {
    if (locked || rerolling || rerollsLeft === 0) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    if (rerollRippleTimer.current) clearTimeout(rerollRippleTimer.current);
    setRerollRipple({ x, y, id: Date.now() });
    rerollRippleTimer.current = setTimeout(() => setRerollRipple(null), 800);
    onReroll();
  }

  function handleClick(e: React.MouseEvent<HTMLDivElement>) {
    if (locked || rerolling) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    if (rippleTimer.current) clearTimeout(rippleTimer.current);
    setRipple({ x, y, id: Date.now() });
    rippleTimer.current = setTimeout(() => setRipple(null), 800);
    onSelect();
  }

  const tiltDeg    = [-2.8, 0, 2.8][index] ?? 0;
  const wobbleDelay = [0, 0.95, 1.8][index] ?? 0;

  const cardTransform = (() => {
    if (!dealIn)   return `translateY(-70px) rotate(${tiltDeg - 10}deg) scale(0.82)`;
    if (rerolling) return "scale(0.86) rotateY(90deg)";
    if (selected)  return `scale(1.07) translateY(-8px) rotate(${tiltDeg * 0.2}deg)`;
    return "none";
  })();

  const animClass = (!dealIn || rerolling || selected || locked)
    ? "deal-card-locked"
    : "deal-card-idle";

  // Border: prismatic uses pseudo via box-shadow layering, others use border
  const borderStyle = tier === "prismatic"
    ? (selected
        ? { border: "2px solid transparent", backgroundClip: "padding-box" }
        : { border: "1.5px solid rgba(168,85,247,0.4)" })
    : (selected
        ? { border: `2px solid ${cfg.borderHover}` }
        : { border: `1.5px solid ${cfg.border}` });

  const boxShadowStyle = (() => {
    if (tier === "prismatic" && selected) {
      return `0 0 0 1px rgba(168,85,247,0.4), 0 0 50px rgba(168,85,247,0.4), 0 0 25px rgba(56,189,248,0.3), 0 24px 56px rgba(0,0,0,0.9)`;
    }
    if (selected) {
      return `0 0 0 1px ${cfg.glow}, 0 0 40px ${cfg.glow}, 0 24px 56px rgba(0,0,0,0.85), inset 0 1px 0 ${cfg.shimmer}`;
    }
    if (tier === "prismatic") {
      return `0 0 20px rgba(168,85,247,0.15), 0 6px 24px rgba(0,0,0,0.7), inset 0 1px 0 rgba(168,85,247,0.1)`;
    }
    if (tier === "gold") {
      return `0 0 16px rgba(255,183,0,0.12), 0 6px 24px rgba(0,0,0,0.65), inset 0 1px 0 rgba(255,209,80,0.08)`;
    }
    return "0 6px 24px rgba(0,0,0,0.65), inset 0 1px 0 rgba(255,255,255,0.04)";
  })();

  return (
    <div className="flex flex-col items-center gap-2" style={{ minWidth: 0 }}>

      {/* ── Card ── */}
      <div
        onClick={!locked && !rerolling ? handleClick : undefined}
        className={`relative w-full ${animClass}`}
        style={{
          cursor: locked || rerolling ? "default" : "pointer",
          borderRadius: 14,
          background: selected ? cfg.cardBgSel : cfg.cardBg,
          ...borderStyle,
          boxShadow: boxShadowStyle,
          "--tilt": `${tiltDeg}deg`,
          "--wobble-delay": `${wobbleDelay}s`,
          ...((!dealIn || rerolling || selected) && {
            animation: "none",
            transform: cardTransform,
            opacity: !dealIn || rerolling ? 0 : 1,
            transition: rerolling
              ? "transform 180ms ease-in, opacity 180ms ease-in"
              : dealIn
              ? "transform 320ms cubic-bezier(0.34,1.56,0.64,1), opacity 280ms ease"
              : "none",
          }),
        } as React.CSSProperties}
      >
        {/* ── Tier top bar ── */}
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: 3,
          background: cfg.topBar, borderRadius: "14px 14px 0 0",
          boxShadow: `0 0 12px ${cfg.glow}`,
          ...(tier === "prismatic" && { animation: "prismaticBar 2.5s linear infinite", backgroundSize: "200% auto" }),
        }} />

        {/* ── Prismatic rainbow border glow (overlay trick) ── */}
        {tier === "prismatic" && (
          <div style={{
            position: "absolute", inset: -1, borderRadius: 15,
            background: "linear-gradient(135deg, #FF4D9D40, #A855F740, #38BDF840, #A855F740, #FF4D9D40)",
            backgroundSize: "300% 300%",
            animation: "prismaticBorder 3s linear infinite",
            pointerEvents: "none", zIndex: 0,
            mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            maskComposite: "exclude",
            WebkitMaskComposite: "xor",
            padding: 1.5,
          }} />
        )}

        {/* ── Shimmer sweep (prismatic & gold only) ── */}
        {(tier === "prismatic" || tier === "gold") && (
          <div style={{
            position: "absolute", inset: 0, borderRadius: 13, pointerEvents: "none",
            background: tier === "prismatic"
              ? "linear-gradient(105deg, transparent 30%, rgba(168,85,247,0.08) 50%, transparent 70%)"
              : "linear-gradient(105deg, transparent 30%, rgba(255,209,80,0.07) 50%, transparent 70%)",
            backgroundSize: "200% 100%",
            animation: "shimmerSweep 3s ease-in-out infinite",
          }} />
        )}

        {/* ── Ambient glow when selected ── */}
        {selected && (
          <div style={{
            position: "absolute", inset: 0, borderRadius: 13, pointerEvents: "none",
            background: tier === "prismatic"
              ? "radial-gradient(ellipse at 50% 0%, rgba(168,85,247,0.22) 0%, transparent 65%)"
              : `radial-gradient(ellipse at 50% 0%, ${cfg.glow} 0%, transparent 65%)`,
          }} />
        )}

        {/* ── Corners ── */}
        <Corner pos="tl" color={cfg.cornerColor} tier={tier} />
        <Corner pos="tr" color={cfg.cornerColor} tier={tier} />
        <Corner pos="bl" color={cfg.cornerColor} tier={tier} />
        <Corner pos="br" color={cfg.cornerColor} tier={tier} />

        {/* Spark */}
        {showSpark && <SparkBurst tier={tier} />}
        {/* Sunburst rays on select */}
        {showRays && <SunburstRays tier={tier} />}
        {/* Click ripple */}
        {ripple && <ClickRipple key={ripple.id} x={ripple.x} y={ripple.y} tier={tier} />}

        {/* ── Content — LoL augment layout ── */}
        <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", alignItems: "center" }}>

          {/* ── Icon area — chiếm ~45% trên, nền tối texture ── */}
          <div style={{
            width: "100%",
            paddingTop: "72%",
            position: "relative",
            background: tier === "prismatic"
              ? "radial-gradient(ellipse at 50% 70%, rgba(168,85,247,0.22) 0%, rgba(5,3,12,0.9) 55%)"
              : tier === "gold"
              ? "radial-gradient(ellipse at 50% 70%, rgba(255,183,0,0.18) 0%, rgba(8,5,2,0.9) 55%)"
              : "radial-gradient(ellipse at 50% 70%, rgba(192,200,216,0.12) 0%, rgba(5,5,8,0.9) 55%)",
            borderBottom: `1px solid ${cfg.cornerColor}18`,
          }}>
            {/* Vignette overlay */}
            <div style={{
              position: "absolute", inset: 0,
              background: "radial-gradient(ellipse at 50% 45%, transparent 25%, rgba(0,0,0,0.55) 100%)",
              pointerEvents: "none",
            }} />

            {/* Icon centered */}
            <div style={{
              position: "absolute", inset: 0,
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <div style={{ position: "relative" }}>
                {/* Spinning ring when selected */}
                <div style={{
                  position: "absolute", inset: -12, borderRadius: "50%",
                  border: `1px solid ${cfg.cornerColor}20`,
                  ...(selected && { animation: "spin-slow 5s linear infinite" }),
                }} />
                {tier === "prismatic" && (
                  <div style={{
                    position: "absolute", inset: -7, borderRadius: "50%",
                    border: "1px dashed rgba(168,85,247,0.3)",
                    animation: "spin-slow 7s linear infinite reverse",
                  }} />
                )}
                {/* Icon */}
                <div style={{
                  width: 60, height: 60,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  filter: selected
                    ? `drop-shadow(0 0 16px ${tier === "prismatic" ? "#A855F7" : cfg.labelColor}) drop-shadow(0 0 32px ${cfg.glow})`
                    : `drop-shadow(0 0 8px ${cfg.glow})`,
                  transition: "filter 0.3s",
                }}>
                  <CategoryIcon
                    category={challenge.category}
                    size={48}
                    color={tier === "prismatic" ? "#C084FC" : cfg.labelColor}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* ── Text area ── */}
          <div style={{
            width: "100%", padding: "12px 10px 14px",
            display: "flex", flexDirection: "column", alignItems: "center", gap: 7,
          }}>
            {/* Title — to, trắng sáng */}
            <p style={{
              textAlign: "center",
              color: "#ffffff",
              fontWeight: 800,
              fontSize: "0.88rem",
              lineHeight: 1.25,
              letterSpacing: "-0.02em",
              margin: 0,
            }}>
              {challenge.title}
            </p>

            {/* Tier badge */}
            <TierBadge tier={tier} />

            {/* Divider */}
            <div style={{
              width: "75%", height: 1,
              background: tier === "prismatic"
                ? "linear-gradient(90deg, transparent, rgba(168,85,247,0.6), rgba(56,189,248,0.6), transparent)"
                : `linear-gradient(90deg, transparent, ${cfg.cornerColor}50, transparent)`,
            }} />

            {/* Desc — nhỏ, mờ, nhiều dòng */}
            <p style={{
              textAlign: "center",
              color: "rgba(255,255,255,0.45)",
              fontSize: "0.65rem",
              lineHeight: 1.5,
              letterSpacing: "0.005em",
              margin: 0,
            }}>
              {challenge.content}
            </p>

            {/* Footer — type + duration */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, marginTop: 2 }}>
              <div style={{
                display: "inline-flex", alignItems: "center", gap: 3,
                padding: "1px 6px", borderRadius: 999,
                background: `${primary}18`, border: `1px solid ${primary}30`,
                fontSize: "0.52rem", fontWeight: 700, letterSpacing: "0.1em",
                color: primary, textTransform: "uppercase" as const,
              }}>
                {isCAM
                  ? <IconBan  size={7} color={primary} strokeWidth={2.5} />
                  : <IconCheck size={7} color={primary} strokeWidth={2.5} />
                }
                {isCAM ? "CẤM" : "PHẢI"}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 3, color: "rgba(255,255,255,0.25)" }}>
                <IconClock size={9} color="rgba(255,255,255,0.25)" strokeWidth={1.5} />
                <span style={{ fontSize: "0.55rem" }}>{challenge.duration}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Selected checkmark */}
        {selected && (
          <div className="animate-scale-in" style={{
            position: "absolute", top: 7, right: 7,
            width: 20, height: 20, borderRadius: "50%",
            background: tier === "prismatic"
              ? "linear-gradient(135deg, #A855F7, #38BDF8)"
              : cfg.labelColor,
            boxShadow: `0 0 14px ${cfg.iconGlow}`,
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <IconCheck size={12} color="#080808" strokeWidth={3} />
          </div>
        )}
      </div>{/* end card */}

      {/* ── Reroll button ── */}
      <button
        onClick={handleRerollClick}
        disabled={locked || rerolling || rerollsLeft === 0}
        style={{
          position: "relative",
          overflow: "hidden",
          width: "100%", padding: "7px 0", borderRadius: 10,
          display: "flex", alignItems: "center", justifyContent: "center", gap: 5,
          fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.04em",
          cursor: locked || rerollsLeft === 0 ? "not-allowed" : "pointer",
          background: !locked && rerollsLeft > 0 ? "rgba(255,183,0,0.10)" : "rgba(255,255,255,0.03)",
          border: !locked && rerollsLeft > 0 ? "1px solid rgba(255,183,0,0.30)" : "1px solid rgba(255,255,255,0.06)",
          color: !locked && rerollsLeft > 0 ? "#FFB800" : "rgba(255,255,255,0.18)",
          transition: "all 0.2s",
        }}
      >
        {/* Ripple on reroll */}
        {rerollRipple && (
          <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden", borderRadius: 10 }}>
            <div style={{
              position: "absolute",
              left: rerollRipple.x, top: rerollRipple.y,
              width: 6, height: 6, borderRadius: "50%",
              background: "#FFB800",
              transform: "translate(-50%,-50%) scale(0)",
              animation: "rippleInner 0.5s ease-out forwards",
              opacity: 0.8,
            }} />
            <div style={{
              position: "absolute",
              left: rerollRipple.x, top: rerollRipple.y,
              width: 6, height: 6, borderRadius: "50%",
              border: "1.5px solid #FFB800",
              transform: "translate(-50%,-50%) scale(0)",
              animation: "rippleOuter 0.7s ease-out forwards",
            }} />
            <div style={{
              position: "absolute",
              left: rerollRipple.x, top: rerollRipple.y,
              width: 6, height: 6, borderRadius: "50%",
              border: "1px solid rgba(255,183,0,0.5)",
              transform: "translate(-50%,-50%) scale(0)",
              animation: "rippleOuter 0.85s ease-out 0.07s forwards",
            }} />
          </div>
        )}

        {/* Mini rays burst on reroll */}
        {rerollRipple && (
          <div style={{ position: "absolute", inset: 0, pointerEvents: "none", display: "flex", alignItems: "center", justifyContent: "center" }}>
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} style={{
                position: "absolute",
                width: 1.5, height: 24,
                background: "linear-gradient(to top, #FFB800, transparent)",
                transformOrigin: "50% 100%",
                transform: `rotate(${(i / 8) * 360}deg) translateY(-50%)`,
                animation: `rayShoot 0.5s ease-out ${i * 0.015}s both`,
                opacity: 0,
                borderRadius: 2,
              }} />
            ))}
          </div>
        )}

        <span style={{ position: "relative", zIndex: 1, display: "inline-block", transition: "transform 0.4s", transform: rerolling ? "rotate(360deg)" : "rotate(0deg)" }}>
          <IconReroll size={12} color={!locked && rerollsLeft > 0 ? "#FFB800" : "rgba(255,255,255,0.18)"} />
        </span>
        <span style={{ position: "relative", zIndex: 1 }}>Đổi</span>
      </button>
    </div>
  );
}

/* ─── ChallengeDeal ───────────────────────────────────────── */
interface ChallengeDealProps {
  dateKey: string;
  userId: string;
  onSelect: (challenge: Challenge) => void;
}

export default function ChallengeDeal({ dateKey, userId, onSelect }: ChallengeDealProps) {
  const baseSeed = useRef(initialSeed(dateKey, userId)).current;
  const [cards, setCards]               = useState<Challenge[]>(() => dealThree([], baseSeed));
  const [chosen, setChosen]             = useState<number | null>(null);
  const [confirmed, setConfirmed]       = useState(false);
  const [rerollsLeft, setRerollsLeft]   = useState(MAX_REROLLS);
  const [rerollingIdx, setRerollingIdx] = useState<number | null>(null);
  const [flashTier, setFlashTier]       = useState<Tier | null>(null);
  const excludedRef                     = useRef<number[]>([]);

  const handleReroll = useCallback((cardIndex: number) => {
    if (rerollsLeft <= 0 || confirmed || rerollingIdx !== null) return;
    // Flash vàng khi reroll
    setFlashTier("gold");
    setTimeout(() => setFlashTier(null), 500);
    excludedRef.current = [...excludedRef.current, cards[cardIndex].id];
    setRerollingIdx(cardIndex);
    setRerollsLeft((r) => r - 1);
    if (chosen === cardIndex) setChosen(null);
    setTimeout(() => {
      const newSeed   = baseSeed + excludedRef.current.length * 999983;
      const pool      = dealThree(excludedRef.current, newSeed);
      const replacement = pool[0];
      if (!replacement) { setRerollingIdx(null); return; }
      excludedRef.current = [...excludedRef.current, replacement.id];
      setCards((prev) => { const next = [...prev]; next[cardIndex] = replacement; return next; });
      setRerollingIdx(null);
    }, 220);
  }, [rerollsLeft, confirmed, cards, baseSeed, chosen, rerollingIdx]);

  function handleConfirm() {
    if (chosen === null || confirmed) return;
    setConfirmed(true);
    setTimeout(() => onSelect(cards[chosen]), 350);
  }

  const selectedChallenge = chosen !== null ? cards[chosen] : null;
  const isCAM   = selectedChallenge?.type === "CAM";
  const primary = isCAM ? "#FF4D4D" : "#00C896";

  return (
    <>
      {/* Screen flash */}
      <ScreenFlash tier={flashTier ?? "silver"} active={flashTier !== null} />

      <style>{`
        /* ── Spark ── */
        @keyframes sparkFly {
          0%   { transform: translate(-50%,-50%) rotate(var(--a,0deg)) translateY(0px); opacity: 1; }
          100% { transform: translate(-50%,-50%) rotate(var(--a,0deg)) translateY(32px); opacity: 0; }
        }

        /* ── Click ripple ── */
        @keyframes rippleInner {
          0%   { transform: translate(-50%,-50%) scale(0); opacity: 0.9; }
          60%  { transform: translate(-50%,-50%) scale(18); opacity: 0.3; }
          100% { transform: translate(-50%,-50%) scale(28); opacity: 0; }
        }
        @keyframes rippleOuter {
          0%   { transform: translate(-50%,-50%) scale(0); opacity: 0.8; }
          100% { transform: translate(-50%,-50%) scale(32); opacity: 0; }
        }

        /* ── Sunburst rays ── */
        @keyframes rayShoot {
          0%   { opacity: 0; transform: rotate(var(--rot)) translateY(-50%) scaleY(0); }
          20%  { opacity: 1; }
          60%  { opacity: 0.6; transform: rotate(var(--rot)) translateY(-50%) scaleY(1); }
          100% { opacity: 0; transform: rotate(var(--rot)) translateY(-50%) scaleY(1.3); }
        }

        /* ── Screen flash ── */
        @keyframes screenFlash {
          0%   { opacity: 1; }
          30%  { opacity: 0.8; }
          100% { opacity: 0; }
        }

        /* ── Gift wobble (idle) — cực nhẹ ── */
        @keyframes giftWobble {
          0%,80%,100% { transform: rotate(var(--tilt)); }
          85%  { transform: rotate(calc(var(--tilt) + 0.8deg)) translateY(-0.5px); }
          90%  { transform: rotate(calc(var(--tilt) - 0.6deg)); }
          95%  { transform: rotate(calc(var(--tilt) + 0.4deg)); }
        }
        /* ── Gift shake (hover) — nhẹ nhàng ── */
        @keyframes giftShake {
          0%,100% { transform: rotate(var(--tilt)) scale(1.01); }
          20%  { transform: rotate(calc(var(--tilt) + 1.5deg)) translateY(-1px) scale(1.015); }
          40%  { transform: rotate(calc(var(--tilt) - 1.2deg)) scale(1.015); }
          60%  { transform: rotate(calc(var(--tilt) + 0.8deg)) translateY(-0.5px) scale(1.01); }
          80%  { transform: rotate(calc(var(--tilt) - 0.5deg)) scale(1.01); }
        }

        .deal-card-idle {
          animation: giftWobble 4s ease-in-out var(--wobble-delay, 0s) infinite;
        }
        .deal-card-idle:hover {
          animation: giftShake 0.7s ease-in-out infinite !important;
        }
        .deal-card-locked { animation: none !important; }

        /* ── Prismatic effects ── */
        @keyframes prismaticBar {
          0%   { background-position: 0% center; }
          100% { background-position: 200% center; }
        }
        @keyframes prismaticBorder {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes prismaticText {
          0%   { background-position: 0% center; }
          100% { background-position: 200% center; }
        }
        @keyframes shimmerSweep {
          0%,100% { background-position: -100% center; }
          50%     { background-position: 200% center; }
        }

        /* ── Gold shimmer pulse ── */
        @keyframes goldPulse {
          0%,100% { opacity: 0.6; }
          50%     { opacity: 1; }
        }
      `}</style>

      <div className="flex flex-col gap-5 w-full animate-fade-up">

        {/* Header */}
        <div className="text-center">
          <p style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.14em", color: "rgba(255,255,255,0.3)", textTransform: "uppercase", marginBottom: 6 }}>
            Thử thách hôm nay của bạn
          </p>
          <h2 style={{ fontSize: "1.5rem", fontWeight: 800, color: "#fff", letterSpacing: "-0.03em", lineHeight: 1.1 }}>
            Chọn 1 trong 3
          </h2>
          <p style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.4)", marginTop: 4 }}>
            Hệ thống đã deal riêng cho bạn hôm nay
          </p>
        </div>

        {/* Reroll counter */}
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            padding: "6px 16px", borderRadius: 999,
            background: "rgba(255,183,0,0.08)", border: "1px solid rgba(255,183,0,0.2)",
          }}>
            <IconReroll size={13} color={rerollsLeft > 0 ? "#FFB800" : "rgba(255,255,255,0.2)"} />
            <span style={{ fontSize: "0.72rem", fontWeight: 700, color: rerollsLeft > 0 ? "#FFB800" : "rgba(255,255,255,0.25)" }}>
              {rerollsLeft}/{MAX_REROLLS} lượt đổi
            </span>
            <div style={{ display: "flex", gap: 4 }}>
              {Array.from({ length: MAX_REROLLS }).map((_, i) => (
                <div key={i} style={{
                  width: 7, height: 7, borderRadius: "50%",
                  background: i < rerollsLeft ? "#FFB800" : "rgba(255,255,255,0.1)",
                  boxShadow: i < rerollsLeft ? "0 0 6px #FFB800" : "none",
                  transition: "all 0.3s",
                }} />
              ))}
            </div>
          </div>
        </div>

        {/* Tier legend */}
        <div style={{ display: "flex", justifyContent: "center", gap: 12 }}>
          {(["silver", "gold", "prismatic"] as Tier[]).map((t) => {
            const c = TIER_CONFIG[t];
            return (
              <div key={t} style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <div style={{
                  width: 6, height: 6, borderRadius: "50%",
                  background: t === "prismatic" ? "linear-gradient(135deg, #FF4D9D, #A855F7, #38BDF8)" : c.labelColor,
                  boxShadow: `0 0 6px ${c.glow}`,
                }} />
                <span style={{ fontSize: "0.6rem", color: c.labelColor, fontWeight: 600 }}>{c.label}</span>
              </div>
            );
          })}
        </div>

        {/* 3 cards */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: 10,
          alignItems: "start",
        }}>
          {cards.map((challenge, i) => (
            <LolCard
              key={`${challenge.id}-${i}-${rerollsLeft}`}
              challenge={challenge}
              index={i}
              selected={chosen === i}
              locked={confirmed}
              rerolling={rerollingIdx === i}
              onSelect={() => {
                if (!confirmed) {
                  const tier = TIER_MAP[cards[i].difficulty] ?? "silver";
                  setFlashTier(tier);
                  setTimeout(() => setFlashTier(null), 500);
                  setChosen(i);
                }
              }}
              onReroll={() => handleReroll(i)}
              rerollsLeft={rerollsLeft}
            />
          ))}
        </div>

        {/* CTA */}
        <div style={{
          opacity: chosen !== null ? 1 : 0.35,
          pointerEvents: chosen !== null && !confirmed ? "auto" : "none",
          transform: chosen !== null ? "translateY(0)" : "translateY(6px)",
          transition: "all 0.35s cubic-bezier(0.16,1,0.3,1)",
        }}>
          <button
            onClick={handleConfirm}
            disabled={chosen === null || confirmed}
            className="relative w-full overflow-hidden group"
            style={{
              padding: "14px 0", borderRadius: 16,
              fontWeight: 700, fontSize: "0.95rem", border: "none",
              background: chosen !== null
                ? `linear-gradient(135deg, ${primary} 0%, ${primary}CC 100%)`
                : "rgba(255,255,255,0.07)",
              color: chosen !== null ? (isCAM ? "#fff" : "#080808") : "rgba(255,255,255,0.3)",
              boxShadow: chosen !== null ? `0 8px 32px ${primary}40, inset 0 1px 0 rgba(255,255,255,0.18)` : "none",
              transition: "all 0.3s cubic-bezier(0.16,1,0.3,1)",
              cursor: chosen !== null ? "pointer" : "default",
            }}
          >
            <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{ background: "linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.22) 50%, transparent 65%)" }}
            />
            <span style={{ position: "relative" }}>
              {confirmed ? "Đang xử lý..." : chosen !== null ? "Chấp nhận thử thách này" : "Chọn một thử thách"}
            </span>
          </button>
        </div>

        <p style={{ textAlign: "center", fontSize: "0.68rem", color: "rgba(255,255,255,0.14)" }}>
          Mỗi ngày chỉ chọn được 1 lần · Thử thách đổi lúc 00:00
        </p>
      </div>
    </>
  );
}
