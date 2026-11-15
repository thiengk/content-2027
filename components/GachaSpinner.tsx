"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";

/* ─── Prize data ─────────────────────────────────────────── */
export interface Prize {
  id: string;
  label: string;
  sublabel?: string;
  color: string;
  rarity: "common" | "rare" | "epic";
  image?: string;
}

export const PRIZES: Prize[] = [
  {
    id: "sting",
    label: "1 lon Sting",
    sublabel: "Nạp năng lượng thôi!",
    color: "#FFB800",
    rarity: "common",
    image: "/images/prizes/sting.png",
  },
  {
    id: "trasua",
    label: "1 cốc trà sữa",
    sublabel: "Size vừa, topping tuỳ chọn",
    color: "#FF6B9D",
    rarity: "rare",
    image: "/images/prizes/trasua.png",
  },
  {
    id: "caphe",
    label: "1 ly cà phê",
    sublabel: "Đen đá hay sữa đá?",
    color: "#8B6914",
    rarity: "common",
    image: "/images/prizes/caphe.png",
  },
  {
    id: "50k",
    label: "50.000đ",
    sublabel: "Tiền mặt, xài gì cũng được",
    color: "#00C896",
    rarity: "epic",
    image: "/images/prizes/50k.png",
  },
  {
    id: "xoi",
    label: "1 bịch xôi",
    sublabel: "No bụng cả buổi sáng",
    color: "#FF8C42",
    rarity: "common",
    image: "/images/prizes/xoi.png",
  },
  {
    id: "banh",
    label: "1 ổ bánh mì",
    sublabel: "Bánh mì Việt Nam số 1",
    color: "#E8A87C",
    rarity: "common",
    image: "/images/prizes/banhmi.png",
  },
  {
    id: "nothing",
    label: "Chúc may mắn lần sau",
    sublabel: "Thử thách là phần thưởng rồi!",
    color: "rgba(255,255,255,0.3)",
    rarity: "common",
    image: undefined,
  },
];

const WEIGHTS = [15, 20, 15, 5, 15, 15, 15];

function pickPrize(): Prize {
  const rand = Math.random() * 100;
  let cumulative = 0;
  for (let i = 0; i < PRIZES.length; i++) {
    cumulative += WEIGHTS[i];
    if (rand <= cumulative) return PRIZES[i];
  }
  return PRIZES[0];
}

/* ─── Confetti particle ──────────────────────────────────── */
interface Particle {
  id: number;
  x: number;       // % from left
  color: string;
  size: number;
  delay: number;
  duration: number;
  shape: "circle" | "rect" | "diamond";
  rotation: number;
}

function generateParticles(accentColor: string): Particle[] {
  const palette = [
    accentColor,
    "#FF4D4D", "#00C896", "#FFB800", "#FF6B9D",
    "#ffffff", "#a78bfa", "#38bdf8",
  ];
  return Array.from({ length: 32 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    color: palette[Math.floor(Math.random() * palette.length)],
    size: Math.random() * 8 + 5,
    delay: Math.random() * 0.5,
    duration: Math.random() * 1.2 + 1.0,
    shape: (["circle", "rect", "diamond"] as const)[Math.floor(Math.random() * 3)],
    rotation: Math.random() * 360,
  }));
}

function ConfettiParticle({ p }: { p: Particle }) {
  const shapeStyle: React.CSSProperties =
    p.shape === "circle"
      ? { borderRadius: "50%" }
      : p.shape === "diamond"
      ? { borderRadius: "2px", transform: `rotate(45deg)` }
      : { borderRadius: "2px" };

  return (
    <div
      className="absolute top-0 pointer-events-none"
      style={{
        left: `${p.x}%`,
        animation: `confettiFall ${p.duration}s ease-in ${p.delay}s both`,
      }}
    >
      <div
        style={{
          width: p.size,
          height: p.shape === "rect" ? p.size * 0.5 : p.size,
          background: p.color,
          opacity: 0.9,
          ...shapeStyle,
        }}
      />
    </div>
  );
}

/* ─── Celebration Popup ──────────────────────────────────── */
interface CelebrationPopupProps {
  prize: Prize;
  onContinue: () => void;
}

function CelebrationPopup({ prize, onContinue }: CelebrationPopupProps) {
  const particles = useRef(generateParticles(prize.color)).current;

  const rarityConfig = {
    common: { label: "Phần thưởng của bạn",   ring: 1 },
    rare:   { label: "Hiếm! Bạn may mắn đó",  ring: 2 },
    epic:   { label: "Siêu hiếm! Quá đỉnh!",  ring: 3 },
  }[prize.rarity];

  return (
    <>
      {/* Inject confetti keyframe once */}
      <style>{`
        @keyframes confettiFall {
          0%   { transform: translateY(-10px) rotate(0deg);   opacity: 1; }
          80%  { opacity: 1; }
          100% { transform: translateY(380px) rotate(720deg); opacity: 0; }
        }
        @keyframes popIn {
          0%   { transform: scale(0.5) translateY(20px); opacity: 0; }
          70%  { transform: scale(1.06) translateY(-4px); opacity: 1; }
          100% { transform: scale(1) translateY(0);      opacity: 1; }
        }
        @keyframes ringPulse {
          0%, 100% { transform: scale(1);    opacity: 0.5; }
          50%      { transform: scale(1.15); opacity: 0.15; }
        }
        @keyframes shimmerSlide {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }
        @keyframes prizeFloat {
          0%, 100% { transform: translateY(0px) rotate(-2deg); }
          50%      { transform: translateY(-8px) rotate(2deg); }
        }
      `}</style>

      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 flex items-center justify-center px-6"
        style={{ background: "rgba(0,0,0,0.75)", backdropFilter: "blur(8px)" }}
      >
        {/* Confetti layer */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {particles.map((p) => (
            <ConfettiParticle key={p.id} p={p} />
          ))}
        </div>

        {/* Card */}
        <div
          className="relative w-full max-w-xs rounded-3xl overflow-hidden"
          style={{
            background: `linear-gradient(160deg, #1a1a1a 0%, #111111 100%)`,
            border: `1px solid ${prize.color}35`,
            animation: "popIn 0.5s cubic-bezier(0.34,1.56,0.64,1) both",
            boxShadow: `0 0 0 1px ${prize.color}20, 0 32px 64px rgba(0,0,0,0.6), 0 0 80px ${prize.color}25`,
          }}
        >
          {/* Glow rings */}
          {Array.from({ length: rarityConfig.ring }).map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full pointer-events-none"
              style={{
                inset: `-${(i + 1) * 20}px`,
                border: `1px solid ${prize.color}`,
                opacity: 0.08 - i * 0.02,
                animation: `ringPulse ${1.8 + i * 0.4}s ease-in-out ${i * 0.3}s infinite`,
              }}
            />
          ))}

          {/* Top shimmer stripe */}
          <div
            className="absolute top-0 left-0 right-0 h-px"
            style={{
              background: `linear-gradient(90deg, transparent, ${prize.color}80, transparent)`,
              backgroundSize: "200% 100%",
              animation: "shimmerSlide 2s linear infinite",
            }}
          />

          <div className="relative p-8 flex flex-col items-center gap-5">
            {/* Title */}
            <div className="text-center">
              <p
                className="text-xs font-bold tracking-widest uppercase mb-1"
                style={{ color: `${prize.color}99`, letterSpacing: "0.14em" }}
              >
                {rarityConfig.label}
              </p>
              <p
                className="text-2xl font-extrabold text-white"
                style={{ letterSpacing: "-0.03em" }}
              >
                Bạn được tài trợ
              </p>
            </div>

            {/* Prize image */}
            <div
              className="relative"
              style={{
                animation: "prizeFloat 2.5s ease-in-out 0.3s infinite",
                filter: `drop-shadow(0 8px 24px ${prize.color}60)`,
              }}
            >
              {/* Glow disc behind image */}
              <div
                className="absolute inset-0 rounded-full blur-2xl"
                style={{ background: prize.color, opacity: 0.25, transform: "scale(1.4)" }}
              />

              <div
                className="relative rounded-2xl overflow-hidden"
                style={{
                  width: 120,
                  height: 120,
                  background: `${prize.color}15`,
                  border: `2px solid ${prize.color}40`,
                }}
              >
                {prize.image ? (
                  <Image
                    src={prize.image}
                    alt={prize.label}
                    fill
                    className="object-contain p-2"
                  />
                ) : (
                  <div
                    className="w-full h-full flex items-center justify-center text-4xl font-black"
                    style={{ color: prize.color }}
                  >
                    ?
                  </div>
                )}
              </div>
            </div>

            {/* Prize name */}
            <div className="text-center">
              <p
                className="text-2xl font-extrabold"
                style={{ color: prize.color, letterSpacing: "-0.02em" }}
              >
                {prize.label}
              </p>
              {prize.sublabel && (
                <p
                  className="text-sm mt-1"
                  style={{ color: "rgba(255,255,255,0.45)" }}
                >
                  {prize.sublabel}
                </p>
              )}
            </div>

            {/* CTA */}
            <button
              onClick={onContinue}
              className="relative w-full py-4 rounded-2xl font-bold text-base overflow-hidden press group mt-1"
              style={{
                background: `linear-gradient(135deg, ${prize.color}, ${prize.color}CC)`,
                color: prize.rarity === "epic" ? "#080808" : prize.id === "50k" ? "#080808" : "#fff",
                boxShadow: `0 8px 28px ${prize.color}50`,
              }}
            >
              <span
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: "linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.25) 50%, transparent 65%)",
                }}
              />
              <span className="relative">Bắt đầu thử thách</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

/* ─── Single reel item ───────────────────────────────────── */
function ReelItem({ prize, isCenter }: { prize: Prize; isCenter: boolean }) {
  return (
    <div
      className="flex items-center gap-3 px-4 transition-all duration-150"
      style={{ height: "72px", flexShrink: 0 }}
    >
      <div
        className="relative flex-shrink-0 rounded-xl overflow-hidden transition-all duration-300"
        style={{
          width: isCenter ? "48px" : "36px",
          height: isCenter ? "48px" : "36px",
          background: `${prize.color}15`,
          border: isCenter ? `1px solid ${prize.color}40` : "1px solid rgba(255,255,255,0.06)",
          boxShadow: isCenter ? `0 0 12px ${prize.color}40` : "none",
        }}
      >
        {prize.image ? (
          <Image
            src={prize.image}
            alt={prize.label}
            fill
            className="object-contain p-1"
            style={{ opacity: isCenter ? 1 : 0.35 }}
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center text-xs font-bold"
            style={{ color: prize.color, opacity: isCenter ? 0.8 : 0.3 }}
          >
            ?
          </div>
        )}
      </div>

      <div>
        <p
          className="font-bold leading-tight transition-all duration-300"
          style={{
            color: isCenter ? "#ffffff" : "rgba(255,255,255,0.3)",
            fontSize: isCenter ? "0.95rem" : "0.8rem",
          }}
        >
          {prize.label}
        </p>
        {isCenter && prize.sublabel && (
          <p className="text-xs mt-0.5 animate-fade-in" style={{ color: "rgba(255,255,255,0.4)" }}>
            {prize.sublabel}
          </p>
        )}
      </div>
    </div>
  );
}

/* ─── GachaSpinner ───────────────────────────────────────── */
interface GachaSpinnerProps {
  primaryColor: string;
  onComplete: (prize: Prize) => void;
}

export default function GachaSpinner({ primaryColor, onComplete }: GachaSpinnerProps) {
  const ITEM_HEIGHT   = 72;
  const VISIBLE_ITEMS = 5;
  const CENTER_INDEX  = 2;

  const [reelItems, setReelItems]       = useState<Prize[]>([]);
  const [targetPrize, setTargetPrize]   = useState<Prize | null>(null);
  const [phase, setPhase]               = useState<"idle" | "spinning" | "done" | "celebrate">("idle");
  const [translateY, setTranslateY]     = useState(0);
  const [currentCenter, setCurrentCenter] = useState(0);

  const animFrameRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);
  const startYRef    = useRef<number>(0);
  const targetYRef   = useRef<number>(0);

  useEffect(() => {
    const prize  = pickPrize();
    const loops  = 5;
    const prefix = [...Array(CENTER_INDEX)].map((_, i) => PRIZES[i % PRIZES.length]);
    const middle: Prize[] = [];
    for (let i = 0; i < loops * PRIZES.length; i++) {
      middle.push(PRIZES[i % PRIZES.length]);
    }
    const resultPos = prefix.length + middle.length;
    const suffix    = [prize, ...PRIZES.slice(0, 4)];
    const reel      = [...prefix, ...middle, ...suffix];
    const initY     = -CENTER_INDEX * ITEM_HEIGHT;
    const finalY    = -(resultPos - CENTER_INDEX) * ITEM_HEIGHT;

    setReelItems(reel);
    setTargetPrize(prize);
    setTranslateY(initY);
    startYRef.current  = initY;
    targetYRef.current = finalY;
    setCurrentCenter(CENTER_INDEX);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function easeInOutCubic(t: number) {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }

  function spin() {
    if (phase !== "idle") return;
    setPhase("spinning");
    startTimeRef.current = performance.now();

    function animate(now: number) {
      const elapsed  = now - startTimeRef.current;
      const progress = Math.min(elapsed / 2800, 1);
      const eased    = easeInOutCubic(progress);
      const currentY = startYRef.current + (targetYRef.current - startYRef.current) * eased;

      setTranslateY(currentY);
      setCurrentCenter(Math.round(-currentY / ITEM_HEIGHT) + CENTER_INDEX);

      if (progress < 1) {
        animFrameRef.current = requestAnimationFrame(animate);
      } else {
        setTranslateY(targetYRef.current);
        setPhase("done");
        // Delay nhỏ rồi show popup
        setTimeout(() => setPhase("celebrate"), 400);
      }
    }

    animFrameRef.current = requestAnimationFrame(animate);
  }

  const handleContinue = useCallback(() => {
    if (targetPrize) onComplete(targetPrize);
  }, [targetPrize, onComplete]);

  useEffect(() => {
    return () => { if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current); };
  }, []);

  return (
    <>
      {/* Celebration popup */}
      {phase === "celebrate" && targetPrize && (
        <CelebrationPopup prize={targetPrize} onContinue={handleContinue} />
      )}

      <div className="flex flex-col items-center gap-5 w-full animate-scale-in">
        {/* Header */}
        <div className="text-center">
          <p
            className="text-xs font-bold tracking-widest uppercase mb-1"
            style={{ color: "rgba(255,255,255,0.3)", letterSpacing: "0.12em" }}
          >
            Tài trợ thử thách
          </p>
          <p className="text-white font-bold text-lg" style={{ letterSpacing: "-0.02em" }}>
            {phase === "idle"      && "Quay để xem ai tài trợ bạn"}
            {phase === "spinning"  && "Đang chọn nhà tài trợ..."}
            {(phase === "done" || phase === "celebrate") && "Có kết quả rồi!"}
          </p>
        </div>

        {/* Reel window */}
        <div
          className="relative w-full overflow-hidden rounded-2xl"
          style={{
            height: `${ITEM_HEIGHT * VISIBLE_ITEMS}px`,
            background: "rgba(255,255,255,0.03)",
            border: `1px solid ${phase === "done" || phase === "celebrate"
              ? (targetPrize?.color ?? primaryColor) + "40"
              : "rgba(255,255,255,0.08)"}`,
            boxShadow: phase === "done" || phase === "celebrate"
              ? `0 0 24px ${targetPrize?.color ?? primaryColor}25, inset 0 8px 24px rgba(0,0,0,0.3)`
              : "inset 0 8px 24px rgba(0,0,0,0.3)",
            transition: "border-color 0.4s, box-shadow 0.4s",
          }}
        >
          {/* Fade masks */}
          <div
            className="absolute top-0 left-0 right-0 z-10 pointer-events-none"
            style={{
              height: `${ITEM_HEIGHT * 1.5}px`,
              background: "linear-gradient(to bottom, rgba(8,8,8,0.9), transparent)",
            }}
          />
          <div
            className="absolute bottom-0 left-0 right-0 z-10 pointer-events-none"
            style={{
              height: `${ITEM_HEIGHT * 1.5}px`,
              background: "linear-gradient(to top, rgba(8,8,8,0.9), transparent)",
            }}
          />

          {/* Center band */}
          <div
            className="absolute left-0 right-0 z-10 pointer-events-none transition-all duration-400"
            style={{
              top:    `${CENTER_INDEX * ITEM_HEIGHT}px`,
              height: `${ITEM_HEIGHT}px`,
              background: `${primaryColor}0C`,
              borderTop:    `1px solid ${primaryColor}25`,
              borderBottom: `1px solid ${primaryColor}25`,
            }}
          />

          {/* Scrolling reel */}
          <div style={{ transform: `translateY(${translateY}px)`, willChange: "transform" }}>
            {reelItems.map((prize, idx) => (
              <ReelItem key={idx} prize={prize} isCenter={idx === currentCenter} />
            ))}
          </div>
        </div>

        {/* Spin button */}
        {phase === "idle" && (
          <button
            onClick={spin}
            className="relative w-full py-4 rounded-2xl font-bold text-sm overflow-hidden press group"
            style={{
              background: `linear-gradient(135deg, ${primaryColor}, ${primaryColor}CC)`,
              color: primaryColor === "#FF4D4D" ? "#fff" : "#080808",
              boxShadow: `0 8px 28px ${primaryColor}40`,
            }}
          >
            <span
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{ background: "linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.2) 50%, transparent 65%)" }}
            />
            <span className="relative">Quay ngay</span>
          </button>
        )}

        {phase === "spinning" && (
          <div
            className="w-full py-4 rounded-2xl flex items-center justify-center gap-2"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="w-2 h-2 rounded-full"
                style={{
                  background: primaryColor,
                  animation: `pulse 0.9s ease-in-out ${i * 0.18}s infinite`,
                }}
              />
            ))}
          </div>
        )}

        {(phase === "done" || phase === "celebrate") && (
          <div
            className="w-full py-3 rounded-2xl text-center text-sm font-medium animate-fade-in"
            style={{
              background: `${targetPrize?.color ?? primaryColor}10`,
              border: `1px solid ${targetPrize?.color ?? primaryColor}25`,
              color: "rgba(255,255,255,0.5)",
            }}
          >
            Xem kết quả...
          </div>
        )}
      </div>
    </>
  );
}
