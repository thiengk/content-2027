"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

/* ─── SVG icons for nav ──────────────────────────────────── */
function NavHome({ active }: { active: boolean }) {
  const c = active ? "#ffffff" : "rgba(255,255,255,0.35)";
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M3 10.5L12 3L21 10.5V21C21 21.552 20.552 22 20 22H15V16H9V22H4C3.448 22 3 21.552 3 21V10.5Z"
        stroke={c}
        strokeWidth={active ? "2" : "1.5"}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill={active ? `${c}18` : "none"}
      />
    </svg>
  );
}

function NavMyChallenge({ active }: { active: boolean }) {
  const c = active ? "#ffffff" : "rgba(255,255,255,0.35)";
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      {/* Person */}
      <circle cx="12" cy="7" r="3.5" stroke={c} strokeWidth={active ? "2" : "1.5"} fill={active ? `${c}18` : "none"} />
      {/* Lightning bolt — "challenge" */}
      <path
        d="M9 21L11.5 15H7.5L13 9L10.5 15H14.5L9 21Z"
        stroke={c}
        strokeWidth={active ? "1.8" : "1.4"}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill={active ? `${c}25` : "none"}
      />
    </svg>
  );
}

/* ─── Nav tab item ───────────────────────────────────────── */
interface NavItemProps {
  href: string;
  label: string;
  icon: (active: boolean) => React.ReactNode;
  active: boolean;
}

function NavItem({ href, label, icon, active }: NavItemProps) {
  return (
    <Link
      href={href}
      className="flex flex-col items-center gap-1 py-2 px-6 rounded-2xl transition-all duration-200 relative"
      style={{ minWidth: 72 }}
    >
      {/* Active background pill */}
      {active && (
        <div
          className="absolute inset-0 rounded-2xl"
          style={{ background: "rgba(255,255,255,0.07)" }}
        />
      )}

      <span className="relative">{icon(active)}</span>

      <span
        className="relative text-xs font-semibold transition-colors duration-200"
        style={{
          color: active ? "#ffffff" : "rgba(255,255,255,0.35)",
          letterSpacing: "0.01em",
        }}
      >
        {label}
      </span>

      {/* Active dot */}
      {active && (
        <span
          className="absolute bottom-1 w-1 h-1 rounded-full"
          style={{ background: "#ffffff" }}
        />
      )}
    </Link>
  );
}

/* ─── BottomNav ──────────────────────────────────────────── */
export default function BottomNav() {
  const pathname = usePathname();

  const tabs = [
    {
      href: "/",
      label: "Hôm Nay",
      icon: (active: boolean) => <NavHome active={active} />,
    },
    {
      href: "/my-challenges",
      label: "Của Tôi",
      icon: (active: boolean) => <NavMyChallenge active={active} />,
    },
  ];

  return (
    <>
      {/* Spacer — pushes page content above nav */}
      <div style={{ height: 72 }} />

      {/* Nav bar */}
      <nav
        className="fixed bottom-0 left-0 right-0 z-40 flex items-center justify-center"
        style={{
          background: "rgba(8,8,8,0.85)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderTop: "1px solid rgba(255,255,255,0.07)",
          paddingBottom: "env(safe-area-inset-bottom, 0px)",
          height: 72,
        }}
      >
        <div className="flex items-center gap-2">
          {tabs.map((tab) => (
            <NavItem
              key={tab.href}
              href={tab.href}
              label={tab.label}
              icon={tab.icon}
              active={pathname === tab.href}
            />
          ))}
        </div>
      </nav>
    </>
  );
}
