import type { Metadata } from "next";
import { Suspense, type ReactNode } from "react";
import { Footer } from "../components/layout/footer";
import { Header } from "../components/layout/header";
import { Providers } from "./providers";
import "./globals.css";

export const metadata: Metadata = {
  title: "UMCine",
  description: "TMDB 영화 정보를 찾아보고 즐겨찾기와 평점을 남기는 서비스예요.",
  icons: { icon: "/icons/favicon.svg" },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko">
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
