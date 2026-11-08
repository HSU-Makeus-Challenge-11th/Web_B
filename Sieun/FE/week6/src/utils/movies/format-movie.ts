/** TMDB의 2026-07-29를 시안의 2026.07.29 형식으로 바꿔요. */
export function formatReleaseDate(releaseDate: string) {
  return releaseDate ? releaseDate.replaceAll("-", ".") : "개봉일 정보가 없어요.";
}

export function formatRuntime(runtime: number | null) {
  if (runtime === null) return "상영 시간 정보가 없어요.";

  const hours = Math.floor(runtime / 60);
  const minutes = runtime % 60;

  if (hours === 0) return `${minutes}분`;
  return minutes === 0 ? `${hours}시간` : `${hours}시간 ${minutes}분`;
}
