const pages = [1, 2, 3, 4, 5]

function Pagination() {
  return (
    <nav className="pagination" aria-label="영화 목록 페이지">
      <button
        className="pagination-arrow"
        type="button"
        aria-label="이전 페이지"
      >
        <img src="/icons/chevron-left.svg" alt="" />
      </button>

      <div className="page-buttons">
        {pages.map((page) => (
          <button
            className={`page-button ${
              page === 1 ? 'active' : ''
            }`}
            type="button"
            key={page}
            aria-current={page === 1 ? 'page' : undefined}
          >
            {page}
          </button>
        ))}
      </div>

      <button
        className="pagination-arrow"
        type="button"
        aria-label="다음 페이지"
      >
        <img src="/icons/chevron-right.svg" alt="" />
      </button>
    </nav>
  )
}

export default Pagination