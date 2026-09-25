import "./header.css";

export default function Header() {
  return (
    <header className="header">
      <div className="brand-row">
        <div className="brand">
          <img src="/icons/movie.svg"/>
            <p className="header-title">UMCine</p>
        </div>

        <nav className="header-nav">
          <a href="#" className="text-movie">영화</a>
          <a href="#" className="text-search">검색</a>
          <a href="#" className="text-info">내 정보</a>
        </nav>
      </div>

      <div className="top-actions">
        <button className="search">
          <img src="/icons/search.svg"/>
        </button>
        <button className="login"><p>로그인</p></button>
      </div>
    </header>
  );
}