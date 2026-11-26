"use client";

import { useRouter } from "next/navigation";
import { useEffect, type ReactNode } from "react";
import { useMeQuery } from "../../hooks/use-me-query";
import { useAuthHydrated, useAuthStore } from "../../stores/auth-store";

const statusClass =
  "grid min-h-[420px] flex-1 place-items-center bg-[#f6f7f9] text-lg font-bold text-[#555d6c]";

export function AuthenticatedLayout({ children }: { children: ReactNode }) {
  const isAuthHydrated = useAuthHydrated();
  const accessToken = useAuthStore((state) => state.accessToken);
  const meQuery = useMeQuery();
  const router = useRouter();

  // TanStack Router의 beforeLoad redirect 대신, 토큰이 없으면 로그인 화면으로 이동
  // (처음 들어올 때와 보는 중 401로 토큰이 지워질 때 모두)
  useEffect(() => {
    if (isAuthHydrated && !accessToken) router.replace("/login");
  }, [isAuthHydrated, accessToken, router]);

  // 토큰 복원 전에는 로그인 여부를 알 수 없으므로 판단하지 않고 로딩만 보여줌
  if (!isAuthHydrated) {
    return <main className={statusClass} role="status">로그인 정보를 확인하는 중이에요.</main>;
  }
  if (!accessToken) return null;

  // 하위 페이지가 내 정보를 바로 쓸 수 있도록 조회가 끝난 뒤 렌더링
  if (meQuery.isPending) {
    return <main className={statusClass} role="status">내 정보를 불러오는 중이에요.</main>;
  }
  if (meQuery.isError) {
    return (
      <main className={statusClass}>
        <p className="m-0" role="alert">
          내 정보를 불러오지 못했어요.
          <button className="ml-2 cursor-pointer text-base underline" type="button" onClick={() => void meQuery.refetch()}>
            다시 시도
          </button>
        </p>
      </main>
    );
  }

  return children;
}
