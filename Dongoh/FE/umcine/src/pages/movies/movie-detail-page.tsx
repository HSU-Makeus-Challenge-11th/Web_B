import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "@tanstack/react-router";
import { getMovieDetail } from "../../api/movies/get-movie-detail";
import { cn } from "../../utils/cn";
import { BookmarkButton } from "../../components/bookmark-button";
import { getMovieDetailErrorMessage } from "../../utils/movies/get-movie-detail-error-message";
import {
  getTmdbBackdropUrl,
  getTmdbPosterUrl,
} from "../../utils/movies/tmdb-image";

export function MovieDetailPage() {
  const { movieId } = useParams({ from: "/movies/$movieId" });
  const parsedMovieId = Number(movieId);

  return <MovieDetailPageContent key={movieId} movieId={parsedMovieId} />;
}

function MovieDetailPageContent({ movieId }: { movieId: number }) {
  const isValidMovieId = Number.isInteger(movieId) && movieId > 0;
  const movieDetailQuery = useQuery({
    queryKey: ["movies", "detail", movieId],
    queryFn: () => getMovieDetail(movieId),
    enabled: isValidMovieId,
  });

  if (!isValidMovieId) {
    return <MovieDetailStatus message="올바르지 않은 영화 번호예요." isError />;
  }

  if (movieDetailQuery.isPending) {
    return <MovieDetailStatus message="영화 정보를 불러오는 중이에요." />;
  }

  if (movieDetailQuery.isError) {
    return (
      <MovieDetailStatus
        message={getMovieDetailErrorMessage(movieDetailQuery.error)}
        isError
      />
    );
  }

  const movie = movieDetailQuery.data;

  if (!movie) {
    return <MovieDetailStatus message="영화를 찾을 수 없어요." isError />;
  }

  const posterUrl = getTmdbPosterUrl(movie.poster_path);
  const backdropUrl = getTmdbBackdropUrl(movie.backdrop_path);
  const genreNames = movie.genres.map((genre) => genre.name).join(", ");
  const runtimeText = formatRuntime(movie.runtime);

  return (
    <main className="min-h-[calc(100svh_-_64px)] bg-[#f4f6fb]">
      <section
        className={cn(
          "min-h-[300px] bg-cover bg-center text-white max-[720px]:min-h-[260px]",
          !backdropUrl && "bg-gray-600",
        )}
        style={{
          backgroundImage: backdropUrl
            ? `linear-gradient(90deg, rgba(17, 24, 39, 0.9), rgba(17, 24, 39, 0.44), rgba(17, 24, 39, 0.1)), url(${backdropUrl})`
            : undefined,
        }}
      >
        <div className="mx-auto w-[calc(100%_-_32px)] max-w-[1120px] max-[720px]:w-[calc(100%_-_24px)] flex min-h-[300px] flex-col justify-between pt-[22px] pb-[34px] max-[720px]:min-h-[260px]">
          <Link className="w-fit rounded-md bg-gray-900/35 px-[9px] py-[7px] text-[13px] font-extrabold text-white" to="/">
            &lt; 영화 목록
          </Link>
          {!backdropUrl && (
            <p className="m-0 self-center">이미지 없음</p>
          )}
          <div className="max-w-[640px] [&_h1]:mb-2 [&_h1]:text-[34px] [&_h1]:leading-[1.2] [&_h1]:font-black [&_h1]:text-white max-[720px]:[&_h1]:text-[27px] [&_p]:mb-1.5 [&_p]:text-sm [&_p]:font-bold [&_p]:text-white/85 [&_span]:block [&_span]:text-[13px] [&_span]:font-bold [&_span]:text-white/90">
            <h1>{movie.title}</h1>
            <p>{movie.original_title}</p>
            <span>
              {movie.release_date} · {genreNames} · {runtimeText}
            </span>
          </div>
        </div>
      </section>

      <section className="mx-auto w-[calc(100%_-_32px)] max-w-[1120px] max-[720px]:w-[calc(100%_-_24px)] grid grid-cols-[170px_minmax(0,1fr)_280px] gap-7 pt-7 pb-24 max-[1000px]:grid-cols-[140px_minmax(0,1fr)] max-[720px]:grid-cols-[110px_minmax(0,1fr)] max-[720px]:gap-[18px] max-[720px]:pb-14">
        {posterUrl ? (
          <img
            className="aspect-[2/3] w-[170px] self-start rounded-lg object-cover shadow-[0_18px_36px_rgba(15,23,42,0.22)] max-[1000px]:w-[140px] max-[720px]:w-[110px]"
            src={posterUrl}
            alt={`${movie.title} 포스터`}
          />
        ) : (
          <div className="aspect-[2/3] w-[170px] self-start rounded-lg object-cover shadow-[0_18px_36px_rgba(15,23,42,0.22)] max-[1000px]:w-[140px] max-[720px]:w-[110px] grid place-items-center bg-gray-200 text-[13px] text-gray-500">
            이미지 없음
          </div>
        )}

        <article className="pr-3 [&_h2]:mb-3.5 [&_h2]:text-lg [&_h2]:leading-[1.35] [&_h2]:font-black [&_h2]:text-gray-900 [&_p]:mb-3 [&_p]:text-sm [&_p]:leading-7 [&_p]:text-gray-600 [&_button]:mt-1">
          {movie.tagline && <h2>{movie.tagline}</h2>}
          <p>{movie.overview}</p>
          <p>
            {genreNames && `이 영화는 ${genreNames} 장르의 작품입니다. `}
            {typeof movie.runtime === "number"
              ? `러닝타임은 ${runtimeText}입니다.`
              : runtimeText}
          </p>
          <BookmarkButton movieId={movie.id} />
        </article>

        <aside className="border-l border-gray-200 pl-7 max-[1000px]:col-span-full max-[1000px]:border-t max-[1000px]:border-l-0 max-[1000px]:pt-[22px] max-[1000px]:pl-0 [&_h2]:mb-1 [&_h2]:text-lg [&_h2]:font-black [&_h2]:text-gray-900 [&_p]:mb-3.5 [&_p]:text-[13px] [&_p]:text-gray-400 [&_textarea]:block [&_textarea]:min-h-[116px] [&_textarea]:w-full [&_textarea]:resize-y [&_textarea]:rounded-md [&_textarea]:border [&_textarea]:border-gray-200 [&_textarea]:bg-white [&_textarea]:p-3 [&_textarea]:text-[13px] [&_textarea]:leading-normal [&_textarea]:text-gray-900 [&_textarea]:outline-blue-600 [&_textarea]:placeholder:text-gray-400" aria-labelledby="rating-title">
          <h2 id="rating-title">내 평점</h2>
          <p>별점을 주고 한줄평을 남겨보세요.</p>
          <div className="mb-3.5 flex gap-[7px] [&_button]:inline-flex [&_button]:size-7 [&_button]:items-center [&_button]:justify-center [&_button]:rounded-md [&_button]:border [&_button]:border-gray-200 [&_button]:bg-white [&_img]:size-[15px]" aria-label="별점 선택">
            {[1, 2, 3, 4, 5].map((star) => (
              <button key={star} type="button" aria-label={`${star}점`}>
                <img src="/icons/movie-icons/star.svg" alt="" aria-hidden="true" />
              </button>
            ))}
          </div>
          <textarea
            aria-label="한줄평"
            placeholder="한줄평 또는 느낀 점을 남겨보세요."
          />
          <button className="mt-3.5 w-full rounded-md border-0 bg-gray-900 p-3 text-[13px] font-black text-white" type="button">
            평점 저장
          </button>
        </aside>
      </section>
    </main>
  );
}

function MovieDetailStatus({
  message,
  isError = false,
}: {
  message: string;
  isError?: boolean;
}) {
  return (
    <main className="min-h-[calc(100svh_-_64px)] bg-[#f4f6fb]">
      <div className="mx-auto w-[calc(100%_-_32px)] max-w-[1120px] max-[720px]:w-[calc(100%_-_24px)] py-10 text-gray-500 [&_a]:text-blue-600">
        <Link to="/">&lt; 영화 목록</Link>
        <p role={isError ? "alert" : "status"}>{message}</p>
      </div>
    </main>
  );
}

function formatRuntime(runtime: number | null) {
  if (typeof runtime !== "number") return "상영 시간 정보가 없어요.";

  const hours = Math.floor(runtime / 60);
  const minutes = runtime % 60;

  return hours > 0 ? `${hours}시간 ${minutes}분` : `${minutes}분`;
}
