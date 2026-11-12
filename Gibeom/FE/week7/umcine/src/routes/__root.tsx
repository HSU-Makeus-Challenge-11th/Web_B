import { createRootRoute, Outlet } from "@tanstack/react-router";
import { Header } from "../components/layout/header";

export const Route = createRootRoute({
  component: () => (
    <div className="flex min-h-screen flex-col bg-white">
      <Header />
      <Outlet />
      <footer className="flex min-h-[50px] items-center justify-center gap-1 border-t border-[#e5e7eb] bg-white px-6 text-[10px] text-[#727b8b]">
        <img
          className="mr-0.5 h-auto w-[22px]"
          src="/icons/tmdb-logo.svg"
          alt="TMDB"
        />
        <span>
          This product uses the TMDB API but is not endorsed or certified by
        </span>
        <a
          className="text-[#5d6676] underline focus-visible:rounded-sm focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-blue-500/40"
          href="https://www.themoviedb.org/"
          target="_blank"
          rel="noreferrer"
        >
          TMDB.
        </a>
      </footer>
    </div>
  ),
  notFoundComponent: () => (
    <main className="grid min-h-[420px] flex-1 place-items-center bg-[#f6f7f9] text-lg font-bold text-[#555d6c]">
      페이지를 찾을 수 없어요.
    </main>
  ),
});
