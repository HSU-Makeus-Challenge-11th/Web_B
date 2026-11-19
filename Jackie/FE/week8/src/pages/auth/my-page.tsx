import { useEffect, useState } from "react";
import { useQueries, useQuery, useQueryClient } from "@tanstack/react-query";
import { HTTPError } from "ky";
import { Link } from "@tanstack/react-router";
import { useAuthStore } from "../../stores/auth-store";
import { getMyInfo } from "../../api/members/my-page";
import { getFavorites } from "../../api/favorites/get-favorites";
import { getMovieDetail } from "../../api/movies/get-movie-detail";

interface FavoriteMovie {
  id: number;
  title: string;
  poster_path: string | null;
  release_date: string;
}

const PAGE_SIZE = 5;

function ProfileAvatar() {
  return (
    <div className="flex h-[82px] w-[82px] shrink-0 items-center justify-center rounded-full bg-[#E3E6EB]">
      <img src="/icons/person.svg" alt="프로필" className="h-[48px] w-[48px]" />
    </div>
  );
}

function FavoriteMovieCard({ movie }: { movie: FavoriteMovie }) {
  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : null;

  const releaseDate = movie.release_date
    ? movie.release_date.replaceAll("-", ".")
    : "개봉일 정보 없음";

  return (
    <Link
      to="/movies/$movieId"
      params={{ movieId: String(movie.id) }}
      className="min-w-0 no-underline"
    >
      <article className="flex w-full flex-col gap-[4px]">
        <div className="aspect-[241.6/274] w-full overflow-hidden rounded-[10px] bg-[#E3E6EB]">
          {posterUrl ? (
            <img
              src={posterUrl}
              alt={`${movie.title} 포스터`}
              className="h-full w-full object-cover transition-transform duration-200 hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-[13px] text-[#969DA8]">
              포스터 없음
            </div>
          )}
        </div>

        <div className="flex min-h-[22px] items-center">
          <p className="m-0 w-full truncate text-[14px] font-[800] leading-[17px] text-[#17191E]">
            {movie.title}
          </p>
        </div>

        <span className="text-[12px] font-[400] leading-[14px] text-[#969DA8]">
          {releaseDate}
        </span>
      </article>
    </Link>
  );
}

export function MyPage() {
  const queryClient = useQueryClient();

  const accessToken = useAuthStore((state) => state.accessToken);
  const setAccessToken = useAuthStore((state) => state.setAccessToken);

  const [page, setPage] = useState(1);

  const memberQuery = useQuery({
    queryKey: ["members", "me"],
    queryFn: getMyInfo,
    enabled: Boolean(accessToken),
    staleTime: 5 * 60 * 1000,
    retry: false,
    refetchOnWindowFocus: false,
  });

  const favoritesQuery = useQuery({
    queryKey: ["favorites", "list"],
    queryFn: getFavorites,
    enabled: Boolean(accessToken),
    retry: false,
  });

  const member = accessToken ? (memberQuery.data?.result ?? null) : null;

  const isUnauthorized =
    (memberQuery.error instanceof HTTPError &&
      memberQuery.error.response.status === 401) ||
    (favoritesQuery.error instanceof HTTPError &&
      favoritesQuery.error.response.status === 401);

  useEffect(() => {
    if (!accessToken || !isUnauthorized) return;

    setAccessToken(null);

    queryClient.removeQueries({
      queryKey: ["members", "me"],
    });

    queryClient.removeQueries({
      queryKey: ["favorites"],
    });

    queryClient.removeQueries({
      queryKey: ["ratings"],
    });
  }, [accessToken, isUnauthorized, setAccessToken, queryClient]);

  const memberError = !accessToken
    ? "로그인이 필요한 페이지입니다."
    : isUnauthorized
      ? "로그인이 만료되었습니다. 다시 로그인해주세요."
      : memberQuery.isError
        ? "회원 정보를 불러오지 못했습니다."
        : "";

  const favoriteMovieIds = accessToken
    ? [
        ...new Set(
          (favoritesQuery.data?.result ?? []).map(
            (favorite) => favorite.movieId,
          ),
        ),
      ]
    : [];

  const totalPages = Math.max(
    1,
    Math.ceil(favoriteMovieIds.length / PAGE_SIZE),
  );

  const currentPage = Math.min(page, totalPages);

  const visibleMovieIds = favoriteMovieIds.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  const movieQueries = useQueries({
    queries: visibleMovieIds.map((movieId) => ({
      queryKey: ["movies", "detail", movieId],
      queryFn: () => getMovieDetail(movieId),
      staleTime: 5 * 60 * 1000,
    })),
  });

  const visibleMovies = movieQueries.flatMap((query) =>
    query.data ? [query.data] : [],
  );

  const isMoviesLoading =
    favoritesQuery.isLoading || movieQueries.some((query) => query.isPending);

  const movieError = movieQueries.some((query) => query.isError)
    ? "일부 즐겨찾기 영화를 불러오지 못했습니다."
    : "";

  return (
    <main className="min-h-[calc(100vh-148px)] w-full bg-[#F6F7F9] font-['Pretendard']">
      <div className="mx-auto w-full max-w-[1440px] px-5 pb-[80px] pt-[24px] sm:px-8 lg:px-[80px]">
        <div className="flex w-full items-center justify-between border-b border-[#E3E6EB] pb-[20px]">
          <h1 className="m-0 text-[31px] font-[700] leading-[37px] tracking-[-1.24px] text-[#17191E]">
            내 정보
          </h1>

          <Link
            to={accessToken ? "/mypage-update" : "/login"}
            className="inline-flex h-[42px] items-center justify-center rounded-[8px] bg-[#2563EB] px-4 text-[14px] font-extrabold text-white"
          >
            정보 수정
          </Link>
        </div>

        <section className="border-b border-[#E3E6EB] py-[12px]">
          <h2 className="m-0 text-[17px] font-[700] leading-[20px] text-[#17191E]">
            기본 정보
          </h2>

          <div className="mt-[16px] flex min-h-[82px] w-full items-center gap-[28px]">
            <ProfileAvatar />

            <div className="grid w-full max-w-[760px] flex-1 grid-cols-1 gap-x-[28px] gap-y-[14px] sm:grid-cols-2">
              <div className="flex min-w-0 flex-col gap-[6px]">
                <span className="text-[11px] font-[400] leading-[13px] text-[#969DA8]">
                  닉네임
                </span>

                <strong className="break-all text-[14px] font-[700] leading-[17px] text-[#17191E]">
                  {memberQuery.isLoading
                    ? "불러오는 중..."
                    : (member?.nickname ?? "-")}
                </strong>
              </div>

              <div className="flex min-w-0 flex-col gap-[6px]">
                <span className="text-[11px] font-[400] leading-[13px] text-[#969DA8]">
                  이메일
                </span>

                <strong className="break-all text-[14px] font-[700] leading-[17px] text-[#17191E]">
                  {memberQuery.isLoading
                    ? "불러오는 중..."
                    : (member?.email ?? "-")}
                </strong>
              </div>
            </div>
          </div>

          {memberError && (
            <div className="mt-[16px] flex flex-wrap items-center gap-[12px]">
              <p className="m-0 text-[13px] text-red-500">{memberError}</p>

              {!accessToken && (
                <Link
                  to="/login"
                  className="text-[13px] font-[700] text-[#2563EB]"
                >
                  로그인하기
                </Link>
              )}
            </div>
          )}
        </section>

        <section className="pt-[28px]">
          <h2 className="m-0 text-[17px] font-[700] leading-[20px] text-[#17191E]">
            내 즐겨찾기
          </h2>

          {!accessToken ? (
            <div className="flex min-h-[260px] items-center justify-center">
              <Link
                to="/login"
                className="text-[14px] font-bold text-[#2563EB]"
              >
                로그인하고 즐겨찾기를 확인하세요.
              </Link>
            </div>
          ) : isMoviesLoading ? (
            <div className="flex min-h-[260px] items-center justify-center">
              <p className="text-[14px] text-[#606774]">
                즐겨찾기 영화를 불러오는 중입니다.
              </p>
            </div>
          ) : favoritesQuery.isError ? (
            <div className="flex min-h-[260px] items-center justify-center">
              <p className="text-[14px] text-red-500">
                즐겨찾기 목록을 불러오지 못했습니다.
              </p>
            </div>
          ) : favoriteMovieIds.length === 0 ? (
            <div className="mt-[24px] flex min-h-[260px] flex-col items-center justify-center gap-[12px] rounded-[10px] border border-[#E3E6EB]">
              <p className="m-0 text-[14px] text-[#606774]">
                즐겨찾기한 영화가 없습니다.
              </p>

              <Link
                to="/"
                className="text-[14px] font-[700] text-[#2563EB] no-underline hover:underline"
              >
                영화 둘러보기
              </Link>
            </div>
          ) : (
            <>
              <div className="mt-[16px] grid w-full grid-cols-2 gap-x-[18px] gap-y-[24px] sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                {visibleMovies.map((movie) => (
                  <FavoriteMovieCard key={movie.id} movie={movie} />
                ))}
              </div>

              <div className="mt-[24px] flex h-[36px] w-full items-center justify-center gap-[12px]">
                <button
                  type="button"
                  aria-label="이전 페이지"
                  disabled={currentPage === 1}
                  onClick={() => setPage(currentPage - 1)}
                  className="flex h-[24px] w-[24px] items-center justify-center disabled:opacity-30"
                >
                  <img
                    src="/icons/chevron-left.svg"
                    alt=""
                    className="h-[24px] w-[24px]"
                  />
                </button>

                <span className="flex h-[36px] w-[36px] items-center justify-center rounded-[7px] bg-[#17191E] text-[13px] font-[700] text-white">
                  {currentPage}
                </span>

                <button
                  type="button"
                  aria-label="다음 페이지"
                  disabled={currentPage === totalPages}
                  onClick={() => setPage(currentPage + 1)}
                  className="flex h-[24px] w-[24px] items-center justify-center disabled:opacity-30"
                >
                  <img
                    src="/icons/chevron-right.svg"
                    alt=""
                    className="h-[24px] w-[24px]"
                  />
                </button>
              </div>
            </>
          )}

          {movieError && (
            <p className="mt-[16px] text-[13px] text-red-500">{movieError}</p>
          )}
        </section>
      </div>
    </main>
  );
}
