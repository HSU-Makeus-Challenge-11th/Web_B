import { Link } from "@tanstack/react-router";

export default function Header() {
  return (
    <header className="flex h-[91px] w-[1440px] items-center justify-between border-b border-[#E3E6EB] bg-[#FFFFFF] box-border px-[80px] py-[24px]">
      <div className="flex h-[32px] w-[308px] items-center gap-[42px]">
        <div className="flex h-[32px] w-[116px] items-center gap-[10px]">
          <img className="h-[24px] w-[24px]" src="/icons/movie.svg" alt="" />
          <p className="m-0 h-[24px] w-[74px] font-['Pretendard'] text-[20px] font-[900] leading-[100%] tracking-[-0.7px] text-[#17191E]">
            UMCine
          </p>
        </div>

        <nav className="flex h-[17px] w-[150px] gap-[30px]">
          <Link
            to="/"
            className="h-[17px] w-[25px] text-center font-['Pretendard'] text-[14px] font-[700] leading-[100%] text-[#17191E]"
          >
            영화
          </Link>

          <Link
            to="/search"
            className="h-[17px] w-[25px] text-center font-['Pretendard'] text-[14px] font-[700] leading-[100%] text-[#606774]"
          >
            검색
          </Link>

          <a
            href="#"
            className="h-[17px] w-[40px] text-center font-['Pretendard'] text-[14px] font-[700] leading-[100%] text-[#606774]"
          >
            내 정보
          </a>
        </nav>
      </div>

      <div className="flex h-[42px] w-[123px] gap-[10px]">
        <button className="flex h-[42px] w-[42px] items-center justify-center rounded-[8px] border border-[#ddd] bg-[#FFFFFF] px-[6px] py-[1px]">
          <img
            className="h-[24px] w-[24px]"
            src="/icons/search.svg"
            alt="검색"
          />
        </button>

        <button className="flex h-[42px] w-[71px] items-center justify-center rounded-[8px] border border-[#ddd] bg-[#2563EB] px-[16px]">
          <p className="m-0 h-[17px] w-[37px] font-['Pretendard'] text-[14px] font-[700] text-[#FFFFFF]">
            로그인
          </p>
        </button>
      </div>
    </header>
  );
}
