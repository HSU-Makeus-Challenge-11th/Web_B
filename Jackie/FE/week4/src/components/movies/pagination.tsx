export default function Pagination() {
  return (
    <div className="flex w-[1280px] h-[36px] justify-center items-center m-[12px]">
      <div className="flex w-[196px] h-[36px] items-center gap-[4px]">
        <button className="w-[24px] h-[24px] border-none bg-transparent bg-none">
          <img
            className="w-[24px] h-[24px]"
            src="/icons/chevron-left.svg"
            alt="이전"
          />
        </button>

        <button className="h-[36px] w-[36px] rounded-[7px] border-none bg-transparent px-[6px] py-[1px] text-[#17191e]">
          1
        </button>
        <button className="h-[36px] w-[36px] rounded-[7px] border-none bg-transparent px-[6px] py-[1px] text-[#17191e]">
          2
        </button>
        <button className="h-[36px] w-[36px] rounded-[7px] border-none bg-transparent px-[6px] py-[1px] text-[#17191e]">
          3
        </button>
        <button className="h-[36px] w-[36px] rounded-[7px] border-none bg-transparent px-[6px] py-[1px] text-[#17191e]">
          4
        </button>
        <button className="h-[36px] w-[36px] rounded-[7px] border-none bg-transparent px-[6px] py-[1px] text-[#17191e]">
          5
        </button>

        <button className="w-[24px] h-[24px] p-0 border-none bg-transparent">
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
