import { Link, useParams } from "@tanstack/react-router";
import { BookmarkButton } from "../../components/bookmark-button";
import { movies } from "../../data/movies";

export function MovieDetailPage() {
  const { movieId } = useParams({ from: "/movies/$movieId" });
  const movie = movies.find((item) => item.id === Number(movieId));

  if (!movie) {
    return <main>영화를 찾을 수 없어요.</main>;
  }

  return (
    <main className="movie-detail-page">
      <section
        className="movie-detail-hero"
        style={{
          backgroundImage: `linear-gradient(90deg, rgba(17, 24, 39, 0.9), rgba(17, 24, 39, 0.44), rgba(17, 24, 39, 0.1)), url(${movie.backdropPath})`,
        }}
      >
        <div className="movie-detail-hero__inner">
          <Link className="movie-detail-hero__back" to="/">
            &lt; 영화 목록
          </Link>
          <div className="movie-detail-hero__content">
            <h1>{movie.title}</h1>
            <p>{movie.originalTitle}</p>
            <span>
              {movie.releaseDate} · {movie.genres.join(" · ")} · {movie.runtime}
            </span>
          </div>
        </div>
      </section>

      <section className="movie-detail-content">
        <img
          className="movie-detail-content__poster"
          src={movie.posterPath}
          alt={`${movie.title} 포스터`}
        />

        <article className="movie-detail-info">
          <h2>{movie.tagline}</h2>
          <p>{movie.overview}</p>
          <p>
            이 영화는 {movie.genres.join(", ")} 장르의 작품이며, 러닝타임은{" "}
            {movie.runtime}입니다.
          </p>
          <BookmarkButton movieId={movie.id} />
        </article>

        <aside className="movie-rating-panel" aria-labelledby="rating-title">
          <h2 id="rating-title">내 평점</h2>
          <p>별점을 주고 한줄평을 남겨보세요.</p>
          <div className="movie-rating-panel__stars" aria-label="별점 선택">
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
          <button className="movie-rating-panel__save" type="button">
            평점 저장
          </button>
        </aside>
      </section>
    </main>
  );
}
