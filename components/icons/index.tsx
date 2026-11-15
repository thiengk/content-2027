interface IconProps {
  size?: number;
  color?: string;
  className?: string;
  strokeWidth?: number;
}

/* ─── Flame / Fire ───────────────────────────────────────── */
export function IconFlame({ size = 24, color = "currentColor", className }: IconProps) {
  return (
    <svg
      width={size} height={size} viewBox="0 0 24 24"
      fill="none" xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M12 2C12 2 10 6 10 9C10 11 11 12.5 12 13C13 12.5 14 11 14 9C14 6 12 2 12 2Z"
        fill={color} opacity="0.6"
      />
      <path
        d="M6 13C6 13 5 15 5 17C5 20.314 8.134 23 12 23C15.866 23 19 20.314 19 17C19 14 17 11 15 10C15 12 14 14 12 15C10 14 9.5 12 9.5 10C8 11 6 13 6 13Z"
        fill={color}
      />
      <path
        d="M12 18C11 18 10 17.5 10 16.5C10 15.5 11 14.5 12 14.5C13 14.5 14 15.5 14 16.5C14 17.5 13 18 12 18Z"
        fill={color} opacity="0.4"
      />
    </svg>
  );
}

/* ─── Ban / Forbidden ────────────────────────────────────── */
export function IconBan({ size = 24, color = "currentColor", className, strokeWidth = 2 }: IconProps) {
  return (
    <svg
      width={size} height={size} viewBox="0 0 24 24"
      fill="none" xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" stroke={color} strokeWidth={strokeWidth} />
      <line x1="5.5" y1="5.5" x2="18.5" y2="18.5" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
    </svg>
  );
}

/* ─── Check / Must Do ────────────────────────────────────── */
export function IconCheck({ size = 24, color = "currentColor", className, strokeWidth = 2 }: IconProps) {
  return (
    <svg
      width={size} height={size} viewBox="0 0 24 24"
      fill="none" xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M5 12L10 17L19 7"
        stroke={color} strokeWidth={strokeWidth}
        strokeLinecap="round" strokeLinejoin="round"
      />
    </svg>
  );
}

/* ─── Check Circle ───────────────────────────────────────── */
export function IconCheckCircle({ size = 24, color = "currentColor", className, strokeWidth = 1.5 }: IconProps) {
  return (
    <svg
      width={size} height={size} viewBox="0 0 24 24"
      fill="none" xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" stroke={color} strokeWidth={strokeWidth} />
      <path
        d="M8 12L11 15L16 9"
        stroke={color} strokeWidth={strokeWidth}
        strokeLinecap="round" strokeLinejoin="round"
      />
    </svg>
  );
}

/* ─── Clock ──────────────────────────────────────────────── */
export function IconClock({ size = 24, color = "currentColor", className, strokeWidth = 1.5 }: IconProps) {
  return (
    <svg
      width={size} height={size} viewBox="0 0 24 24"
      fill="none" xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" stroke={color} strokeWidth={strokeWidth} />
      <path
        d="M12 7V12L15 14.5"
        stroke={color} strokeWidth={strokeWidth}
        strokeLinecap="round" strokeLinejoin="round"
      />
    </svg>
  );
}

/* ─── Users / People ─────────────────────────────────────── */
export function IconUsers({ size = 24, color = "currentColor", className, strokeWidth = 1.5 }: IconProps) {
  return (
    <svg
      width={size} height={size} viewBox="0 0 24 24"
      fill="none" xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Person 1 */}
      <circle cx="9" cy="7" r="3" stroke={color} strokeWidth={strokeWidth} />
      <path
        d="M3 20C3 17 5.686 14.5 9 14.5C12.314 14.5 15 17 15 20"
        stroke={color} strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      {/* Person 2 (overlapping) */}
      <circle cx="17" cy="8" r="2.5" stroke={color} strokeWidth={strokeWidth} />
      <path
        d="M14.5 20C14.5 17.8 15.8 16 18 15.5"
        stroke={color} strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
    </svg>
  );
}

/* ─── Arrow Right ────────────────────────────────────────── */
export function IconArrowRight({ size = 24, color = "currentColor", className, strokeWidth = 2 }: IconProps) {
  return (
    <svg
      width={size} height={size} viewBox="0 0 24 24"
      fill="none" xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M5 12H19M13 6L19 12L13 18"
        stroke={color} strokeWidth={strokeWidth}
        strokeLinecap="round" strokeLinejoin="round"
      />
    </svg>
  );
}

/* ─── At Sign / @ ────────────────────────────────────────── */
export function IconAt({ size = 24, color = "currentColor", className, strokeWidth = 1.5 }: IconProps) {
  return (
    <svg
      width={size} height={size} viewBox="0 0 24 24"
      fill="none" xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="4" stroke={color} strokeWidth={strokeWidth} />
      <path
        d="M16 12C16 14.209 17.343 16 19 16C20.105 16 21 14.657 21 13C21 8.029 16.971 4 12 4C7.029 4 3 8.029 3 13C3 17.971 7.029 22 12 22"
        stroke={color} strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
    </svg>
  );
}

/* ─── Category: Speech / Ngôn ngữ ───────────────────────── */
export function IconSpeech({ size = 24, color = "currentColor", className, strokeWidth = 1.5 }: IconProps) {
  return (
    <svg
      width={size} height={size} viewBox="0 0 24 24"
      fill="none" xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M4 4H20C20.552 4 21 4.448 21 5V15C21 15.552 20.552 16 20 16H8L4 20V5C4 4.448 4.448 4 4 4Z"
        stroke={color} strokeWidth={strokeWidth}
        strokeLinecap="round" strokeLinejoin="round"
      />
      <line x1="8" y1="9" x2="16" y2="9" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
      <line x1="8" y1="12" x2="13" y2="12" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
    </svg>
  );
}

/* ─── Category: Walk / Di chuyển ────────────────────────── */
export function IconWalk({ size = 24, color = "currentColor", className, strokeWidth = 1.5 }: IconProps) {
  return (
    <svg
      width={size} height={size} viewBox="0 0 24 24"
      fill="none" xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <circle cx="12" cy="4" r="1.5" fill={color} />
      <path
        d="M10 7L8 11L11 12L9 20"
        stroke={color} strokeWidth={strokeWidth}
        strokeLinecap="round" strokeLinejoin="round"
      />
      <path
        d="M14 7L15.5 11L13 12L15 20"
        stroke={color} strokeWidth={strokeWidth}
        strokeLinecap="round" strokeLinejoin="round"
      />
      <path
        d="M9 11H15"
        stroke={color} strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
    </svg>
  );
}

/* ─── Category: Food / Ăn uống ──────────────────────────── */
export function IconFood({ size = 24, color = "currentColor", className, strokeWidth = 1.5 }: IconProps) {
  return (
    <svg
      width={size} height={size} viewBox="0 0 24 24"
      fill="none" xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M12 3C9 3 6 6 6 10C6 13.314 7.5 15 9 16V20C9 20.552 9.448 21 10 21H14C14.552 21 15 20.552 15 20V16C16.5 15 18 13.314 18 10C18 6 15 3 12 3Z"
        stroke={color} strokeWidth={strokeWidth}
        strokeLinecap="round" strokeLinejoin="round"
      />
      <line x1="12" y1="11" x2="12" y2="21" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
    </svg>
  );
}

/* ─── Category: Phone / Điện thoại ──────────────────────── */
export function IconPhone({ size = 24, color = "currentColor", className, strokeWidth = 1.5 }: IconProps) {
  return (
    <svg
      width={size} height={size} viewBox="0 0 24 24"
      fill="none" xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <rect x="7" y="2" width="10" height="20" rx="2" stroke={color} strokeWidth={strokeWidth} />
      <circle cx="12" cy="18.5" r="1" fill={color} />
      <line x1="9" y1="5.5" x2="15" y2="5.5" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
      {/* X cross để biểu thị "cấm điện thoại" khi cần */}
    </svg>
  );
}

/* ─── Category: Social / Xã hội ─────────────────────────── */
export function IconSocial({ size = 24, color = "currentColor", className, strokeWidth = 1.5 }: IconProps) {
  return (
    <svg
      width={size} height={size} viewBox="0 0 24 24"
      fill="none" xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <circle cx="6" cy="12" r="2.5" stroke={color} strokeWidth={strokeWidth} />
      <circle cx="18" cy="6" r="2.5" stroke={color} strokeWidth={strokeWidth} />
      <circle cx="18" cy="18" r="2.5" stroke={color} strokeWidth={strokeWidth} />
      <line x1="8.3" y1="10.9" x2="15.7" y2="7.1" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
      <line x1="8.3" y1="13.1" x2="15.7" y2="16.9" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
    </svg>
  );
}

/* ─── Spinner (loading) ──────────────────────────────────── */
export function IconSpinner({ size = 20, color = "currentColor", className }: IconProps) {
  return (
    <svg
      width={size} height={size} viewBox="0 0 24 24"
      fill="none" xmlns="http://www.w3.org/2000/svg"
      className={`animate-spin ${className ?? ""}`}
      aria-hidden="true"
    >
      <circle
        cx="12" cy="12" r="9"
        stroke={color} strokeWidth="2.5"
        strokeLinecap="round"
        strokeDasharray="40 20"
        opacity="0.3"
      />
      <path
        d="M12 3C7.029 3 3 7.029 3 12"
        stroke={color} strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

/* ─── Dot (live/pulse indicator) ────────────────────────── */
export function IconDot({ size = 8, color = "currentColor", className }: IconProps) {
  return (
    <svg
      width={size} height={size} viewBox="0 0 8 8"
      fill="none" xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <circle cx="4" cy="4" r="4" fill={color} />
    </svg>
  );
}

/* ─── Calendar / Date ────────────────────────────────────── */
export function IconCalendar({ size = 24, color = "currentColor", className, strokeWidth = 1.5 }: IconProps) {
  return (
    <svg
      width={size} height={size} viewBox="0 0 24 24"
      fill="none" xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <rect x="3" y="5" width="18" height="16" rx="2" stroke={color} strokeWidth={strokeWidth} />
      <line x1="3" y1="10" x2="21" y2="10" stroke={color} strokeWidth={strokeWidth} />
      <line x1="8" y1="3" x2="8" y2="7" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
      <line x1="16" y1="3" x2="16" y2="7" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
    </svg>
  );
}

/* ─── Moon / Night ───────────────────────────────────────── */
export function IconMoon({ size = 24, color = "currentColor", className, strokeWidth = 1.5 }: IconProps) {
  return (
    <svg
      width={size} height={size} viewBox="0 0 24 24"
      fill="none" xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z"
        stroke={color} strokeWidth={strokeWidth}
        strokeLinecap="round" strokeLinejoin="round"
      />
    </svg>
  );
}

/* ─── Lightning / Bolt ───────────────────────────────────── */
export function IconBolt({ size = 24, color = "currentColor", className }: IconProps) {
  return (
    <svg
      width={size} height={size} viewBox="0 0 24 24"
      fill="none" xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M13 2L4.5 13.5H12L11 22L19.5 10.5H12L13 2Z"
        fill={color} opacity="0.85"
      />
    </svg>
  );
}

/* ─── Pen / Edit ─────────────────────────────────────────── */
export function IconEdit({ size = 24, color = "currentColor", className, strokeWidth = 1.5 }: IconProps) {
  return (
    <svg
      width={size} height={size} viewBox="0 0 24 24"
      fill="none" xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M11 4H4C3.448 4 3 4.448 3 5V20C3 20.552 3.448 21 4 21H19C19.552 21 20 20.552 20 20V13"
        stroke={color} strokeWidth={strokeWidth}
        strokeLinecap="round" strokeLinejoin="round"
      />
      <path
        d="M18.5 2.5L21.5 5.5L12 15L8 16L9 12L18.5 2.5Z"
        stroke={color} strokeWidth={strokeWidth}
        strokeLinecap="round" strokeLinejoin="round"
      />
    </svg>
  );
}

/* ─── Mail / Email ───────────────────────────────────────── */
export function IconMail({ size = 24, color = "currentColor", className, strokeWidth = 1.5 }: IconProps) {
  return (
    <svg
      width={size} height={size} viewBox="0 0 24 24"
      fill="none" xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <rect x="3" y="5" width="18" height="14" rx="2" stroke={color} strokeWidth={strokeWidth} />
      <path
        d="M3 8L12 13.5L21 8"
        stroke={color} strokeWidth={strokeWidth}
        strokeLinecap="round" strokeLinejoin="round"
      />
    </svg>
  );
}

/* ─── Muscle / Strong ────────────────────────────────────── */
export function IconMuscle({ size = 24, color = "currentColor", className }: IconProps) {
  return (
    <svg
      width={size} height={size} viewBox="0 0 24 24"
      fill="none" xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M6.5 6C6.5 4.619 7.619 3.5 9 3.5C10.381 3.5 11.5 4.619 11.5 6V7H14.5C15.328 7 16 7.672 16 8.5V9.5C16 9.5 17.5 9.5 18 10.5C18.5 11.5 17.5 13 16 13H14C14 14.5 13 15.5 12 16L11 20.5H7L8 15C6.5 14 6 12.5 6 11V7.5C6 6.672 6.172 6 6.5 6Z"
        stroke={color} strokeWidth="1.5"
        strokeLinecap="round" strokeLinejoin="round"
      />
    </svg>
  );
}
