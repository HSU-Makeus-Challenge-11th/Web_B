import { Link, useLocation } from "@tanstack/react-router";
import { cn } from "../../utils/cn";
import { Icon } from "../common/icon";

const navLinkClassName = "text-[15px] font-medium text-fg-secondary hover:text-fg";
const activeNavLinkClassName = "font-semibold text-fg underline underline-offset-4";

export function Header() {
  const pathname = useLocation({ select: (location) => location.pathname });
  const isMoviesActive = pathname === "/" || pathname.startsWith("/movies");
  const isSearchActive = pathname.startsWith("/search");
  const isMyPageActive = pathname.startsWith("/me");

  return (
    <header className="border-b border-line bg-surface">
      <div className="mx-auto flex h-22 w-[1280px] items-center justify-between">
        <div className="flex items-center gap-10">
          <Link to="/" className="flex items-center gap-2.5">
            <span className="flex size-8 items-center justify-center rounded-lg border-2 border-fg">
              <Icon name="movie" />
            </span>
            <span className="text-[22px] font-bold tracking-tight">UMCine</span>
          </Link>

          <nav aria-label="주요 메뉴">
            <ul className="flex gap-7">
              <li>
                <Link
                  to="/"
                  className={cn(navLinkClassName, isMoviesActive && activeNavLinkClassName)}
                  aria-current={isMoviesActive ? "page" : undefined}
                >
                  영화
                </Link>
              </li>
              <li>
                <Link
                  to="/search"
                  className={cn(navLinkClassName, isSearchActive && activeNavLinkClassName)}
                  aria-current={isSearchActive ? "page" : undefined}
                >
                  검색
                </Link>
              </li>
              <li>
                <Link
                  to="/me"
                  className={cn(navLinkClassName, isMyPageActive && activeNavLinkClassName)}
                  aria-current={isMyPageActive ? "page" : undefined}
                >
                  내 정보
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/search"
            aria-label="검색"
            className="flex size-10 items-center justify-center rounded-lg border border-line hover:bg-page"
          >
            <Icon name="search" />
          </Link>
          <button
            type="button"
            className="h-10 rounded-lg bg-action px-4 text-sm font-semibold text-white hover:bg-action-hover active:bg-action-pressed"
          >
            로그인
          </button>
        </div>
      </div>
    </header>
  );
}
