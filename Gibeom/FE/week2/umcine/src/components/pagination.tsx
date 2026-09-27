interface PaginationProps {
  currentPage: number;
  onPageChange: (page: number) => void;
}

const pages = [1, 2, 3, 4, 5];

export function Pagination({
  currentPage,
  onPageChange,
}: PaginationProps) {
  return (
    <nav className="pagination" aria-label="영화 목록 페이지">
      {pages.map((page) => (
        <button
          className={`page-button${currentPage === page ? " active" : ""}`}
          type="button"
          aria-current={currentPage === page ? "page" : undefined}
          onClick={() => onPageChange(page)}
          key={page}
        >
          {page}
        </button>
      ))}
    </nav>
  );
}
