export function DataCredits() {
  return (
    <footer className="border-t border-gray-200 bg-white px-5 py-7">
      <section className="mx-auto max-w-[1120px] text-xs leading-5 text-gray-500" aria-labelledby="data-credits-title">
        <h2 id="data-credits-title" className="mb-3 font-bold text-gray-700">데이터 출처</h2>
        <a href="https://www.themoviedb.org" target="_blank" rel="noreferrer" aria-label="TMDB 홈페이지 (새 창)">
          <img src="/images/logos/tmdb-logo.svg" alt="TMDB" className="mb-3 h-auto w-24" />
        </a>
        <p>영화 정보와 이미지는 TMDB에서 제공합니다.</p>
        <p>This product uses the TMDB API but is not endorsed or certified by TMDB.</p>
      </section>
    </footer>
  );
}
