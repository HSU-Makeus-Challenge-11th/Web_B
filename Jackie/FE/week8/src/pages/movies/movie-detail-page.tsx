import { useState } from "react";
import { Link, useParams, useNavigate } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getMovieDetail } from "../../api/movies/get-movie-detail";
import { getMovieDetailErrorMessage } from "../../utils/movies/get-movie-detail-error-message";
import { cn } from "../../utils/cn";
import { useAuthStore } from "../../stores/auth-store";
import { getMyInfo } from "../../api/members/my-page";
import { checkFavorite } from "../../api/favorites/check-favorite";
import { createFavorite } from "../../api/favorites/create-favorite";
import { deleteFavorite } from "../../api/favorites/delete-favorite";
import { getRatings, type Rating } from "../../api/ratings/get-ratings";
import { createRating } from "../../api/ratings/create-rating";
import { updateRating } from "../../api/ratings/update-rating";
import { deleteRating } from "../../api/ratings/delete-rating";

interface RatingFormProps {
  movieId: number;
  rating?: Rating;
  accessToken: string | null;
}

function RatingForm({ movieId, rating, accessToken }: RatingFormProps) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [score, setScore] = useState(rating?.score ?? 0);
  const [comment, setComment] = useState(rating?.comment ?? "");

  const saveMutation = useMutation({
    mutationFn: () => {
      const body = {
        score,
        comment: comment.trim() || null,
      };

      if (rating) {
        return updateRating(rating.ratingId, body);
      }

      return createRating({
        movieId,
        ...body,
      });
    },
    onSuccess: async (response) => {
      await queryClient.invalidateQueries({
        queryKey: ["ratings"],
      });

      alert(response.message);
    },
    onError: () => {
      alert("평점 저장에 실패했어요.");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (ratingId: number) => deleteRating(ratingId),
    onSuccess: async (response) => {
      await queryClient.invalidateQueries({
        queryKey: ["ratings"],
      });

      alert(response.message);
    },
    onError: () => {
      alert("평점 삭제에 실패했어요.");
    },
  });

  const isPending = saveMutation.isPending || deleteMutation.isPending;

  const handleSave = () => {
    if (!accessToken) {
      alert("로그인이 필요해요.");
      navigate({ to: "/login" });
      return;
    }

    if (score === 0 || isPending) return;

    saveMutation.mutate();
  };

  const handleDelete = () => {
    if (!rating || isPending) return;

    if (window.confirm("작성한 평점을 삭제하시겠어요?")) {
      deleteMutation.mutate(rating.ratingId);
    }
  };

  return (
    <>
      <div className="flex flex-wrap gap-[4px]">
        {Array.from({ length: 5 }, (_, index) => (
          <button
            key={index}
            type="button"
            aria-label={`${index + 1}점`}
            aria-pressed={score === index + 1}
            disabled={isPending}
            onClick={() => setScore(index + 1)}
            className={cn(
              "flex h-[40px] w-[40px] items-center justify-center rounded-[8px] border text-[24px]",
              index < score
                ? "border-[#2563EB] bg-[#2563EB] text-white"
                : "border-[#E3E6EB] bg-white text-[#606774]",
            )}
          >
            ★
          </button>
        ))}
      </div>

      <textarea
        className="h-[102px] w-full resize-none rounded-[8px] border border-[#E3E6EB] bg-white px-[12px] py-[16px] font-['Pretendard'] text-[13px] font-normal leading-[19.5px] text-[#17191E] outline-none placeholder:text-[#969DA8] focus:border-[#2563EB]"
        placeholder="영화를 보고 느낀 점을 남겨보세요."
        maxLength={500}
        value={comment}
        disabled={isPending}
        onChange={(event) => setComment(event.target.value)}
      />

      <button
        type="button"
        disabled={score === 0 || isPending}
        onClick={handleSave}
        className="flex h-[42px] w-full items-center justify-center rounded-[8px] border border-[#17191E] bg-[#17191E] px-[16px] disabled:cursor-not-allowed disabled:opacity-40"
      >
        <span className="font-['Pretendard'] text-[14px] font-extrabold leading-none text-white">
          {saveMutation.isPending
            ? "저장 중..."
            : rating
              ? "평점 수정"
              : "평점 저장"}
        </span>
      </button>

      {rating && (
        <button
          type="button"
          disabled={isPending}
          onClick={handleDelete}
          className="flex h-[42px] w-full items-center justify-center rounded-[8px] border border-[#EF4444] bg-white px-[16px] font-['Pretendard'] text-[14px] font-bold text-[#EF4444] disabled:opacity-40"
        >
          {deleteMutation.isPending ? "삭제 중..." : "평점 삭제"}
        </button>
      )}
    </>
  );
}

export function MovieDetailPage() {
  const { movieId } = useParams({ from: "/movies/$movieId" });
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const accessToken = useAuthStore((state) => state.accessToken);

  const parsedMovieId = Number(movieId);
  const isValidMovieId = Number.isInteger(parsedMovieId) && parsedMovieId > 0;

  const movieDetailQuery = useQuery({
    queryKey: ["movies", "detail", parsedMovieId],
    queryFn: () => getMovieDetail(parsedMovieId),
    enabled: isValidMovieId,
  });

  const favoriteQuery = useQuery({
    queryKey: ["favorites", "detail", parsedMovieId],
    queryFn: () => checkFavorite(parsedMovieId),
    enabled: Boolean(accessToken) && isValidMovieId,
    retry: false,
  });

  const isBookmarked =
    Boolean(accessToken) && (favoriteQuery.data?.result.isFavorite ?? false);

  const bookmarkMutation = useMutation({
    mutationFn: (bookmarked: boolean) => {
      if (bookmarked) {
        return deleteFavorite(parsedMovieId);
      }

      return createFavorite(parsedMovieId);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["favorites"],
      });
    },
    onError: () => {
      alert("즐겨찾기 변경에 실패했어요.");
    },
  });

  const handleBookmark = () => {
    if (!accessToken) {
      alert("로그인이 필요해요.");
      navigate({ to: "/login" });
      return;
    }

    if (!favoriteQuery.isSuccess || bookmarkMutation.isPending) {
      return;
    }

    bookmarkMutation.mutate(isBookmarked);
  };

  const meQuery = useQuery({
    queryKey: ["members", "me"],
    queryFn: getMyInfo,
    enabled: Boolean(accessToken),
    staleTime: 5 * 60 * 1000,
    retry: false,
  });

  const memberId = accessToken ? meQuery.data?.result?.memberId : undefined;

  const ratingsQuery = useQuery({
    queryKey: ["ratings", memberId],
    queryFn: () => getRatings(memberId!),
    enabled: Boolean(accessToken && memberId) && isValidMovieId,
    retry: false,
  });

  const myRating = accessToken
    ? ratingsQuery.data?.find((rating) => rating.movieId === parsedMovieId)
    : undefined;

  if (!isValidMovieId) {
    return <main>올바르지 않은 영화 번호예요.</main>;
  }

  if (movieDetailQuery.isPending) {
    return <main>영화 정보를 불러오는 중이에요.</main>;
  }

  if (movieDetailQuery.isError) {
    return <main>{getMovieDetailErrorMessage(movieDetailQuery.error)}</main>;
  }

  const movie = movieDetailQuery.data;
  const genres = movie.genres.map((genre) => genre.name).join(" · ");

  const runtime =
    movie.runtime === null
      ? "상영 시간 정보가 없어요."
      : `${Math.floor(movie.runtime / 60)}시간 ${movie.runtime % 60}분`;

  return (
    <main className="min-h-[calc(100vh-148px)] w-full bg-[#F6F7F9]">
      <div className="relative h-[300px] w-full overflow-hidden bg-[#17191E] md:h-[360px]">
        {movie.backdrop_path && (
          <img
            className="absolute inset-0 h-full w-full object-cover"
            src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
            alt=""
            aria-hidden="true"
          />
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/20" />

        <div className="relative mx-auto flex h-full w-full max-w-[1440px] flex-col justify-between px-5 py-[24px] text-white sm:px-8 lg:px-[80px]">
          <Link
            to="/"
            className="flex h-[24px] w-fit items-center gap-[4px] text-white no-underline"
          >
            <img
              className="h-[24px] w-[24px] brightness-0 invert"
              src="/icons/chevron-left.svg"
              alt=""
            />
            <span className="font-['Pretendard'] text-[13px] font-bold leading-[16px]">
              영화 목록
            </span>
          </Link>

          <div className="flex w-full max-w-[800px] flex-col gap-[8px]">
            <h1 className="m-0 break-words font-['Pretendard'] text-[32px] font-bold leading-tight tracking-[-1.5px] md:text-[46px] md:tracking-[-2.3px]">
              {movie.title}
            </h1>

            <p className="m-0 font-['Pretendard'] text-[14px] font-normal leading-[17px]">
              {movie.original_title}
            </p>

            <div className="flex flex-wrap items-center gap-[8px] font-['Pretendard'] text-[13px] font-bold leading-[16px]">
              <span>{movie.release_date}</span>
              <span>{genres}</span>
              <span>{runtime}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-[32px] px-5 py-[24px] sm:px-8 lg:flex-row lg:px-[80px]">
        <div className="w-[200px] shrink-0">
          {movie.poster_path ? (
            <img
              className="h-[286px] w-[200px] rounded-[10px] object-cover shadow-[0_12px_30px_0_rgba(12,15,20,0.12)]"
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={`${movie.title} 포스터`}
            />
          ) : (
            <div className="flex h-[286px] w-[200px] items-center justify-center rounded-[10px] bg-[#E3E6EB] text-[#606774]">
              포스터 없음
            </div>
          )}
        </div>

        <div className="flex min-w-0 flex-1 flex-col gap-[12px]">
          <h2 className="m-0 break-words font-['Pretendard'] text-[21px] font-bold leading-tight tracking-[-0.63px] text-[#17191E]">
            {movie.tagline}
          </h2>

          <p className="m-0 font-['Pretendard'] text-[14px] font-normal leading-[24px] text-[#606774]">
            {movie.overview}
          </p>

          <button
            type="button"
            className={cn(
              "flex h-[42px] w-[107px] shrink-0 items-center justify-center gap-[8px] rounded-[8px] border px-[16px] disabled:opacity-40",
              isBookmarked
                ? "border-[#2563EB] bg-[#2563EB]"
                : "border-[#17191E] bg-[#17191E]",
            )}
            aria-pressed={isBookmarked}
            disabled={
              bookmarkMutation.isPending ||
              (Boolean(accessToken) && !favoriteQuery.isSuccess)
            }
            onClick={handleBookmark}
          >
            <img
              className="h-[16px] w-[16px] brightness-0 invert"
              src={
                isBookmarked
                  ? "/icons/bookmark.svg"
                  : "/icons/bookmark-outline.svg"
              }
              alt=""
            />

            <span className="whitespace-nowrap font-['Pretendard'] text-[14px] font-extrabold leading-none text-white">
              즐겨찾기
            </span>
          </button>

          {accessToken && favoriteQuery.isError && (
            <p className="text-[13px] text-red-500">
              즐겨찾기 정보를 불러오지 못했어요.
            </p>
          )}
        </div>

        <div className="flex w-full flex-col gap-[8px] border-t border-[#E3E6EB] pt-6 lg:w-[360px] lg:shrink-0 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-[30px]">
          <h2 className="m-0 font-['Pretendard'] text-[21px] font-bold leading-[25px] tracking-[-0.63px] text-[#17191E]">
            내 평점
          </h2>

          <p className="m-0 font-['Pretendard'] text-[12px] font-normal leading-[14px] text-[#969DA8]">
            별점은 필수, 후기는 선택이에요.
          </p>

          {accessToken &&
          (meQuery.isPending ||
            (Boolean(memberId) && ratingsQuery.isPending)) ? (
            <p className="text-[13px] text-[#606774]">
              평점 정보를 불러오는 중이에요.
            </p>
          ) : accessToken &&
            (meQuery.isError || !memberId || ratingsQuery.isError) ? (
            <p className="text-[13px] text-red-500">
              평점 정보를 불러오지 못했어요.
            </p>
          ) : (
            <RatingForm
              key={JSON.stringify([
                parsedMovieId,
                myRating?.ratingId,
                myRating?.score,
                myRating?.comment,
              ])}
              movieId={parsedMovieId}
              rating={myRating}
              accessToken={accessToken}
            />
          )}
        </div>
      </div>
    </main>
  );
}
