function Header() {
  return (
    <header className="site-header">
      <div className="header-inner">
        <div className="brand-row">
          <a className="brand" href="#movies" aria-label="UMCine 홈">
            <span className="brand-mark">
              <img src="/icons/movie.svg" alt="" />
            </span>

            <span className="brand-name">UMCine</span>
          </a>

          <nav className="main-navigation" aria-label="주요 메뉴">
            <a className="navigation-link active" href="#movies">
              영화
            </a>
            <a className="navigation-link" href="#search">
              검색
            </a>
            <a className="navigation-link" href="#profile">
              내 정보
            </a>
          </nav>
        </div>

        <div className="header-actions">
          <button
            className="search-button"
            type="button"
            aria-label="영화 검색"
          >
            <img src="/icons/search.svg" alt="" />
          </button>

          <button className="login-button" type="button">
            로그인
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header