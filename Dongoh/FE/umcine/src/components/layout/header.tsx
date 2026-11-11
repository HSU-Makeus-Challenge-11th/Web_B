import { Link, useRouterState } from "@tanstack/react-router";
import { cn } from "../../utils/cn";

export function Header() {
  const isAccountPage = useRouterState({
    select: (state) => ["/signup", "/login", "/profile", "/profile-edit"].includes(state.location.pathname.replace(/\/$/, "")),
  });

  return (
    <header className="sticky top-0 z-20 border-b border-gray-200 bg-white/95 backdrop-blur-md">
      <nav className={cn("mx-auto flex w-[calc(100%_-_32px)] items-center justify-between gap-4", isAccountPage ? "min-h-[88px] max-w-[1280px] max-[600px]:min-h-[72px]" : "min-h-16 max-w-[1120px]")} aria-label="주요 메뉴">
        <div className="flex min-w-0 items-center gap-6 sm:gap-10">
          <Link className="inline-flex shrink-0 items-center gap-2.5 text-xl font-extrabold tracking-tight text-gray-900" to="/" aria-label="UMCine 홈">
            <span className="grid size-8 place-items-center rounded-lg border-2 border-gray-900"><img src="/icons/movie-icons/movie.svg" alt="" aria-hidden="true" className="size-6" /></span>
            <span>UMCine</span>
          </Link>
          <div className="hidden items-center gap-6 text-[13px] font-semibold text-gray-600 sm:flex">
            <Link to="/" activeOptions={{ exact: true }} activeProps={{ className: "text-indigo-600" }}>영화</Link>
            <Link to="/search" activeProps={{ className: "text-indigo-600" }}>검색</Link>
            <Link to="/profile" activeProps={{ className: "text-indigo-600" }}>내 정보</Link>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <Link to="/profile" className="text-xs font-semibold text-gray-600 sm:hidden">내 정보</Link>
          <Link to="/search" className="grid size-10 place-items-center rounded-lg border border-gray-200 max-[380px]:hidden" aria-label="영화 검색">
            <img src="/icons/movie-icons/search.svg" alt="" aria-hidden="true" className="size-5 opacity-65" />
          </Link>
          <Link to="/login" className="rounded-md bg-[#4b60e8] px-4 py-2.5 text-[13px] font-bold text-white hover:bg-[#3d50d4]">로그인</Link>
        </div>
      </nav>
    </header>
  );
}
