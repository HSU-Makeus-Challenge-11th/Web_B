export default function Footer() {
  return (
    <footer className="w-[1440px] max-w-[1440px] h-[57px] bg-[#ffffff] border-t border-soild border-[#e3e6eb]">
      <div className="max-w-[1440px] h-full mx-auto flex px-[80px] py-[16px] items-center justify-end gap-[8px] box-border">
        <img
          className="w-[24px] h-[24px]"
          src="/images/logos/tmdb-logo.svg"
          alt="TMDB"
        />

        <p className="m-0 font-['Pretendard Variable'] text-[12px] font-[400] leading-normal text-[#606774] whitespace-nowrap">
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
