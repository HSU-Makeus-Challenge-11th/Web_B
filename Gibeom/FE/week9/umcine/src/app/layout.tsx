import type { Metadata } from "next";
import { Inter, Noto_Sans_KR } from "next/font/google";
import { Suspense, type ReactNode } from "react";
import { Footer } from "../components/layout/footer";
import { Header } from "../components/layout/header";
import { Providers } from "./providers";
import "./globals.css";

// next/font는 빌드할 때 폰트 파일을 내려받아 같은 서버에서 제공함 (Google로 따로 요청하지 않음)
// 영문은 Inter, 한글은 Noto Sans KR. CSS 변수로 넘겨 globals.css의 font-family에서 사용
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
// 한글 글자 파일은 수가 많아 미리 불러오지 않고, 화면에 쓰인 글자 범위만 그때 받음
const notoSansKr = Noto_Sans_KR({ subsets: ["latin"], variable: "--font-noto-sans-kr", preload: false });

export const metadata: Metadata = {
  // 하위 페이지가 title만 정하면 "영화 검색 | UMCine"처럼 붙음
  title: { default: "UMCine", template: "%s | UMCine" },
  description: "TMDB 영화 정보를 찾아보고 즐겨찾기와 평점을 남기는 서비스예요.",
  icons: { icon: "/icons/favicon.svg" },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko" className={`${inter.variable} ${notoSansKr.variable}`}>
      <body>
        <Providers>
          <div className="flex min-h-screen flex-col bg-white">
            {/* Header는 usePathname()으로 현재 URL을 읽음. 동적 경로에서는 요청 시점에만 알 수 있어
                Suspense로 감싸야 나머지를 미리 렌더링할 수 있음 */}
            <Suspense fallback={<div className="h-[70px] shrink-0 border-b border-[#e5e7eb] bg-white min-[481px]:h-[82px]" />}>
              <Header />
            </Suspense>
            {children}
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
