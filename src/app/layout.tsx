import Providers from "@/providers/RQProviders";
import type { Metadata } from "next";
import { ToastContainer } from "react-toastify";
import HeaderWithZustand from "./(home)/components/home-zustand";
import Navigation from "./(layout)/navigation";
import "./globals.css";

export const metadata: Metadata = {
  title: "Smookie",
  description: "일기를 쓰고 감정을 분석받아 음악을 추천받는 사이트입니다.",
  openGraph: {
    title: "Smookie - 감정 분석 기반 음악 추천",
    description: "오늘의 감정에 어울리는 음악을 들어보세요.",
    url: "https://smookie.co",
    siteName: "Smookie",
    images: [
      {
        url: "/images/joy.png",
        width: 800,
        height: 600,
      },
    ],
    locale: "ko_KR",
    type: "website",
  },
  icons: {
    icon: [
      { url: "/images/joy.ico", type: "image/x-icon" },
      { url: "/images/joy.png", type: "image/png", sizes: "32x32" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="font-minsans antialiased">
        <Providers>
          <HeaderWithZustand />
          <main className="mx-auto w-[393px] lg:w-[1224px]">{children}</main>
          <Navigation />
        </Providers>
        <ToastContainer position="top-right" autoClose={3000} />
      </body>
    </html>
  );
}
