# UMCine

Next.js App Router와 TypeScript로 만드는 영화 목록·상세·검색 및 회원가입 앱입니다.
라우팅은 Next.js, 서버 상태는 TanStack Query, 북마크 상태는 Zustand로 관리합니다.

## 실행

이 폴더에서 실행합니다.

```powershell
pnpm install --frozen-lockfile
# .env.local이 없는 경우에만 복사한 뒤 토큰을 입력합니다.
if (-not (Test-Path .env.local)) { Copy-Item .env.example .env.local }
pnpm dev
```

필수 환경변수:

- `NEXT_PUBLIC_TMDB_API_BASE_URL`: TMDB API 기본 주소
- `NEXT_PUBLIC_TMDB_ACCESS_TOKEN`: 본인의 TMDB API 읽기 액세스 토큰
- `NEXT_PUBLIC_API_BASE_URL`: 회원 서버 주소. 워크북 기준 `http://localhost:8080`

실제 값은 Git에서 제외된 `.env.local`에 보관합니다.

## 회원가입 확인

`/signup`에서 이메일·닉네임 중복 확인 후 가입할 수 있습니다. 회원 서버가 위 주소에서 실행되어 있어야 하며, 회원가입 성공 후 `/login`으로 이동합니다.

## 검증

```powershell
pnpm build
pnpm lint
```

주차별 작업 내용과 제출 방법은 [상위 안내](../README.md)와 [주차별 기록](../weeks/)을 확인하세요.

## 7주차 필수 화면

- `/login`: 로그인 입력 화면
- `/profile`: 내 정보 미리보기
- `/profile-edit`: 내 정보 수정·저장·취소

인증 정보는 브라우저 저장소에서 복원되며, 내 정보는 회원 서버와 연동됩니다.
