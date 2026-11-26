import { Suspense } from "react";
import { MovieDetailPage } from "../../../views/movies/movie-detail-page";

export default function Page() {
  return (
    <Suspense>
      <MovieDetailPage />
    </Suspense>
  );
}
