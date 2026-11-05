import { Link, useRouterState } from "@tanstack/react-router";
import { cn } from "../../utils/cn";

export function Header() {
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  });
  const isMovieRoute = pathname === "/" || pathname.startsWith("/movies/");
  const isSearchRoute = pathname === "/search";

  const navigationLinkClass =
    "inline-flex h-[70px] items-center border-b-2 text-[15px] font-semibold no-underline min-[481px]:h-[82px] focus-visible:rounded-sm focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-blue-500/40";

  return (
    <header className="h-[70px] shrink-0 basis-[70px] border-b border-[#e5e7eb] bg-white min-[481px]:h-[82px] min-[481px]:basis-[82px]">
      <div className="mx-auto flex h-full w-[min(1170px,calc(100%-32px))] items-center min-[721px]:w-[min(1170px,calc(100%-48px))]">
        <Link
          className="inline-flex items-center gap-[9px] text-[17px] font-extrabold tracking-[-0.04em] text-[#171a21] no-underline focus-visible:rounded-sm focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-blue-500/40 min-[481px]:text-xl"
          to="/"
          aria-label="UMCine 홈"
        >
          <span
            className="grid size-[27px] place-items-center rounded-lg border-2 border-[#171a21] min-[481px]:size-[30px]"
            aria-hidden="true"
          >
            <img className="size-[21px]" src="/icons/movie.svg" alt="" />
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
                to="/"
                activeOptions={{ exact: true }}
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
                to="/search"
              >
                검색
              </Link>
            </li>
            <li className="hidden min-[721px]:block">
              <span
                className="inline-flex h-[82px] cursor-not-allowed items-center text-[15px] font-semibold text-[#a3a9b3]"
                aria-disabled="true"
              >
                내 정보
              </span>
            </li>
          </ul>
        </nav>

        <div className="ml-auto flex items-center gap-3">
          <Link
            className="grid size-10 place-items-center rounded-lg border border-[#d9dee7] bg-white p-0 no-underline hover:brightness-95 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-blue-500/40"
            to="/search"
            aria-label="영화 검색"
          >
            <img className="size-[22px] opacity-70" src="/icons/search.svg" alt="" />
          </Link>
          <button
            className="hidden h-10 min-w-16 cursor-pointer rounded-[7px] border-0 bg-[#2463eb] px-4 text-sm font-bold text-white hover:brightness-95 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-blue-500/40 min-[721px]:block"
            type="button"
          >
            로그인
          </button>
        </div>
      </div>
    </header>
  );
}
