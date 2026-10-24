import { Link } from "@tanstack/react-router";

export function Header() {
  return (
    <header className="app-header">
      <nav className="app-header__nav" aria-label="주요 메뉴">
        <Link className="app-header__brand" to="/">
          <img src="/icons/movie-icons/movie.svg" alt="" aria-hidden="true" />
          <span>UMC Movie</span>
        </Link>
        <div className="app-header__links">
          <Link to="/">영화</Link>
          <Link to="/search">검색</Link>
        </div>
      </nav>
    </header>
  );
}
