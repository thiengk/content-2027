"use client";

import { useEffect, useState } from "react";
import { IconUsers, IconDot } from "@/components/icons";

function getParticipantCount(): number {
  const today = new Date();
  const seed =
    today.getFullYear() * 10000 +
    (today.getMonth() + 1) * 100 +
    today.getDate();
  const base = ((seed * 1103515245 + 12345) & 0x7fffffff) % 500 + 100;
  return base;
}

export default function ParticipantCount() {
  const [count, setCount]     = useState<number | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const base = getParticipantCount();
    const t = setTimeout(() => {
      setCount(base);
      setVisible(true);
    }, 180);

    const interval = setInterval(() => {
      setCount((prev) => (prev ? prev + Math.floor(Math.random() * 3) : prev));
    }, 15000);

    return () => {
      clearTimeout(t);
      clearInterval(interval);
    };
  }, []);

  if (!visible || count === null) {
    return (
      <div className="flex justify-center">
        <div className="h-8 w-52 rounded-full shimmer" />
      </div>
    );
  }

  return (
    <div className="flex justify-center animate-count-up">
      <div
        className="relative flex items-center gap-2.5 px-4 py-2 rounded-full"
        style={{
          background: "rgba(255,255,255,0.05)",
          border: "1px solid rgba(255,255,255,0.09)",
          boxShadow: "0 4px 16px rgba(0,0,0,0.3)",
        }}
      >
        {/* Live pulse indicator */}
        <span className="relative flex items-center justify-center w-3 h-3">
          {/* Ping ring */}
          <span
            className="absolute inline-flex w-full h-full rounded-full animate-pulse-ring"
            style={{ background: "#00C896", opacity: 0.5 }}
          />
          <IconDot size={6} color="#00C896" />
        </span>

        {/* Users icon */}
        <IconUsers size={15} color="rgba(255,255,255,0.4)" strokeWidth={1.5} />

        {/* Count text */}
        <span className="text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>
          <span className="font-bold text-white" key={count}>
            {count.toLocaleString("vi-VN")}
          </span>
          {" "}người đang thử hôm nay
        </span>
      </div>
    </div>
  );
}
