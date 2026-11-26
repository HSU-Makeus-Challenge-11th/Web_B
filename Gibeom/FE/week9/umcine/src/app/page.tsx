import type { Metadata } from "next";
import { MovieListPage } from "../views/movies/movie-list-page";

export const metadata: Metadata = {
  // title.template은 하위 세그먼트에만 적용되므로, 루트 레이아웃과 같은 세그먼트인 홈은 직접 지정
  title: { absolute: "영화 목록 | UMCine" },
  description: "지금 인기 있는 영화를 둘러봐요.",
};

export default function HomePage() {
  return <MovieListPage />;
}
