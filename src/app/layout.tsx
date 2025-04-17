import Providers from "@/providers/RQProviders";
import type { Metadata } from "next";
import localFont from "next/font/local";
import { ToastContainer } from "react-toastify";
import HeaderWithZustand from "./(home)/components/home-zustand";
import Navigation from "./(layout)/navigation";
import "./globals.css";

// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });
// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });

const ownGlyph = localFont({
  src: "./fonts/ownglyph.ttf",
  variable: "--font-own-glyph",
  weight: "100",
});

const pretendard = localFont({
  src: "./fonts/PretendardVariable.woff2",
  variable: "--font-pretendard",
  weight: "400 700",
});

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
        url: "/images/Joy.png",
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
      <body
        className={`${pretendard.variable} ${ownGlyph.variable} antialiased`}
      >
        <Providers>
          <HeaderWithZustand />
          <div className="pb-18">{children}</div>
        </Providers>
        <ToastContainer position="top-right" autoClose={3000} />
        <Navigation />
      </body>
    </html>
  );
}
