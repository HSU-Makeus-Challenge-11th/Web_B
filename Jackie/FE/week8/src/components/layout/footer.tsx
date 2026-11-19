export default function Footer() {
  return (
    <footer className="h-[57px] w-full border-t border-solid border-[#E3E6EB] bg-white">
      <div className="mx-auto flex h-full w-full max-w-[1440px] box-border items-center justify-end gap-[8px] px-5 py-[16px] sm:px-8 lg:px-[80px]">
        <img
          className="h-[24px] w-[24px] shrink-0"
          src="/images/logos/tmdb-logo.svg"
          alt="TMDB"
        />

        <p className="m-0 font-['Pretendard_Variable'] text-[12px] font-normal leading-normal text-[#606774]">
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
