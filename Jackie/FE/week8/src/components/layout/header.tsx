import { Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { getMyInfo } from "../../api/members/my-page";
import { useAuthStore } from "../../stores/auth-store";

export default function Header() {
  const accessToken = useAuthStore((state) => state.accessToken);

  const meQuery = useQuery({
    queryKey: ["members", "me"],
    queryFn: getMyInfo,
    enabled: Boolean(accessToken),
    staleTime: 5 * 60 * 1000,
    retry: false,
  });

  return (
    <header className="h-[91px] w-full border-b border-[#E3E6EB] bg-white">
      <div className="mx-auto box-border flex h-full w-full max-w-[1440px] items-center justify-between px-5 sm:px-8 lg:px-[80px]">
        <div className="flex h-[32px] items-center gap-[42px]">
          <Link
            to="/"
            className="flex h-[32px] items-center gap-[10px] no-underline"
          >
            <img className="h-[24px] w-[24px]" src="/icons/movie.svg" alt="" />
            <p className="m-0 font-['Pretendard'] text-[20px] font-[900] leading-[100%] tracking-[-0.7px] text-[#17191E]">
              UMCine
            </p>
          </Link>

          <nav className="hidden items-center gap-[30px] md:flex">
            <Link
              to="/"
              className="font-['Pretendard'] text-[14px] font-[700] leading-[100%] text-[#17191E] no-underline"
            >
              영화
            </Link>

            <Link
              to="/search"
              className="font-['Pretendard'] text-[14px] font-[700] leading-[100%] text-[#606774] no-underline"
            >
              검색
            </Link>

            <Link
              to="/mypage"
              className="font-['Pretendard'] text-[14px] font-[700] leading-[100%] text-[#606774] no-underline"
            >
              내 정보
            </Link>
          </nav>
        </div>

        <div className="flex h-[42px] items-center gap-[10px]">
          <Link
            to="/search"
            aria-label="영화 검색"
            className="flex h-[42px] w-[42px] items-center justify-center rounded-[8px] border border-[#E3E6EB] bg-white"
          >
            <img className="h-[24px] w-[24px]" src="/icons/search.svg" alt="" />
          </Link>

          {!accessToken ? (
            <Link
              to="/login"
              className="flex h-[42px] w-[71px] items-center justify-center rounded-[8px] border border-[#2563EB] bg-[#2563EB] px-[16px] no-underline"
            >
              <span className="font-['Pretendard'] text-[14px] font-[700] text-white">
                로그인
              </span>
            </Link>
          ) : meQuery.isLoading ? (
            <span
              role="status"
              aria-label="내 정보 조회 중"
              className="h-[42px] w-[104px] animate-pulse rounded-[8px] bg-gray-200"
            />
          ) : (
            <Link
              to="/mypage"
              className="flex h-[42px] items-center justify-center rounded-[8px] border border-[#2563EB] bg-[#2563EB] px-[16px] font-['Pretendard'] text-[14px] font-[700] text-white no-underline"
            >
              마이페이지
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
