# 주차별 필수 미션 점검

## 보완 구현 이후 상태

이 문서의 아래 표와 상세 항목은 **보완 구현 전 점검 기록**입니다. 이후 누락된 Tailwind 전환·TMDB 출처 표기·로그인/내 정보/수정 화면을 구현했습니다.
[최신 코드와 브라우저 검증 결과](./required-missions.md)를 먼저 확인하세요.

- 3주차: 공개 영화 화면 Tailwind 전환 구현·화면 확인.
- 4주차: 실제 세 화면의 북마크 공유·새로고침 유지 확인 추가. 브라우저 프로세스 재실행은 별도.
- 5주차: TMDB 출처 표기 구현·실제 표시 확인.
- 6주차: Query Devtools 캐시 재사용 확인과 증빙 추가. Network 패널 직접 캡처는 별도.
- 7주차: 필수 세 화면과 입력·저장·취소·라우팅 구현·브라우저 확인. 로그인/내 정보 서버 연동은 8주차 범위.
- 0~2주차는 원본 워크북 부재로 전체 필수 판정을 보류한 상태를 유지합니다.


점검일: 2026-11-11 (한국 시간)

## 점검 기준

- 현재 로컬 `Dongoh/FE/umcine`, 주차별 MD, 통합 전 소스 백업을 확인했습니다.
- 첨부된 FE 3·4·5·6·7주차 노션 워크북의 **필수 미션 원문**을 대조했습니다.
- FE 0·1·2주차는 원본 워크북이 현재 첨부에 없어 모든 요구사항의 충족 여부를 확정하지 않습니다.
- GitHub `main`의 고정 시점 [abb178d](https://github.com/HSU-Makeus-Challenge-11th/Web_B/commit/abb178df66547489eddf90e09f4f1b0e76b1fc17)과 동오님 PR·브랜치를 읽었습니다. 다른 팀원 코드를 동오님 완료 근거로 사용하지 않았습니다.
- 이번 작업은 점검과 문서 보완입니다. 기능 코드 수정, Git pull·병합·커밋·푸시는 하지 않았습니다.
- PR 병합은 제출 근거이며, 모든 필수 기능이 구현됐다는 보증으로 간주하지 않습니다.

## 먼저 정정할 내용 — 회원 API는 이미 있음

이전 답변에서 오래된 로컬 `Dongoh/FE-05` 브랜치만 보고 백엔드 회원 API가 없다고 설명한 것은 잘못된 판단이었습니다.

GitHub main에는 동오님의 다음 구현이 이미 있습니다.

| 기능 | 근거 |
| --- | --- |
| 이메일 중복 확인 GET /members/email/{email} | [MemberController](https://github.com/HSU-Makeus-Challenge-11th/Web_B/blob/abb178df66547489eddf90e09f4f1b0e76b1fc17/Dongoh/BE/src/main/java/com/umc/movie/controller/MemberController.java), [MemberService](https://github.com/HSU-Makeus-Challenge-11th/Web_B/blob/abb178df66547489eddf90e09f4f1b0e76b1fc17/Dongoh/BE/src/main/java/com/umc/movie/service/MemberService.java) |
| 닉네임 중복 확인 GET /members/nickname/{nickname} | 위 컨트롤러·서비스, available 응답 DTO |
| 회원가입 POST /members, 201 | 위 컨트롤러·서비스, 검증 DTO·bcrypt 저장 |
| 평점 등록·수정·삭제 | [RatingService](https://github.com/HSU-Makeus-Challenge-11th/Web_B/blob/abb178df66547489eddf90e09f4f1b0e76b1fc17/Dongoh/BE/src/main/java/com/umc/movie/service/RatingService.java) |
| H2 실행·검증 기록 | [BE 6주차 기록](https://github.com/HSU-Makeus-Challenge-11th/Web_B/blob/abb178df66547489eddf90e09f4f1b0e76b1fc17/Dongoh/BE/docs/6주차-미션-기록.md), [PR #81](https://github.com/HSU-Makeus-Challenge-11th/Web_B/pull/81) |

원격의 회원 응답 형식은 프론트에서 구현한 available 및 ApiResponse 형식과 맞습니다.
직전 실행 확인에서 `localhost:8080`이 ECONNREFUSED였다는 결과는 **서버가 해당 포트에서 응답하지 않았다는 뜻**입니다. API 코드나 DB가 없다는 증거가 아닙니다.
현재 로컬 작업 폴더에는 원격 main의 최신 백엔드 소스가 반영되지 않았습니다. 변경 중인 프론트 파일이 많으므로 이번 점검에서는 pull하거나 다른 브랜치로 바꾸지 않았습니다.

## 프론트엔드 전체 판정

| 주차 | 원문 또는 기록의 핵심 요구 | 코드·제출 확인 | 판정과 남은 일 |
| --- | --- | --- | --- |
| 0 | HTML/CSS/JS 기초 기록 | 코드 보관, [PR #8](https://github.com/HSU-Makeus-Challenge-11th/Web_B/pull/8) 병합 | 제출 확인. 원본 필수 미션 전체 대조는 보류 |
| 1 | TypeScript 기초 기록 | 코드 보관, [PR #13](https://github.com/HSU-Makeus-Challenge-11th/Web_B/pull/13) 병합 | 제출 확인. 원본 필수 미션 전체 대조는 보류 |
| 2 | React 영화 목록 기록 | 카드·목록 코드, [PR #22](https://github.com/HSU-Makeus-Challenge-11th/Web_B/pull/22) 병합 | 제출 확인. 원본 필수 미션 전체 대조는 보류 |
| 3 | 공개 영화 라우팅, 기존 CSS의 Tailwind 전환 | 라우팅·cn 사용 확인, [PR #38](https://github.com/HSU-Makeus-Challenge-11th/Web_B/pull/38) 병합 | **부분 완료:** Tailwind 전환이 일부에 그침 |
| 4 | 목록·검색·상세 북마크 공유와 Web Storage 유지 | Zustand·persist 코드, [PR #40](https://github.com/HSU-Makeus-Challenge-11th/Web_B/pull/40)의 기능·저장값 확인 기록 | **핵심 구현·검증 기록 확인:** 브라우저 종료 후 재실행 확인은 명시적 증빙 보완 |
| 5 | fetch·ky로 실제 TMDB 연결, 상태별 UI, TMDB 출처 표기 | 요청 함수·화면 연결 및 [PR #50](https://github.com/HSU-Makeus-Challenge-11th/Web_B/pull/50) 확인 | **부분 완료:** TMDB 출처 표기 누락 |
| 6 | 세 요청의 useQuery 전환, 키 분리, 캐시 재사용 확인 | Provider·Devtools·쿼리·1분 staleTime, [PR #75](https://github.com/HSU-Makeus-Challenge-11th/Web_B/pull/75) 확인 | **코드 구현 확인:** 브라우저 Network·Query 도구 검증이 미체크 |
| 7 | 본문 회원가입에 이어 로그인·내 정보 조회·수정 화면 퍼블리싱 | 본문 3.1~3.4는 로컬 구현, 원격 main/브랜치 목록에 FE-07 제출 없음 | **필수 미션 미완료:** 로그인·조회·수정 화면과 라우트 없음 |

## FE 3주차 — 부분 완료

원문의 필수 항목은 공개 영화 화면 라우팅과 기존 CSS를 Tailwind CSS로 옮기는 작업입니다.

- 목록 `/`, 검색 `/search?query=...`, 상세 `/movies/$movieId` 경로는 있습니다.
- 통합 전 3주차 사본에서 로컬 데이터 검색, 결과 수·원제·개봉일·줄거리 표시, 영화 ID 조회와 미발견 안내를 확인했습니다.
- 현재 앱에서 API 데이터로 바뀐 부분은 후속 5주차 변경이므로, 로컬 데이터 방식과 다르다는 이유로 3주차 누락으로 판정하지 않았습니다.
- [영화 카드](../umcine/src/components/movies/movie-card.tsx)의 일부 utility class와 cn 사용은 확인했습니다.
- 그러나 [index.css](../umcine/src/index.css)에 목록·검색·상세 화면의 배치·색상·크기를 정하는 기존 클래스가 상당 부분 남아 있고 각 페이지가 이 클래스에 의존합니다. 기존 CSS의 전체 전환이 완료됐다고 보기 어렵습니다.
- PR의 Tailwind 사용 설명만으로 전체 전환 완료를 판정하지 않았습니다.

할 일: 공개 영화 화면의 스타일을 Tailwind로 옮기고 원문 디자인과 비교·직접 접근·새로고침·Console 확인 결과를 기록합니다.

## FE 4주차 — 핵심 구현·검증 기록 확인

- [store](../umcine/src/stores/bookmark-store.ts)에 bookmarkedMovieIds와 toggleBookmark가 있고 persist 저장 key는 `umcine-bookmark-store`입니다.
- 목록은 MovieGrid를 통해 store를 사용하고 검색·상세는 BookmarkButton을 통해 같은 store를 사용합니다.
- PR #40에는 화면 간 추가/해제 공유, 새로고침 후 유지, Application 패널 저장값 확인, 저장값 삭제 후 빈 상태 복원 기록이 있습니다.
- 이번 점검에서 실제 store를 메모리 Storage로 실행해 토글·JSON 저장·새 store 생성 시 복원·저장 삭제 후 빈 상태를 검증했습니다. 실제 브라우저 재시작 테스트와 구분합니다.
- 원문이 요구하는 **브라우저를 닫고 다시 실행한 결과**는 PR이나 MD에 명시되지 않아 추가 기록이 필요합니다.

주차 기록 정정: 통합 당시 로컬 week3와 week4가 같았던 이유로 4주차에 새 코드가 없다고 정리했지만, GitHub에는 3주차와 별도로 북마크를 구현한 PR #40이 있습니다. 주차별 MD에 이 차이를 추가했습니다.

## FE 5주차 — TMDB 출처 표기 누락

- fetch 함수와 HTTP 오류 처리, ky 클라이언트, 목록·검색·상세 함수 및 타입은 있습니다.
- 화면에서 로딩·오류·빈 결과와 영화 정보를 구분합니다.
- PR #50에 실제 검색·상세 직접 접근·새로고침·404·북마크 확인 기록이 있습니다. 이번 점검의 재실행 결과는 아닙니다.
- 원문의 **제공 디자인에 따른 TMDB 출처 표기**는 현재 화면에서 구현 근거가 없습니다. 로고 파일의 존재만으로 화면 표기를 완료 처리하지 않습니다.
- PR #50에도 병합 전 TMDB 출처 표기 구현이 필요하다고 직접 기록돼 있습니다.

할 일: 출처 표기를 화면에 배치하고 Console·화면 크기·URL 직접 접근 결과를 기록합니다.

## FE 6주차 — 코드 확인, 브라우저 캐시 검증 필요

- [main.tsx](../umcine/src/main.tsx): QueryClientProvider, Devtools, 공통 staleTime 60초.
- 목록 키: `["movies", "list", { page }]`.
- 검색 키: `["movies", "search", { query: normalizedQuery }]`, 빈 검색어는 enabled false.
- 상세 키: `["movies", "detail", movieId]`, 유효한 양의 정수 ID만 요청.
- 로딩·오류·빈 결과 안내를 쿼리 상태에 연결했습니다.
- 실제 main.tsx의 QueryClient 설정을 가져온 테스트에서 같은 fresh key 재요청의 queryFn 호출 생략과 페이지·검색·상세 키의 캐시 분리를 확인했습니다. 모의 query 함수를 사용했으며 브라우저 Network 확인은 아닙니다.
- PR #75에는 브라우저 기능과 1분 이내 재방문 캐시 검증이 아직 미체크입니다.

할 일: 새로고침 없이 목록 `1 → 2 → 1` 이동 후 마지막 요청이 생략되는지 Network와 Query Devtools에서 확인하고 결과를 기록합니다.

## FE 7주차 — 본문 구현과 별도 필수 미션 구분

| 구분 | 상태 |
| --- | --- |
| 3.1 회원가입 경로 연결 | 코드 구현 |
| 3.2 회원가입 폼·입력 검증 | 코드 구현, 가짜 응답 없이 입력 로직 검증 |
| 3.3 이메일·닉네임 중복 확인 요청 | 코드 구현, 가짜 응답을 사용한 요청·상태 검증 |
| 3.4 회원가입 POST와 요청 상태·alert | 코드 구현, 가짜 응답을 사용한 성공·실패·본문 검증 |
| 실제 회원 서버와 현재 프론트의 연동 | 실행 상태 확인 필요 |
| **필수: 로그인 화면** | **미구현** |
| **필수: 내 정보 조회 화면** | **미구현** |
| **필수: 내 정보 수정 화면** | **미구현** |
| 필수: 각 페이지 직접 접속 및 입력값 반영 확인 | 위 페이지가 없어 미완료 |

[현재 라우트](../umcine/src/routes/)에는 목록·검색·상세·회원가입만 있습니다. [헤더](../umcine/src/components/layout/header.tsx)의 로그인·내 정보 버튼과 폼 아래 로그인 버튼도 비활성화되어 있습니다.
원문에서 로그인·내 정보의 실제 API 연동은 8주차라고 안내하므로, 이번 미구현 항목은 우선 **화면 퍼블리싱·입력 상태·라우팅**입니다. 7주차 필수 미션 완료를 위해 JWT 로그인 API를 먼저 구현해야 하는 것은 아닙니다.

## 백엔드 원격 확인 — 회원 서버 의존성

| 범위 | GitHub 근거 | 이번 판단 |
| --- | --- | --- |
| BE 3·4 | [PR #36](https://github.com/HSU-Makeus-Challenge-11th/Web_B/pull/36), [PR #42](https://github.com/HSU-Makeus-Challenge-11th/Web_B/pull/42), 도서 API 코드 | 제출·병합 및 BE4 핵심 구조 확인. 전체 실행·제출물 재검증은 이번 회원/프론트 점검 범위 밖 |
| BE 5 | [PR #57](https://github.com/HSU-Makeus-Challenge-11th/Web_B/pull/57), [5주차 기록](https://github.com/HSU-Makeus-Challenge-11th/Web_B/blob/abb178df66547489eddf90e09f4f1b0e76b1fc17/Dongoh/BE/docs/5주차-미션-기록.md), 현재 MemberController/RatingController | 중복 확인·회원별 평점 조회 코드와 실행 기록 존재 |
| BE 6 | [PR #81](https://github.com/HSU-Makeus-Challenge-11th/Web_B/pull/81), [6주차 기록](https://github.com/HSU-Makeus-Challenge-11th/Web_B/blob/abb178df66547489eddf90e09f4f1b0e76b1fc17/Dongoh/BE/docs/6주차-미션-기록.md) | 회원가입·평점 CRUD·오류 응답·H2 증빙 존재 |

BE6 원문 필수 미션과 대조해 DTO 검증, bcrypt 저장, 회원가입 201, 평점 POST/PATCH/DELETE, 400·403·404·409, 삭제 204 및 제출 기록이 확인됩니다.
원격 기록에는 테스트 37건 통과가 적혀 있고 테스트 코드와 HTTP 응답 15건, 캡처 PNG 14개가 있습니다. 원본 응답 JSON에서도 201/400/409/200/403/404/204 사례를 확인했습니다.
**이번 점검에서 원격 백엔드를 다시 빌드·실행한 것은 아닙니다.** 원격 기록도 H2 검증이며 MySQL 실제 연결·동시 요청 부하 검증과 구분한다고 명시하고 있습니다.

## 회원가입을 실제로 확인할 때

[원격 백엔드 README](https://github.com/HSU-Makeus-Challenge-11th/Web_B/blob/abb178df66547489eddf90e09f4f1b0e76b1fc17/Dongoh/BE/README.md)의 실행 방식은 두 가지입니다.

| 방식 | 서버 주소 | 준비 사항 |
| --- | --- | --- |
| 일반 bootRun | `http://localhost:8080` | 최신 백엔드 소스, Java 21, MySQL 스키마 및 DB_PASSWORD |
| H2 practiceServer | `http://localhost:18080` | 최신 백엔드 소스, Java 21. 종료 시 데이터 소멸 |

현재 프론트의 VITE_API_BASE_URL은 8080입니다. 18080 실습 서버를 사용한다면 이 환경변수도 18080으로 맞추고 개발 서버를 재시작해야 합니다.
원격 WebConfig의 허용 origin은 `http://localhost:5173`입니다. 현재 프론트가 다른 포트에서 실행 중이라면 이 설정도 확인해야 합니다.
이는 새 API를 만들 문제와 구분되는 **최신 소스·서버 실행·포트 연결 확인 항목**입니다.

## 우선순위

1. 7주차 필수 미션인 로그인·내 정보 조회·수정 화면을 구현하고 입력 반영을 확인합니다.
2. 이미 GitHub에 있는 최신 백엔드를 별도 작업 공간 등에서 실행하고 프론트와 서버 포트를 맞춰 중복 확인·가입을 실제 검증합니다.
3. 5주차 TMDB 출처 표기를 추가합니다.
4. 3주차 Tailwind 전환을 마무리합니다.
5. 4주차 브라우저 재실행과 6주차 Network·Query Devtools 확인 기록을 보완합니다.
6. 0~2주차는 원본 워크북과 대조한 뒤 최종 완료 여부를 판정합니다.

## 문서 반영 사항

각 week0~week7.md 상단에 필수 미션 판정을 추가했습니다. FE0~FE6의 실제 Issue·PR·병합 커밋 링크도 채웠습니다.
주차 코드 블록은 원본 보존을 위해 구현 당시 내용을 유지했습니다. 점검 결과를 코드 구현 완료와 혼동하지 않도록 상단 판정과 함께 읽습니다.
