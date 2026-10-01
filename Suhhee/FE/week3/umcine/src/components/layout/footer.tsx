export function Footer() {
  return (
    <footer className="fixed right-0 bottom-0 left-0 z-20 h-[57px] border-t border-[#e3e6eb] bg-white">
      <div className="mx-auto flex h-full w-full max-w-[1440px] items-center justify-end gap-2 px-4 py-4 sm:px-8 lg:px-20">
        <img
          className="size-6"
          src="/images/logos/tmdb-logo.svg"
          alt="TMDB"
        />
        <p className="m-0 hidden text-xs leading-none font-normal whitespace-nowrap text-[#606774] sm:block">
          This product uses the TMDB API but is not endorsed or certified by{" "}
          <a
            className="text-inherit underline"
            href="https://www.themoviedb.org/?language=ko"
            target="_blank"
            rel="noreferrer"
          >
            TMDB
          </a>
          .
        </p>
      </div>
    </footer>
  );
}
