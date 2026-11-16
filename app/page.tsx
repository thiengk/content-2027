import { getTodayChallenge, getDayLabel, getDateLabel } from "@/lib/challenges";
import ChallengeCard    from "@/components/ChallengeCard";
import ParticipantCount from "@/components/ParticipantCount";
import AcceptChallenge  from "@/components/AcceptChallenge";
import { IconFlame, IconCalendar, IconBolt, IconMoon } from "@/components/icons";

function getDateKey(): string {
  const today = new Date();
  return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
}

export default function Home() {
  const challenge = getTodayChallenge();
  const dayLabel  = getDayLabel();
  const dateLabel = getDateLabel();
  const dateKey   = getDateKey();
  const isCAM     = challenge.type === "CAM";
  const primary   = isCAM ? "#FF4D4D" : "#00C896";
  const glow      = isCAM ? "rgba(255,77,77,0.5)" : "rgba(0,200,150,0.4)";

  return (
    <main
      className="min-h-screen flex flex-col items-center px-4 pb-6 pt-10 overflow-x-hidden"
    >
      {/* Subtle per-page color accent — blends on top of aurora */}
      <div
        aria-hidden
        className="fixed inset-0 pointer-events-none"
        style={{
          background: isCAM
            ? "radial-gradient(ellipse 70% 40% at 20% 10%, rgba(255,77,77,0.08) 0%, transparent 60%)"
            : "radial-gradient(ellipse 70% 40% at 20% 10%, rgba(0,200,150,0.07) 0%, transparent 60%)",
        }}
      />

      {/* Content */}
      <div className="relative w-full max-w-sm flex flex-col gap-5">

        {/* ── Header ── */}
        <header className="text-center animate-fade-up">
          {/* Wordmark */}
          <div className="flex items-center justify-center gap-2.5 mb-2.5">
            <div
              className="animate-float"
              style={{ filter: `drop-shadow(0 0 10px ${glow})` }}
            >
              <IconFlame size={28} color={primary} />
            </div>
            <h1
              className="text-xl font-extrabold tracking-tight text-white"
              style={{ letterSpacing: "-0.03em" }}
            >
              Dám Thử Không Nào
            </h1>
          </div>

          {/* Date pill */}
          <div className="flex items-center justify-center">
            <span
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.09)",
                color: "rgba(255,255,255,0.5)",
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                style={{
                  background: primary,
                  boxShadow: `0 0 6px ${glow}`,
                }}
              />
              <IconCalendar size={12} color="rgba(255,255,255,0.4)" strokeWidth={1.5} />
              <span>{dayLabel} · {dateLabel}</span>
            </span>
          </div>
        </header>

        {/* ── Challenge card ── */}
        <ChallengeCard challenge={challenge} />

        {/* ── Participant count ── */}
        <ParticipantCount />

        {/* ── Divider ── */}
        <div className="relative flex items-center gap-3 animate-fade-up delay-300">
          <div
            className="flex-1 h-px"
            style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.08))" }}
          />
          <span className="text-xs font-medium tracking-widest uppercase" style={{ color: "rgba(255,255,255,0.18)" }}>
            tham gia ngay
          </span>
          <div
            className="flex-1 h-px"
            style={{ background: "linear-gradient(90deg, rgba(255,255,255,0.08), transparent)" }}
          />
        </div>

        {/* ── Accept challenge ── */}
        <div className="animate-fade-up delay-400">
          <AcceptChallenge challenge={challenge} dateKey={dateKey} />
        </div>

        {/* ── Footer ── */}
        <footer className="text-center pt-2 animate-fade-up delay-500">
          <p
            className="text-xs font-medium"
            style={{ color: "rgba(255,255,255,0.18)" }}
          >
            damthukhongnao.com
          </p>
          <div
            className="flex items-center justify-center gap-1.5 mt-1"
            style={{ color: "rgba(255,255,255,0.1)" }}
          >
            <IconBolt size={10} color="rgba(255,255,255,0.15)" />
            <span style={{ fontSize: "0.6rem" }}>Thử thách mới mỗi ngày lúc 00:00</span>
            <IconMoon size={10} color="rgba(255,255,255,0.15)" strokeWidth={1.5} />
          </div>
        </footer>

      </div>
    </main>
  );
}
