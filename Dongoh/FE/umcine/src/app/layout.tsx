import type { Metadata } from "next";
import type { ReactNode } from "react";
import { DataCredits } from "@/components/layout/data-credits";
import { Header } from "@/components/layout/header";
import { Providers } from "./providers";
import "../index.css";
import "@/features/auth/signup-page.css";

export const metadata: Metadata = {
  title: "UMCine",
  description: "영화를 검색하고 즐겨찾기와 평점을 기록하는 서비스",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko">
      <body>
        <Providers>
          <Header />
          {children}
          <DataCredits />
        </Providers>
      </body>
    </html>
  );
}
