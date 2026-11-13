import type { Metadata } from "next";
import "./globals.css";

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" className="dark">
      <body className="min-h-screen bg-[#0F0F0F] text-white antialiased">
        {children}
      </body>
    </html>
  );
}
