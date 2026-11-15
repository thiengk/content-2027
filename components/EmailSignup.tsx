"use client";

import { useState } from "react";
import { IconMail, IconArrowRight, IconSpinner, IconCheckCircle } from "@/components/icons";

export default function EmailSignup() {
  const [email, setEmail]     = useState("");
  const [focused, setFocused] = useState(false);
  const [status, setStatus]   = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus("loading");

    // TODO: replace with real API
    await new Promise((resolve) => setTimeout(resolve, 900));

    try {
      const existing = JSON.parse(localStorage.getItem("subscribers") || "[]");
      if (!existing.includes(email)) {
        existing.push(email);
        localStorage.setItem("subscribers", JSON.stringify(existing));
      }
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  /* ── Success ─────────────────────────────────────────── */
  if (status === "success") {
    return (
      <div className="flex flex-col items-center gap-3 py-5 animate-scale-in">
        <div
          style={{ filter: "drop-shadow(0 0 12px rgba(0,200,150,0.5))" }}
        >
          <IconCheckCircle size={40} color="#00C896" strokeWidth={1.5} />
        </div>
        <div className="text-center">
          <p className="font-bold text-base text-white mb-1">Đã đăng ký!</p>
          <p className="text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>
            Chúng tôi sẽ nhắn khi app ra mắt đầy đủ.
          </p>
        </div>
      </div>
    );
  }

  /* ── Form ────────────────────────────────────────────── */
  return (
    <div className="w-full animate-fade-up">
      <div className="flex items-center justify-center gap-2 mb-3">
        <div
          className="h-px flex-1"
          style={{ background: "rgba(255,255,255,0.06)" }}
        />
        <p
          className="text-xs font-medium tracking-widest uppercase whitespace-nowrap"
          style={{ color: "rgba(255,255,255,0.28)", letterSpacing: "0.1em" }}
        >
          Nhận thông báo khi ra mắt
        </p>
        <div
          className="h-px flex-1"
          style={{ background: "rgba(255,255,255,0.06)" }}
        />
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <div className="relative flex-1">
          {/* Mail icon */}
          <div
            className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none transition-opacity duration-200"
            style={{ opacity: focused || email ? 0.6 : 0.3 }}
          >
            <IconMail size={15} color="rgba(255,255,255,0.8)" strokeWidth={1.5} />
          </div>

          <input
            type="email"
            placeholder="email@của.bạn"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            required
            className="w-full pl-9 pr-4 py-3 rounded-xl text-sm text-white transition-all duration-200"
            style={{
              background: focused ? "rgba(255,255,255,0.07)" : "rgba(255,255,255,0.04)",
              border: focused
                ? "1px solid rgba(255,255,255,0.2)"
                : "1px solid rgba(255,255,255,0.08)",
              outline: "none",
              boxShadow: focused ? "0 0 0 3px rgba(255,255,255,0.04)" : "none",
            }}
          />
        </div>

        <button
          type="submit"
          disabled={status === "loading" || !email.trim()}
          className="px-5 py-3 rounded-xl text-sm font-bold whitespace-nowrap press transition-all duration-200 flex items-center gap-2"
          style={{
            background: email.trim()
              ? "linear-gradient(135deg, #ffffff, #e0e0e0)"
              : "rgba(255,255,255,0.08)",
            color: email.trim() ? "#080808" : "rgba(255,255,255,0.2)",
            boxShadow: email.trim() ? "0 4px 16px rgba(255,255,255,0.12)" : "none",
            cursor: email.trim() ? "pointer" : "not-allowed",
          }}
        >
          {status === "loading" ? (
            <IconSpinner size={16} color={email.trim() ? "#080808" : "rgba(255,255,255,0.3)"} />
          ) : (
            <>
              <span>Đăng ký</span>
              <IconArrowRight
                size={14}
                color={email.trim() ? "#080808" : "rgba(255,255,255,0.2)"}
                strokeWidth={2.5}
              />
            </>
          )}
        </button>
      </form>

      {status === "error" && (
        <p
          className="text-xs mt-2 text-center animate-fade-in"
          style={{ color: "#FF4D4D" }}
        >
          Có lỗi xảy ra. Thử lại nhé.
        </p>
      )}
    </div>
  );
}
