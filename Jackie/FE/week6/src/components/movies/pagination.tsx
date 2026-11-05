interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const startPage = Math.floor((currentPage - 1) / 5) * 5 + 1;

  const endPage = Math.min(startPage + 4, totalPages);

  const pages = Array.from(
    { length: Math.max(0, endPage - startPage + 1) },
    (_, index) => startPage + index,
  );

  return (
    <div className="flex w-[1280px] h-[36px] justify-center items-center m-[12px]">
      <div className="flex min-w-[196px] h-[36px] items-center gap-[4px]">
        <button
          type="button"
          disabled={currentPage <= 1}
          onClick={() => onPageChange(currentPage - 1)}
          className="w-[24px] h-[24px] border-none bg-transparent bg-none disabled:opacity-40"
        >
          <img
            className="w-[24px] h-[24px]"
            src="/icons/chevron-left.svg"
            alt="이전"
          />
        </button>

        {pages.map((page) => (
          <button
            key={page}
            type="button"
            onClick={() => onPageChange(page)}
            aria-current={currentPage === page ? "page" : undefined}
            className={`h-[36px] w-[36px] rounded-[7px] border-none px-[6px] py-[1px] text-[#17191e] ${
              currentPage === page ? "bg-[#E3E6EB] font-bold" : "bg-transparent"
            }`}
          >
            {page}
          </button>
        ))}

        <button
          type="button"
          disabled={currentPage >= totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          className="w-[24px] h-[24px] p-0 border-none bg-transparent disabled:opacity-40"
        >
          <img
            className="w-[24px] h-[24px]"
            src="/icons/chevron-right.svg"
            alt="다음"
          />
        </button>
      </div>
    </div>
  );
}
