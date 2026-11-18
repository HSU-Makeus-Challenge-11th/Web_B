import { Link } from "@tanstack/react-router";
import { useQueries } from "@tanstack/react-query";
import { useMeQuery, useFavoritesQuery } from "../../hooks/use-personal";
import { getMovieDetails } from "../../api/tmdb";
import MovieCard from "../../components/movies/movie-card";
import { Footer } from "../../components/layout/footer";

export function MyPage() {
  const me = useMeQuery();
  const favorites = useFavoritesQuery();
  const details = useQueries({ queries: (favorites.data ?? []).map(favorite => ({
    queryKey: ["movies", "detail", favorite.movieId], queryFn: () => getMovieDetails(favorite.movieId),
  })) });
  const bookmarked = details.flatMap(query => query.data ? [query.data] : []);
  const profile = me.data!;
  return <><main className="profile-page">
    <div className="profile-title"><h1>내 정보</h1><Link className="primary-button" to="/me/edit">정보 수정</Link></div>
    <section className="profile-info"><h2>기본 정보</h2><div className="profile-info-row">
      <div className="avatar"><img src={"/icons/person.svg"} alt="프로필" /></div>
      <div><span className="info-label">닉네임</span><strong>{profile.nickname}</strong></div>
      <div><span className="info-label">이메일</span><strong>{profile.email}</strong></div>
    </div></section>
    <section className="bookmarks"><h2>내 즐겨찾기</h2>
      {favorites.isPending ? <p role="status">즐겨찾기를 불러오는 중이에요.</p> : favorites.isError ? <p role="alert">즐겨찾기를 불러오지 못했어요. <button onClick={() => void favorites.refetch()}>다시 시도</button></p> : (favorites.data?.length ?? 0) > 0 && details.some(query => query.isPending) ? <p role="status">영화 정보를 불러오는 중이에요.</p> : bookmarked.length ? <div className="profile-movies">{bookmarked.map(movie => <MovieCard key={movie.id} movie={movie} />)}</div>
        : <p className="empty-bookmarks">아직 즐겨찾기한 영화가 없어요.</p>}
      {details.some(query => query.isError) && <p role="alert">일부 영화 정보를 불러오지 못했어요.</p>}
    </section>
  </main><Footer /></>;
}
