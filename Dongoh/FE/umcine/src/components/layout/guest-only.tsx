"use client";

import { useRouter } from "next/navigation";
import { useEffect, type ReactNode } from "react";
import { useAuthStore } from "@/stores/auth-store";

export function GuestOnly({ children }: { children: ReactNode }) {
  const router = useRouter();
  const accessToken = useAuthStore((state) => state.accessToken);
  const hasHydrated = useAuthStore((state) => state.hasHydrated);

  useEffect(() => {
    if (hasHydrated && accessToken) router.replace("/");
  }, [accessToken, hasHydrated, router]);

  if (!hasHydrated || accessToken) {
    return <main role="status" className="p-10 text-center">로그인 상태를 확인하는 중이에요.</main>;
  }

  return children;
}
