import { useAuthStore } from "../../stores/auth-store";
import { useMeQuery } from "../../hooks/use-personal";
import { Link } from "@tanstack/react-router";

export function Header() {
  const token = useAuthStore(state => state.accessToken);
  const me = useMeQuery();
  return (
    <header className="relative z-10 h-[91px] border-b border-[#e3e6eb] bg-white">
      <div className="mx-auto flex h-full w-full max-w-[1440px] items-center justify-between px-4 py-6 sm:px-8 lg:px-20">
        <div className="flex items-center gap-5 sm:gap-[42px]">
          <Link
            className="flex items-center gap-2.5 text-[#17191e] no-underline outline-none focus-visible:ring-3 focus-visible:ring-blue-600/35"
            to="/"
            aria-label="UMCine 홈"
          >
            <span className="flex size-8 items-center justify-center rounded-lg border-2 border-[#17191e]">
              <img className="size-6" src="/icons/movie.svg" alt="" />
            </span>
            <span className="hidden text-xl leading-none font-black tracking-[-0.7px] sm:inline">
              UMCine
            </span>
          </Link>

          <nav className="flex items-center gap-5 whitespace-nowrap sm:gap-[30px]" aria-label="주요 메뉴">
            <Link
              className="text-sm leading-none font-bold text-[#606774] no-underline outline-none focus-visible:ring-3 focus-visible:ring-blue-600/35"
              activeProps={{
                className: "text-[#17191e] underline underline-offset-4",
              }}
              activeOptions={{ exact: true }}
              to="/"
            >
              영화
            </Link>
            <Link
              className="text-sm leading-none font-bold text-[#606774] no-underline outline-none focus-visible:ring-3 focus-visible:ring-blue-600/35"
              activeProps={{
                className: "text-[#17191e] underline underline-offset-4",
              }}
              to="/search"
            >
              검색
            </Link>
            <Link to="/me" className="text-sm font-bold text-[#606774]">내 정보</Link>
            <Link
              className="hidden text-sm leading-none font-bold text-[#606774] no-underline outline-none focus-visible:ring-3 focus-visible:ring-blue-600/35 lg:inline"
              activeProps={{
                className: "text-[#17191e] underline underline-offset-4",
              }}
              to="/api-check"
            >
              API 확인
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-2.5">
          <Link
            className="flex size-[42px] items-center justify-center rounded-lg border border-[#e3e6eb] bg-white outline-none hover:bg-[#eef0f3] focus-visible:ring-3 focus-visible:ring-blue-600/35"
            to="/search"
            aria-label="영화 검색"
          >
            <img className="size-6 opacity-60" src="/icons/search.svg" alt="" />
          </Link>

          {token ? <><Link to="/me" className="hidden text-sm font-bold sm:inline">{me.data?.nickname ?? "내 정보"}</Link><button type="button" className="shrink-0 whitespace-nowrap text-sm" onClick={() => useAuthStore.getState().setAccessToken(null)}>로그아웃</button></> : <Link
            to="/login"
            className="hidden h-[42px] cursor-pointer rounded-lg border border-white bg-[#2563eb] px-4 text-sm leading-none font-extrabold text-white outline-none hover:bg-[#1d4ed8] focus-visible:ring-3 focus-visible:ring-blue-600/35 sm:flex sm:items-center sm:justify-center"
          >
            로그인
          </Link>}
        </div>
      </div>
    </header>
  );
}
