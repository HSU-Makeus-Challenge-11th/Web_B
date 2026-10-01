import { cn } from "../../utils/cn";

const pages = [1, 2, 3, 4, 5];

function Pagination() {
  return (
    <nav
      className="flex h-9 w-full items-center justify-center gap-3"
      aria-label="영화 목록 페이지"
    >
      <button
        className="size-6 cursor-pointer border-0 bg-transparent p-0 outline-none hover:bg-[#eef0f3] focus-visible:ring-3 focus-visible:ring-blue-600/35"
        type="button"
        aria-label="이전 페이지"
      >
        <img
          className="block size-6 opacity-65"
          src="/icons/chevron-left.svg"
          alt=""
        />
      </button>

      <div className="flex items-center gap-1">
        {pages.map((page) => (
          <button
            className={cn(
              "size-9 cursor-pointer rounded-[7px] border-0 bg-transparent p-0 text-[13px] font-bold text-[#606774] outline-none hover:bg-[#eef0f3] focus-visible:ring-3 focus-visible:ring-blue-600/35",
              page === 1 && "bg-[#17191e] text-white hover:bg-[#17191e]",
            )}
            type="button"
            key={page}
            aria-current={page === 1 ? "page" : undefined}
          >
            {page}
          </button>
        ))}
      </div>

      <button
        className="size-6 cursor-pointer border-0 bg-transparent p-0 outline-none hover:bg-[#eef0f3] focus-visible:ring-3 focus-visible:ring-blue-600/35"
        type="button"
        aria-label="다음 페이지"
      >
        <img
          className="block size-6 opacity-65"
          src="/icons/chevron-right.svg"
          alt=""
        />
      </button>
    </nav>
  );
}

export default Pagination;
