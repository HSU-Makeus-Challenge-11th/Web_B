"use client";

import { useRouter } from "next/navigation";
import { useEffect, type ReactNode } from "react";
import { useMeQuery } from "../../hooks/use-me-query";
import { useAuthStore } from "../../stores/auth-store";

export function AuthenticatedLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const accessToken = useAuthStore((state) => state.accessToken);
  const hasHydrated = useAuthStore((state) => state.hasHydrated);
  const meQuery = useMeQuery();

  useEffect(() => {
    if (hasHydrated && !accessToken) router.replace("/login");
  }, [accessToken, hasHydrated, router]);

  if (!hasHydrated || !accessToken) {
    return <main role="status" className="p-10 text-center">로그인 상태를 확인하는 중이에요.</main>;
  }
  if (meQuery.isPending) {
    return <main role="status" className="p-10 text-center">내 정보를 불러오는 중이에요.</main>;
  }
  if (meQuery.isError) {
    return (
      <main className="p-10 text-center">
        <p role="alert">내 정보를 불러오지 못했어요.</p>
        <button type="button" onClick={() => void meQuery.refetch()}>다시 시도</button>
      </main>
    );
  }

  return children;
}
