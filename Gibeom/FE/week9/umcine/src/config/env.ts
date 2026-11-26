// NEXT_PUBLIC_ 접두사가 붙은 값만 브라우저 번들에 포함됨
// process.env.NEXT_PUBLIC_X 형태로 직접 써야 빌드할 때 값으로 바뀜
const tmdbApiBaseUrl = process.env.NEXT_PUBLIC_TMDB_API_BASE_URL;
const tmdbAccessToken = process.env.NEXT_PUBLIC_TMDB_ACCESS_TOKEN;

if (!tmdbApiBaseUrl || !tmdbAccessToken) {
  throw new Error("TMDB 환경 변수가 필요해요.");
}

export const env = {
  tmdbApiBaseUrl,
  tmdbAccessToken,
  apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || "",
};
