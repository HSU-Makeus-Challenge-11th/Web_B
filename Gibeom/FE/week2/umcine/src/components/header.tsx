export function Header() {
  return (
    <header className="site-header">
      <div className="header-inner">
        <a className="brand" href="#movie-list-title" aria-label="UMCine 홈">
          <span className="brand-mark" aria-hidden="true">
            <img src="/images/icons/movie.svg" alt="" />
          </span>
          <span>UMCine</span>
        </a>

        <nav className="primary-nav" aria-label="주요 메뉴">
          <ul>
            <li>
              <a className="active" href="#movie-list-title" aria-current="page">
                영화
              </a>
            </li>
            <li>
              <a href="#search">검색</a>
            </li>
            <li>
              <a href="#profile">내 정보</a>
            </li>
          </ul>
        </nav>

        <div className="header-actions">
          <button className="icon-button" type="button" aria-label="영화 검색">
            <img src="/images/icons/search.svg" alt="" />
          </button>
          <button className="login-button" type="button">
            로그인
          </button>
        </div>
      </div>
    </header>
  );
}
