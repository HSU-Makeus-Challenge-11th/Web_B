"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getMe } from "@/api/members/me";
import { useAuthStore } from "@/stores/auth-store";
import { cn } from "../../utils/cn";

export function Header() {
  const accessToken = useAuthStore((state) => state.accessToken);
  const pathname = usePathname() ?? "";
  const meQuery = useQuery({
    queryKey: ["members", "me"],
    queryFn: ({ signal }) => getMe(signal),
    enabled: Boolean(accessToken),
    staleTime: 5 * 60 * 1000,
    retry: false,
  });
  const isAccountPage = ["/signup", "/login", "/profile", "/profile-edit"].includes(
    pathname.replace(/\/$/, ""),
  );
  const navClass = (href: string) =>
    pathname === href || (href !== "/" && pathname.startsWith(`${href}/`))
      ? "text-indigo-600"
      : undefined;

  return (
    <header className="sticky top-0 z-20 border-b border-gray-200 bg-white/95 backdrop-blur-md">
      <nav className={cn("mx-auto flex w-[calc(100%_-_32px)] items-center justify-between gap-4", isAccountPage ? "min-h-[88px] max-w-[1280px] max-[600px]:min-h-[72px]" : "min-h-16 max-w-[1120px]")} aria-label="주요 메뉴">
        <div className="flex min-w-0 items-center gap-6 sm:gap-10">
          <Link className="inline-flex shrink-0 items-center gap-2.5 text-xl font-extrabold tracking-tight text-gray-900" href="/" aria-label="UMCine 홈">
            <span className="grid size-8 place-items-center rounded-lg border-2 border-gray-900"><img src="/icons/movie-icons/movie.svg" alt="" aria-hidden="true" className="size-6" /></span>
            <span>UMCine</span>
          </Link>
          <div className="hidden items-center gap-6 text-[13px] font-semibold text-gray-600 sm:flex">
            <Link href="/" className={navClass("/")}>영화</Link>
            <Link href="/search" className={navClass("/search")}>검색</Link>
            <Link href="/profile" className={navClass("/profile")}>내 정보</Link>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <Link href="/profile" className="text-xs font-semibold text-gray-600 sm:hidden">내 정보</Link>
          <Link href="/search" className="grid size-10 place-items-center rounded-lg border border-gray-200 max-[380px]:hidden" aria-label="영화 검색">
            <img src="/icons/movie-icons/search.svg" alt="" aria-hidden="true" className="size-5 opacity-65" />
          </Link>
          {!accessToken ? (
            <Link href="/login" className="rounded-md bg-[#4b60e8] px-4 py-2.5 text-[13px] font-bold text-white hover:bg-[#3d50d4]">로그인</Link>
          ) : meQuery.isLoading ? (
            <span className="h-10 w-24 animate-pulse rounded-lg bg-gray-200" />
          ) : (
            <Link href="/profile" className="rounded-md bg-[#4b60e8] px-4 py-2.5 text-[13px] font-bold text-white hover:bg-[#3d50d4]">마이페이지</Link>
          )}
        </div>
      </nav>
    </header>
  );
}
