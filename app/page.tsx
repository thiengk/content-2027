import { getTodayChallenge, getDayLabel, getDateLabel } from "@/lib/challenges";
import ChallengeCard from "@/components/ChallengeCard";
import ParticipantCount from "@/components/ParticipantCount";
import AcceptChallenge from "@/components/AcceptChallenge";

function getDateKey(): string {
  const today = new Date();
  return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
}

export default function Home() {
  const challenge = getTodayChallenge();
  const dayLabel = getDayLabel();
  const dateLabel = getDateLabel();
  const dateKey = getDateKey();

  return (
    <main className="min-h-screen flex flex-col items-center justify-start px-4 py-10">
      {/* Max width container — giống mobile khi trên desktop */}
      <div className="w-full max-w-sm flex flex-col gap-6">

        {/* Header */}
        <div className="text-center">
          <h1 className="text-xl font-bold tracking-wide">
            Dám Thử Không Nào 🔥
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            {dayLabel} — {dateLabel}
          </p>
        </div>

        {/* Challenge card */}
        <ChallengeCard challenge={challenge} />

        {/* Participant count */}
        <ParticipantCount />

        {/* Divider */}
        <div className="border-t border-gray-800" />

        {/* Form nhập tên + ID → Tôi Chấp Nhận */}
        <AcceptChallenge challenge={challenge} dateKey={dateKey} />

        {/* Footer */}
        <p className="text-center text-gray-600 text-xs pb-4">
          damthukhongnao.com · Thử thách mới mỗi ngày
        </p>
      </div>
    </main>
  );
}
