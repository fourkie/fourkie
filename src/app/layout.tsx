import Providers from "@/providers/RQProviders";
import type { Metadata } from "next";
import { ToastContainer } from "react-toastify";
import HeaderDesk from "./(layout)/header-desk";
import HeaderWithZustand from "./(layout)/header-zustand";
import MainContentContainer from "./(layout)/main-content-container";
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
        url: "/images/Fluffy.png",
        width: 800,
        height: 600,
      },
    ],
    locale: "ko_KR",
    type: "website",
  },
  icons: {
    icon: [
      { url: "/images/fluffy.ico", type: "image/x-icon" },
      { url: "/images/Fluffy.png", type: "image/png", sizes: "32x32" },
    ],
  },
};

// 반응형 기준 : sm-360 / md-768 / lg-1024
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="font-minsans text-grey-7 antialiased">
        <Providers>
          <HeaderWithZustand />
          <HeaderDesk />
          <MainContentContainer>{children}</MainContentContainer>
          <Navigation />
        </Providers>
        <ToastContainer position="top-right" autoClose={3000} />
      </body>
    </html>
  );
}
