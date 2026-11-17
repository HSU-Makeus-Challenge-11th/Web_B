export function Footer() {
  return (
    <footer className="mt-auto border-t border-line bg-surface">
      <div className="mx-auto flex h-14 w-[1280px] items-center justify-end gap-2">
        <img src="/images/logos/tmdb-logo.svg" alt="TMDB" className="h-2.5 w-auto" />
        <p className="text-xs text-fg-secondary">
          This product uses the TMDB API but is not endorsed or certified by{" "}
          <a
            href="https://www.themoviedb.org"
            target="_blank"
            rel="noreferrer"
            className="underline"
          >
            TMDB
          </a>
          .
        </p>
      </div>
    </footer>
  );
}
