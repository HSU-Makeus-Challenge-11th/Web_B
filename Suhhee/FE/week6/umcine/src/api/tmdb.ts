import ky from "ky";
import type { Movie } from "../types/movie";

const TMDB_API_URL = "https://api.themoviedb.org/3/";
const TMDB_IMAGE_URL = "https://image.tmdb.org/t/p";
const accessToken = import.meta.env.VITE_TMDB_ACCESS_TOKEN;

const genreNames: Record<number, string> = {
  12: "모험",
  14: "판타지",
  16: "애니메이션",
  18: "드라마",
  27: "공포",
  28: "액션",
  35: "코미디",
  36: "역사",
  53: "스릴러",
  80: "범죄",
  99: "다큐멘터리",
  878: "SF",
  9648: "미스터리",
  10749: "로맨스",
  10751: "가족",
};

interface TmdbListResponse {
  page: number;
  results: TmdbMovieSummary[];
  total_pages: number;
  total_results: number;
}

interface TmdbMovieSummary {
  id: number;
  title: string;
  original_title: string;
  release_date: string;
  poster_path: string | null;
  backdrop_path: string | null;
  genre_ids: number[];
  overview: string;
}

interface TmdbMovieDetails extends Omit<TmdbMovieSummary, "genre_ids"> {
  genres: Array<{ id: number; name: string }>;
  runtime: number | null;
  tagline: string;
}

function requireAccessToken() {
  if (!accessToken) {
    throw new Error("TMDB Read Access Token이 설정되지 않았어요.");
  }

  return accessToken;
}

const tmdbApi = ky.create({
  baseUrl: TMDB_API_URL,
  headers: {
    accept: "application/json",
    authorization: accessToken ? `Bearer ${accessToken}` : "",
  },
  searchParams: {
    language: "ko-KR",
  },
  timeout: 10_000,
});

function imageUrl(path: string | null, size: "w500" | "original") {
  return path ? `${TMDB_IMAGE_URL}/${size}${path}` : "/favicon.svg";
}

function toMovie(summary: TmdbMovieSummary): Movie {
  return {
    id: summary.id,
    title: summary.title,
    originalTitle: summary.original_title,
    releaseDate: summary.release_date || "개봉일 미정",
    posterPath: imageUrl(summary.poster_path, "w500"),
    backdropPath: imageUrl(summary.backdrop_path, "original"),
    genres: summary.genre_ids.map((id) => genreNames[id] ?? `장르 ${id}`),
    runtime: "상영 시간 정보 없음",
    tagline: "",
    overview: summary.overview || "등록된 줄거리가 없어요.",
    isBookmarked: false,
  };
}

export async function probePopularMoviesWithFetch() {
  const response = await fetch(`${TMDB_API_URL}movie/popular?language=ko-KR`, {
    headers: {
      accept: "application/json",
      authorization: `Bearer ${requireAccessToken()}`,
    },
  });

  if (!response.ok) {
    throw new Error(`TMDB fetch 요청 실패 (${response.status})`);
  }

  return response.json() as Promise<TmdbListResponse>;
}

export async function getPopularMovies() {
  requireAccessToken();
  const response = await tmdbApi
    .get("movie/popular")
    .json<TmdbListResponse>();

  return response.results.map(toMovie);
}

export async function searchMovies(query: string) {
  requireAccessToken();
  const response = await tmdbApi
    .get("search/movie", { searchParams: { query } })
    .json<TmdbListResponse>();

  return response.results.map(toMovie);
}

export async function getMovieDetails(movieId: number): Promise<Movie> {
  requireAccessToken();
  const movie = await tmdbApi
    .get(`movie/${movieId}`)
    .json<TmdbMovieDetails>();

  return {
    id: movie.id,
    title: movie.title,
    originalTitle: movie.original_title,
    releaseDate: movie.release_date || "개봉일 미정",
    posterPath: imageUrl(movie.poster_path, "w500"),
    backdropPath: imageUrl(movie.backdrop_path, "original"),
    genres: movie.genres.map((genre) => genre.name),
    runtime: movie.runtime ? `${movie.runtime}분` : "상영 시간 정보 없음",
    tagline: movie.tagline || "영화 상세 정보",
    overview: movie.overview || "등록된 줄거리가 없어요.",
    isBookmarked: false,
  };
}
