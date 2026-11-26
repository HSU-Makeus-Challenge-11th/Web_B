import { isHTTPError } from "ky";
import { cache } from "react";
import { getMovieDetail } from "../../../api/movies/get-movie-detail";

// generateMetadata와 페이지가 같은 영화를 조회하므로 React cache로 한 요청 안에서 한 번만 호출
// 없는 영화(잘못된 번호·TMDB 404)는 null, 그 밖의 오류는 error.tsx로 넘김
export const getMovie = cache(async (movieId: string) => {
  const parsedMovieId = Number(movieId);
  if (!Number.isInteger(parsedMovieId) || parsedMovieId <= 0) return null;

  try {
    return await getMovieDetail(parsedMovieId);
  } catch (error) {
    if (isHTTPError(error) && error.response.status === 404) return null;
    throw error;
  }
});
