interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  page,
  totalPages,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 0) return null;

  const startPage = Math.floor((page - 1) / 5) * 5 + 1;
  const pages = Array.from(
    { length: Math.min(5, totalPages - startPage + 1) },
    (_, index) => startPage + index,
  );

  return (
    <nav className="mt-8 flex items-center justify-center gap-2" aria-label="영화 목록 페이지">
      <button
        type="button"
        className="inline-flex size-8 items-center justify-center rounded-md border-0 bg-transparent p-0 text-xs font-semibold text-gray-500 enabled:hover:bg-gray-200 aria-[current=page]:bg-zinc-900 aria-[current=page]:text-white aria-[current=page]:hover:bg-zinc-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:cursor-default disabled:opacity-35 [&_img]:size-4 [&_img]:opacity-60"
        aria-label="이전 페이지"
        disabled={page <= 1}
        onClick={() => onPageChange(page - 1)}
      >
        <img src="/icons/movie-icons/chevron-left.svg" alt="" />
      </button>

      {pages.map((pageNumber) => (
        <button
          key={pageNumber}
          type="button"
          className="inline-flex size-8 items-center justify-center rounded-md border-0 bg-transparent p-0 text-xs font-semibold text-gray-500 enabled:hover:bg-gray-200 aria-[current=page]:bg-zinc-900 aria-[current=page]:text-white aria-[current=page]:hover:bg-zinc-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:cursor-default disabled:opacity-35 [&_img]:size-4 [&_img]:opacity-60"
          aria-label={`${pageNumber}페이지`}
          aria-current={page === pageNumber ? "page" : undefined}
          onClick={() => onPageChange(pageNumber)}
        >
          {pageNumber}
        </button>
      ))}

      <button
        type="button"
        className="inline-flex size-8 items-center justify-center rounded-md border-0 bg-transparent p-0 text-xs font-semibold text-gray-500 enabled:hover:bg-gray-200 aria-[current=page]:bg-zinc-900 aria-[current=page]:text-white aria-[current=page]:hover:bg-zinc-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:cursor-default disabled:opacity-35 [&_img]:size-4 [&_img]:opacity-60"
        aria-label="다음 페이지"
        disabled={page >= totalPages}
        onClick={() => onPageChange(page + 1)}
      >
        <img src="/icons/movie-icons/chevron-right.svg" alt="" />
      </button>
    </nav>
  );
}
