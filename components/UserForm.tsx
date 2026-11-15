"use client";

import { useState } from "react";
import { IconArrowRight, IconAt } from "@/components/icons";

interface UserInfo {
  name: string;
  userId: string;
}

interface UserFormProps {
  onSubmit: (user: UserInfo) => void;
}

export default function UserForm({ onSubmit }: UserFormProps) {
  const [name, setName]               = useState("");
  const [userId, setUserId]           = useState("");
  const [nameFocus, setNameFocus]     = useState(false);
  const [userIdFocus, setUserIdFocus] = useState(false);

  const canSubmit = name.trim().length > 0 && userId.trim().length > 0;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;
    onSubmit({ name: name.trim(), userId: userId.trim() });
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full animate-slide-up">
      <div className="text-center mb-1">
        <p className="text-sm font-medium" style={{ color: "rgba(255,255,255,0.4)" }}>
          Nhập thông tin để bắt đầu
        </p>
      </div>

      {/* Name input */}
      <div className="relative">
        <label
          htmlFor="input-name"
          className="absolute left-4 transition-all duration-200 pointer-events-none select-none"
          style={{
            top: nameFocus || name ? "8px" : "50%",
            transform:
              nameFocus || name
                ? "translateY(0) scale(0.75)"
                : "translateY(-50%) scale(1)",
            transformOrigin: "left center",
            color: nameFocus ? "rgba(255,255,255,0.65)" : "rgba(255,255,255,0.3)",
            fontSize: "0.875rem",
          }}
        >
          Tên của bạn
        </label>
        <input
          id="input-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onFocus={() => setNameFocus(true)}
          onBlur={() => setNameFocus(false)}
          required
          maxLength={30}
          className="w-full pt-6 pb-2.5 px-4 rounded-2xl text-white text-sm font-medium transition-all duration-200"
          style={{
            background: nameFocus ? "rgba(255,255,255,0.07)" : "rgba(255,255,255,0.04)",
            border: nameFocus
              ? "1px solid rgba(255,255,255,0.22)"
              : "1px solid rgba(255,255,255,0.08)",
            outline: "none",
            boxShadow: nameFocus
              ? "0 0 0 3px rgba(255,255,255,0.05), 0 4px 16px rgba(0,0,0,0.2)"
              : "none",
          }}
        />
      </div>

      {/* UserId input */}
      <div className="relative">
        <label
          htmlFor="input-userid"
          className="absolute transition-all duration-200 pointer-events-none select-none"
          style={{
            left: userIdFocus || userId ? "16px" : "40px",
            top: userIdFocus || userId ? "8px" : "50%",
            transform:
              userIdFocus || userId
                ? "translateY(0) scale(0.75)"
                : "translateY(-50%) scale(1)",
            transformOrigin: "left center",
            color: userIdFocus ? "rgba(255,255,255,0.65)" : "rgba(255,255,255,0.3)",
            fontSize: "0.875rem",
          }}
        >
          ID của bạn (vd: minhtu_hcm)
        </label>

        {/* @ icon prefix */}
        <div
          className="absolute left-4 top-1/2 -translate-y-1/2 transition-opacity duration-200"
          style={{ opacity: userIdFocus || userId ? 0 : 0.35 }}
        >
          <IconAt size={15} color="rgba(255,255,255,0.6)" strokeWidth={1.5} />
        </div>

        <input
          id="input-userid"
          type="text"
          value={userId}
          onChange={(e) =>
            setUserId(e.target.value.replace(/\s+/g, "_").toLowerCase())
          }
          onFocus={() => setUserIdFocus(true)}
          onBlur={() => setUserIdFocus(false)}
          required
          maxLength={30}
          pattern="[a-z0-9_]+"
          title="Chỉ dùng chữ thường, số và dấu gạch dưới"
          className="w-full pt-6 pb-2.5 px-4 rounded-2xl text-white text-sm font-mono transition-all duration-200"
          style={{
            background: userIdFocus ? "rgba(255,255,255,0.07)" : "rgba(255,255,255,0.04)",
            border: userIdFocus
              ? "1px solid rgba(255,255,255,0.22)"
              : "1px solid rgba(255,255,255,0.08)",
            outline: "none",
            boxShadow: userIdFocus
              ? "0 0 0 3px rgba(255,255,255,0.05), 0 4px 16px rgba(0,0,0,0.2)"
              : "none",
          }}
        />

        {/* Live preview */}
        {userId && (
          <span
            className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-mono"
            style={{ color: "rgba(255,255,255,0.28)" }}
          >
            @{userId}
          </span>
        )}
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={!canSubmit}
        className="relative w-full py-4 rounded-2xl text-sm font-bold tracking-wide overflow-hidden transition-all duration-300 press"
        style={{
          background: canSubmit
            ? "linear-gradient(135deg, #ffffff 0%, #e0e0e0 100%)"
            : "rgba(255,255,255,0.08)",
          color: canSubmit ? "#080808" : "rgba(255,255,255,0.18)",
          boxShadow: canSubmit
            ? "0 8px 24px rgba(255,255,255,0.14), inset 0 1px 0 rgba(255,255,255,0.3)"
            : "none",
          cursor: canSubmit ? "pointer" : "not-allowed",
        }}
      >
        {/* Shimmer on hover */}
        {canSubmit && (
          <span
            className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300"
            style={{
              background:
                "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.3) 50%, transparent 60%)",
            }}
          />
        )}
        <span className="relative flex items-center justify-center gap-2">
          <span>Tiếp theo</span>
          <IconArrowRight
            size={16}
            color={canSubmit ? "#080808" : "rgba(255,255,255,0.18)"}
            strokeWidth={2.5}
          />
        </span>
      </button>
    </form>
  );
}
