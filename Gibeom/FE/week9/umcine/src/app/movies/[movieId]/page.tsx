import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { MovieDetail } from "../../../views/movies/movie-detail-page";
import { getMovie } from "./get-movie";

interface MovieDetailPageProps {
  params: Promise<{ movieId: string }>;
}

// 탭 제목·공유 미리보기에 영화 정보를 넣음. 데이터는 서버에서 조회
export async function generateMetadata({ params }: MovieDetailPageProps): Promise<Metadata> {
  const { movieId } = await params;
  const movie = await getMovie(movieId);
  if (!movie) return { title: "영화를 찾을 수 없어요 | UMCine" };

  return {
    title: `${movie.title} | UMCine`,
    description: movie.overview || `${movie.title} 영화 정보`,
    openGraph: {
      title: movie.title,
      description: movie.overview,
      images: movie.poster_path ? [`https://image.tmdb.org/t/p/w500${movie.poster_path}`] : [],
    },
  };
}

export default function Page({ params }: MovieDetailPageProps) {
  // 영화 번호는 요청을 받아야 알 수 있으므로 Suspense 안에서 조회
  // 헤더·푸터와 로딩 문구는 빌드할 때 미리 만들어 둠 (Partial Prerendering)
  return (
    <Suspense
      fallback={
        <main className="grid min-h-[420px] flex-1 place-items-center bg-[#f6f7f9] text-lg font-bold text-[#555d6c]">
          영화 정보를 불러오는 중이에요.
        </main>
      }
    >
      <MovieDetailScreen params={params} />
    </Suspense>
  );
}

async function MovieDetailScreen({ params }: MovieDetailPageProps) {
  const { movieId } = await params;
  const movie = await getMovie(movieId);
  if (!movie) notFound();

  return <MovieDetail movie={movie} />;
}
