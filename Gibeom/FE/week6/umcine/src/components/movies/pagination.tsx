import { cn } from "../../utils/cn";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const visiblePageCount = Math.min(totalPages, 5);
  const lastStartPage = Math.max(totalPages - visiblePageCount + 1, 1);
  const startPage = Math.min(Math.max(currentPage - 2, 1), lastStartPage);
  const pages = Array.from(
    { length: visiblePageCount },
    (_, index) => startPage + index,
  );

  return (
    <nav className="mt-10 flex justify-center gap-2" aria-label="영화 목록 페이지">
      {pages.map((page) => (
        <button
          className={cn(
            "size-[34px] cursor-pointer rounded-md border p-0 text-[13px] font-bold focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-blue-500/40",
            currentPage === page
              ? "border-[#171a21] bg-[#171a21] text-white"
              : "border-[#e5e7eb] bg-white text-[#555d6c]",
          )}
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
