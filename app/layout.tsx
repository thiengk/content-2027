import type { Metadata } from "next";
import "./globals.css";
import BottomNav from "@/components/BottomNav";
import AuroraBackground from "@/components/AuroraBackground";

export const metadata: Metadata = {
  title: "Dám Thử Không Nào",
  description:
    "Mỗi ngày một thử thách — cấm hoặc bắt buộc — cả cộng đồng cùng thực hiện trong 24 tiếng.",
  openGraph: {
    title: "Dám Thử Không Nào",
    description: "Mỗi ngày một thử thách. Dám không?",
    url: "https://damthukhongnao.com",
    siteName: "Dám Thử Không Nào",
    locale: "vi_VN",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi" className="dark">
      <body className="min-h-screen text-white antialiased" style={{ background: "#07050f" }}>
        <AuroraBackground />
        {/* Content sits above aurora via z-index */}
        <div style={{ position: "relative", zIndex: 2 }}>
          {children}
        </div>
        <div style={{ position: "relative", zIndex: 10 }}>
          <BottomNav />
        </div>
      </body>
    </html>
  );
}
