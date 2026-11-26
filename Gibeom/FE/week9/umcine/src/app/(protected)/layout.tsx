import type { ReactNode } from "react";
import { AuthenticatedLayout } from "../../components/layout/authenticated-layout";

// (protected)는 URL에 포함되지 않는 Route Group
// 이 폴더의 페이지는 모두 로그인 확인 레이아웃을 거쳐 렌더링됨
export default function ProtectedLayout({ children }: { children: ReactNode }) {
  return <AuthenticatedLayout>{children}</AuthenticatedLayout>;
}
