export type ChallengeType = "CAM" | "PHAI";
export type Difficulty = "dễ" | "vừa" | "khó";
export type Duration = "2h" | "nửa ngày" | "cả ngày";
export type Category =
  | "ngôn_ngữ"
  | "di_chuyển"
  | "ăn_uống"
  | "điện_thoại"
  | "xã_hội";

export interface Challenge {
  id: number;
  type: ChallengeType;
  content: string;
  category: Category;
  difficulty: Difficulty;
  duration: Duration;
}

export const challenges: Challenge[] = [
  // CẤM — Ngôn ngữ
  {
    id: 1,
    type: "CAM",
    content: 'Không được nói từ "OK" cả ngày',
    category: "ngôn_ngữ",
    difficulty: "vừa",
    duration: "cả ngày",
  },
  {
    id: 2,
    type: "CAM",
    content: 'Không được nói "ừ" hoặc "được" cả ngày',
    category: "ngôn_ngữ",
    difficulty: "khó",
    duration: "cả ngày",
  },
  {
    id: 3,
    type: "CAM",
    content: "Không được dùng emoji khi nhắn tin",
    category: "ngôn_ngữ",
    difficulty: "dễ",
    duration: "cả ngày",
  },

  // PHẢI — Ngôn ngữ
  {
    id: 4,
    type: "PHAI",
    content: "Phải nói \"cảm ơn\" với mọi người phục vụ hôm nay",
    category: "ngôn_ngữ",
    difficulty: "dễ",
    duration: "cả ngày",
  },

  // CẤM — Di chuyển
  {
    id: 5,
    type: "CAM",
    content: "Không được gọi xe công nghệ cả ngày",
    category: "di_chuyển",
    difficulty: "vừa",
    duration: "cả ngày",
  },
  {
    id: 6,
    type: "CAM",
    content: "Không được đi thang máy cả ngày",
    category: "di_chuyển",
    difficulty: "vừa",
    duration: "cả ngày",
  },
  {
    id: 7,
    type: "CAM",
    content: "Không được dùng Google Maps cả ngày",
    category: "di_chuyển",
    difficulty: "khó",
    duration: "cả ngày",
  },

  // PHẢI — Di chuyển
  {
    id: 8,
    type: "PHAI",
    content: "Phải đi bộ ít nhất một đoạn trong ngày hôm nay",
    category: "di_chuyển",
    difficulty: "dễ",
    duration: "cả ngày",
  },
  {
    id: 9,
    type: "PHAI",
    content: "Phải khám phá một con ngõ hoặc con đường chưa từng đi",
    category: "di_chuyển",
    difficulty: "vừa",
    duration: "cả ngày",
  },

  // CẤM — Ăn uống
  {
    id: 10,
    type: "CAM",
    content: "Không được order đồ ăn online cả ngày",
    category: "ăn_uống",
    difficulty: "vừa",
    duration: "cả ngày",
  },
  {
    id: 11,
    type: "CAM",
    content: "Không được nhìn điện thoại khi đang ăn",
    category: "ăn_uống",
    difficulty: "dễ",
    duration: "cả ngày",
  },

  // PHẢI — Ăn uống
  {
    id: 12,
    type: "PHAI",
    content: "Phải ăn tại một quán chưa từng đến",
    category: "ăn_uống",
    difficulty: "dễ",
    duration: "cả ngày",
  },
  {
    id: 13,
    type: "PHAI",
    content: "Phải gọi món mà không nhìn menu",
    category: "ăn_uống",
    difficulty: "vừa",
    duration: "cả ngày",
  },

  // CẤM — Điện thoại
  {
    id: 14,
    type: "CAM",
    content: "Không được mở TikTok cả ngày",
    category: "điện_thoại",
    difficulty: "khó",
    duration: "cả ngày",
  },
  {
    id: 15,
    type: "CAM",
    content: "Không được check điện thoại trong 2 tiếng đầu buổi sáng",
    category: "điện_thoại",
    difficulty: "khó",
    duration: "2h",
  },

  // PHẢI — Xã hội
  {
    id: 16,
    type: "PHAI",
    content: "Phải nói chuyện với một người lạ hôm nay",
    category: "xã_hội",
    difficulty: "khó",
    duration: "cả ngày",
  },
  {
    id: 17,
    type: "PHAI",
    content: "Phải khen một người thật lòng hôm nay",
    category: "xã_hội",
    difficulty: "dễ",
    duration: "cả ngày",
  },
  {
    id: 18,
    type: "PHAI",
    content: "Phải nói chuyện với người bán hàng rong",
    category: "xã_hội",
    difficulty: "vừa",
    duration: "cả ngày",
  },

  // CẤM — Xã hội
  {
    id: 19,
    type: "CAM",
    content: "Không được phàn nàn bất cứ điều gì cả ngày",
    category: "xã_hội",
    difficulty: "khó",
    duration: "cả ngày",
  },

  // PHẢI — Xã hội (đặc biệt)
  {
    id: 20,
    type: "PHAI",
    content: "Phải mỉm cười với người lạ đầu tiên nhìn vào mắt bạn",
    category: "xã_hội",
    difficulty: "vừa",
    duration: "cả ngày",
  },
];

/**
 * Lấy thử thách theo ngày — dùng index theo ngày trong năm
 * Thứ 2,4,6 → CẤM | Thứ 3,5,7 → PHẢI | Chủ nhật → khó nhất
 */
export function getTodayChallenge(): Challenge {
  const today = new Date();
  const dayOfWeek = today.getDay(); // 0=CN, 1=T2, ..., 6=T7

  let pool: Challenge[];

  if (dayOfWeek === 0) {
    // Chủ nhật đặc biệt — khó nhất
    pool = challenges.filter((c) => c.difficulty === "khó");
  } else if (dayOfWeek % 2 === 0) {
    // T2, T4, T6 → CẤM
    pool = challenges.filter((c) => c.type === "CAM");
  } else {
    // T3, T5, T7 → PHẢI
    pool = challenges.filter((c) => c.type === "PHAI");
  }

  // Dùng ngày trong năm làm seed để cùng ngày cùng thử thách
  const start = new Date(today.getFullYear(), 0, 0);
  const diff = today.getTime() - start.getTime();
  const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24));

  return pool[dayOfYear % pool.length];
}

export function getDayLabel(): string {
  const days = [
    "Chủ Nhật",
    "Thứ Hai",
    "Thứ Ba",
    "Thứ Tư",
    "Thứ Năm",
    "Thứ Sáu",
    "Thứ Bảy",
  ];
  return days[new Date().getDay()];
}

export function getDateLabel(): string {
  const today = new Date();
  return `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`;
}
