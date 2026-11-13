import type { Challenge } from "@/lib/challenges";

interface ChallengeCardProps {
  challenge: Challenge;
}

const categoryLabel: Record<string, string> = {
  ngôn_ngữ: "Ngôn Ngữ",
  di_chuyển: "Di Chuyển",
  ăn_uống: "Ăn Uống",
  điện_thoại: "Điện Thoại",
  xã_hội: "Xã Hội",
};

const difficultyDots: Record<string, number> = {
  dễ: 1,
  vừa: 2,
  khó: 3,
};

export default function ChallengeCard({ challenge }: ChallengeCardProps) {
  const isCAM = challenge.type === "CAM";

  return (
    <div
      className={`relative rounded-2xl p-6 border-2 ${
        isCAM
          ? "border-[#FF4D4D] bg-[#FF4D4D]/10"
          : "border-[#00C896] bg-[#00C896]/10"
      }`}
    >
      {/* Badge loại */}
      <div className="flex items-center justify-between mb-4">
        <span
          className={`text-xs font-700 tracking-widest px-3 py-1 rounded-full font-bold uppercase ${
            isCAM
              ? "bg-[#FF4D4D] text-white"
              : "bg-[#00C896] text-[#0F0F0F]"
          }`}
        >
          {isCAM ? "🚫 CẤM" : "✅ PHẢI"}
        </span>
        <span className="text-xs text-gray-400">
          {categoryLabel[challenge.category]}
        </span>
      </div>

      {/* Nội dung thử thách */}
      <p className="text-2xl font-bold leading-tight text-white mb-5 text-balance">
        {challenge.content}
      </p>

      {/* Meta */}
      <div className="flex items-center gap-4 text-sm text-gray-400">
        <span className="flex items-center gap-1">
          ⏱ {challenge.duration}
        </span>
        <span className="flex items-center gap-1">
          {Array.from({ length: 3 }).map((_, i) => (
            <span
              key={i}
              className={`w-2 h-2 rounded-full ${
                i < difficultyDots[challenge.difficulty]
                  ? isCAM
                    ? "bg-[#FF4D4D]"
                    : "bg-[#00C896]"
                  : "bg-gray-700"
              }`}
            />
          ))}
          <span className="ml-1">{challenge.difficulty}</span>
        </span>
      </div>
    </div>
  );
}
