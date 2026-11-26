import Image from "next/image";
export function Footer() {
  return (
    <footer className="flex min-h-[50px] items-center justify-center gap-1 border-t border-[#e5e7eb] bg-white px-6 text-[10px] text-[#727b8b]">
      <Image className="mr-0.5 h-auto w-[22px]" src="/icons/tmdb-logo.svg" alt="TMDB" width={22} height={3} />
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
