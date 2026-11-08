import { cn } from "../../utils/cn";
import { Icon } from "../common/icon";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const buttonClassName = "flex size-9 items-center justify-center rounded-lg";

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <nav className="flex items-center justify-center gap-1" aria-label="페이지 이동">
      <button
        type="button"
        className={cn(buttonClassName, "disabled:opacity-25")}
        aria-label="이전 페이지"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        <Icon name="chevron-left" />
      </button>

      {pages.map((page) => {
        const isCurrent = page === currentPage;

        return (
          <button
            key={page}
            type="button"
            className={cn(
              buttonClassName,
              "text-sm font-medium",
              isCurrent ? "bg-fg font-semibold text-white" : "text-fg-secondary hover:bg-line",
            )}
            aria-current={isCurrent ? "page" : undefined}
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        );
      })}

      <button
        type="button"
        className={cn(buttonClassName, "disabled:opacity-25")}
        aria-label="다음 페이지"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        <Icon name="chevron-right" />
      </button>
    </nav>
  );
}
