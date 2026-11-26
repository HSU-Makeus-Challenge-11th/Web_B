"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useMeQuery } from "../../hooks/use-me-query";
import { useAuthHydrated, useAuthStore } from "../../stores/auth-store";
import { cn } from "../../utils/cn";

export function Header() {
  const pathname = usePathname();
  const isMovieRoute = pathname === "/" || pathname.startsWith("/movies/");
  const isSearchRoute = pathname === "/search";
  const isProfileRoute = pathname.startsWith("/mypage");
  const isAuthHydrated = useAuthHydrated();
  const accessToken = useAuthStore((state) => state.accessToken);
  const setAccessToken = useAuthStore((state) => state.setAccessToken);
  const meQuery = useMeQuery();
  const router = useRouter();

  const handleLogout = () => {
    // 토큰을 지우면 auth store가 내 정보·즐겨찾기 캐시도 함께 비움
    setAccessToken(null);
    router.push("/");
  };

  const accountLinkClass =
    "inline-flex h-10 min-w-14 items-center justify-center rounded-[7px] border-0 bg-[#2463eb] px-2 text-xs font-bold text-white no-underline hover:brightness-95 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-blue-500/40 min-[481px]:px-4 min-[481px]:text-sm";
  const navigationLinkClass =
    "inline-flex h-[70px] items-center border-b-2 text-[15px] font-semibold no-underline min-[481px]:h-[82px] focus-visible:rounded-sm focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-blue-500/40";

  return (
    <header className="h-[70px] shrink-0 basis-[70px] border-b border-[#e5e7eb] bg-white min-[481px]:h-[82px] min-[481px]:basis-[82px]">
      <div className="mx-auto flex h-full w-[min(1170px,calc(100%-32px))] items-center min-[721px]:w-[min(1170px,calc(100%-48px))]">
        <Link
          className="inline-flex items-center gap-[9px] text-[17px] font-extrabold tracking-[-0.04em] text-[#171a21] no-underline focus-visible:rounded-sm focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-blue-500/40 min-[481px]:text-xl"
          href="/"
          aria-label="UMCine 홈"
        >
          <span
            className="grid size-[27px] place-items-center rounded-lg border-2 border-[#171a21] min-[481px]:size-[30px]"
            aria-hidden="true"
          >
            <Image className="size-[21px]" src="/icons/movie.svg" alt="" width={21} height={21} />
          </span>
          <span>UMCine</span>
        </Link>

        <nav className="ml-5 min-[481px]:ml-7 min-[721px]:ml-[70px]" aria-label="주요 메뉴">
          <ul className="m-0 flex list-none items-center gap-[18px] p-0 min-[721px]:gap-[38px]">
            <li className="hidden min-[481px]:block">
              <Link
                className={cn(
                  navigationLinkClass,
                  isMovieRoute
                    ? "border-[#171a21] text-[#171a21]"
                    : "border-transparent text-[#555d6c]",
                )}
                href="/"
              >
                영화
              </Link>
            </li>
            <li>
              <Link
                className={cn(
                  navigationLinkClass,
                  isSearchRoute
                    ? "border-[#171a21] text-[#171a21]"
                    : "border-transparent text-[#555d6c]",
                )}
                href="/search"
              >
                검색
              </Link>
            </li>
            <li>
              <Link
                className={cn(navigationLinkClass, isProfileRoute ? "border-[#171a21] text-[#171a21]" : "border-transparent text-[#555d6c]")}
                href="/mypage"
              >
                내 정보
              </Link>
            </li>
          </ul>
        </nav>

        <div className="ml-auto flex items-center gap-3">
          <Link
            className="hidden size-10 place-items-center rounded-lg border border-[#d9dee7] bg-white p-0 no-underline hover:brightness-95 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-blue-500/40 min-[481px]:grid"
            href="/search"
            aria-label="영화 검색"
          >
            <Image className="size-[22px] opacity-70" src="/icons/search.svg" alt="" width={22} height={22} />
          </Link>
          {!isAuthHydrated ? (
            // 토큰 복원 전: 서버 HTML과 같은 자리 표시
            <span className="h-10 w-24 animate-pulse rounded-lg bg-gray-200" aria-hidden="true" />
          ) : !accessToken ? (
            <Link className={accountLinkClass} href="/login">
              로그인
            </Link>
          ) : meQuery.isLoading ? (
            <span
              className="h-10 w-24 animate-pulse rounded-lg bg-gray-200"
              aria-label="내 정보를 불러오는 중"
            />
          ) : (
            <>
              <Link className={accountLinkClass} href="/mypage">
                마이페이지
              </Link>
              <button
                className="h-10 cursor-pointer rounded-[7px] border border-[#d9dee7] bg-white px-2 text-xs font-bold text-[#555d6c] hover:brightness-95 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-blue-500/40 min-[481px]:px-3 min-[481px]:text-sm"
                type="button"
                onClick={handleLogout}
              >
                로그아웃
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
