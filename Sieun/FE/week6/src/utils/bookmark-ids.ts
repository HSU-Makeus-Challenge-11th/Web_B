/** 브라우저에 저장된 값은 바뀔 수 있어서, 양의 정수 영화 ID만 남겨요. */
export function toBookmarkIds(value: unknown): number[] {
  if (!Array.isArray(value)) return [];

  const movieIds = value.filter(
    (movieId): movieId is number =>
      typeof movieId === "number" && Number.isInteger(movieId) && movieId > 0,
  );

  return [...new Set(movieIds)];
}
