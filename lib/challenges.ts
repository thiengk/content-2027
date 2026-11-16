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
  title: string;      // tên ngắn, to — VD: "Nói Không OK"
  content: string;    // mô tả chi tiết
  category: Category;
  difficulty: Difficulty;
  duration: Duration;
}

export const challenges: Challenge[] = [
  // CẤM — Ngôn ngữ
  {
    id: 1, type: "CAM",
    title: "Nói Không OK",
    content: 'Cả ngày không được phép nói từ "OK" trong bất kỳ cuộc trò chuyện nào, kể cả nhắn tin.',
    category: "ngôn_ngữ", difficulty: "vừa", duration: "cả ngày",
  },
  {
    id: 2, type: "CAM",
    title: "Cấm Ừ Được",
    content: 'Không được nói "ừ" hoặc "được" cả ngày. Phải thay bằng câu trả lời đầy đủ.',
    category: "ngôn_ngữ", difficulty: "khó", duration: "cả ngày",
  },
  {
    id: 3, type: "CAM",
    title: "Không Emoji",
    content: "Cả ngày nhắn tin không được dùng bất kỳ emoji nào. Chỉ dùng chữ thuần túy.",
    category: "ngôn_ngữ", difficulty: "dễ", duration: "cả ngày",
  },
  // PHẢI — Ngôn ngữ
  {
    id: 4, type: "PHAI",
    title: "Cảm Ơn Thật Lòng",
    content: 'Phải nói "cảm ơn" với mọi người phục vụ hôm nay — shipper, thu ngân, bảo vệ.',
    category: "ngôn_ngữ", difficulty: "dễ", duration: "cả ngày",
  },
  // CẤM — Di chuyển
  {
    id: 5, type: "CAM",
    title: "Không Xe Công Nghệ",
    content: "Cấm gọi Grab, Be, Gojek cả ngày. Phải tự di chuyển bằng phương tiện khác.",
    category: "di_chuyển", difficulty: "vừa", duration: "cả ngày",
  },
  {
    id: 6, type: "CAM",
    title: "Cấm Thang Máy",
    content: "Không được đi thang máy cả ngày, dù lên mấy tầng. Phải leo cầu thang bộ.",
    category: "di_chuyển", difficulty: "vừa", duration: "cả ngày",
  },
  {
    id: 7, type: "CAM",
    title: "Không Google Maps",
    content: "Cả ngày không được dùng Google Maps hay bất kỳ app bản đồ nào. Tự tìm đường.",
    category: "di_chuyển", difficulty: "khó", duration: "cả ngày",
  },
  // PHẢI — Di chuyển
  {
    id: 8, type: "PHAI",
    title: "Đi Bộ Một Đoạn",
    content: "Phải đi bộ ít nhất một đoạn trong ngày. Không phải đi từ đầu đến cuối, chỉ cần bắt đầu.",
    category: "di_chuyển", difficulty: "dễ", duration: "cả ngày",
  },
  {
    id: 9, type: "PHAI",
    title: "Con Ngõ Mới",
    content: "Phải khám phá một con ngõ hoặc con đường chưa từng đặt chân đến. Chụp ảnh lại.",
    category: "di_chuyển", difficulty: "vừa", duration: "cả ngày",
  },
  // CẤM — Ăn uống
  {
    id: 10, type: "CAM",
    title: "Không Order Online",
    content: "Cấm order đồ ăn qua app cả ngày. Muốn ăn gì phải tự ra ngoài mua.",
    category: "ăn_uống", difficulty: "vừa", duration: "cả ngày",
  },
  {
    id: 11, type: "CAM",
    title: "Ăn Không Điện Thoại",
    content: "Mỗi bữa ăn hôm nay không được nhìn vào điện thoại, từ lúc ngồi xuống đến khi xong.",
    category: "ăn_uống", difficulty: "dễ", duration: "cả ngày",
  },
  // PHẢI — Ăn uống
  {
    id: 12, type: "PHAI",
    title: "Quán Chưa Từng Đến",
    content: "Phải ăn tại một quán hoàn toàn mới, chưa bao giờ đặt chân vào. Không được quay lại quán quen.",
    category: "ăn_uống", difficulty: "dễ", duration: "cả ngày",
  },
  {
    id: 13, type: "PHAI",
    title: "Gọi Món Mù",
    content: "Phải gọi món mà không được nhìn menu trước. Hỏi nhân viên hoặc chỉ vào món bất kỳ.",
    category: "ăn_uống", difficulty: "vừa", duration: "cả ngày",
  },
  // CẤM — Điện thoại
  {
    id: 14, type: "CAM",
    title: "Không TikTok",
    content: "Cấm mở TikTok cả ngày. Nếu tay run muốn mở, hãy làm gì đó thực tế thay thế.",
    category: "điện_thoại", difficulty: "khó", duration: "cả ngày",
  },
  {
    id: 15, type: "CAM",
    title: "Sáng Không Điện Thoại",
    content: "Không được check điện thoại trong 2 tiếng đầu sau khi thức dậy buổi sáng.",
    category: "điện_thoại", difficulty: "khó", duration: "2h",
  },
  // PHẢI — Xã hội
  {
    id: 16, type: "PHAI",
    title: "Nói Chuyện Người Lạ",
    content: "Phải chủ động bắt chuyện với ít nhất một người lạ hôm nay. Không tính hỏi đường.",
    category: "xã_hội", difficulty: "khó", duration: "cả ngày",
  },
  {
    id: 17, type: "PHAI",
    title: "Khen Thật Lòng",
    content: "Phải khen một người cụ thể, thật lòng, không phải lịch sự xã giao. Nhìn vào mắt khi khen.",
    category: "xã_hội", difficulty: "dễ", duration: "cả ngày",
  },
  {
    id: 18, type: "PHAI",
    title: "Trò Chuyện Hàng Rong",
    content: "Phải dừng lại và nói chuyện với người bán hàng rong ít nhất 2 phút. Hỏi về cuộc sống của họ.",
    category: "xã_hội", difficulty: "vừa", duration: "cả ngày",
  },
  // CẤM — Xã hội
  {
    id: 19, type: "CAM",
    title: "Không Phàn Nàn",
    content: "Cấm phàn nàn bất cứ điều gì cả ngày. Mọi vấn đề chỉ được giải quyết, không được than.",
    category: "xã_hội", difficulty: "khó", duration: "cả ngày",
  },
  // PHẢI — Xã hội (đặc biệt)
  {
    id: 20, type: "PHAI",
    title: "Nụ Cười Người Lạ",
    content: "Phải mỉm cười thật với người lạ đầu tiên nhìn vào mắt bạn. Không được nhìn xuống trốn.",
    category: "xã_hội", difficulty: "vừa", duration: "cả ngày",
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
