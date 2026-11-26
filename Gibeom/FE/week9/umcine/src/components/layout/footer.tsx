export function Footer() {
  return (
    <footer className="flex min-h-[50px] items-center justify-center gap-1 border-t border-[#e5e7eb] bg-white px-6 text-[10px] text-[#727b8b]">
      {/* eslint-disable-next-line @next/next/no-img-element -- 22px 고정 크기 SVG 로고라 최적화 이점이 없음 */}
      <img className="mr-0.5 h-auto w-[22px]" src="/icons/tmdb-logo.svg" alt="TMDB" />
      <span>This product uses the TMDB API but is not endorsed or certified by</span>
      <a
        className="text-[#5d6676] underline focus-visible:rounded-sm focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-blue-500/40"
        href="https://www.themoviedb.org/"
        target="_blank"
        rel="noreferrer"
      >
        TMDB.
      </a>
    </footer>
  );
}
