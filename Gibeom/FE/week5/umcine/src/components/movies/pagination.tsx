import { cn } from "../../utils/cn";

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
