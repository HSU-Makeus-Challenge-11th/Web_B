# Dongoh 프론트엔드

영화 앱 하나를 계속 발전시키고, 주차별 작업 내용은 Markdown으로 기록합니다.

```text
FE/
├── umcine/                 # 실제 앱: 앞으로 모든 기능을 이곳에서 구현
│   ├── src/
│   ├── public/
│   ├── package.json
│   ├── pnpm-lock.yaml
│   └── .env.example
├── weeks/
│   ├── week0.md ~ week7.md # 주차별 기록과 필수 미션 판정
│   ├── TEMPLATE.md         # 다음 주차 기록 양식
│   └── migration.md        # 이번 구조 정리 내역
└── .local-backups/          # Git 제외: 통합 전 원본 백업
```

## 실행

저장소 루트의 PowerShell에서:

```powershell
Set-Location ./Dongoh/FE/umcine
pnpm install --frozen-lockfile
# 최초 설정 시에만 복사합니다. 기존 .env.local은 덮어쓰지 않습니다.
if (-not (Test-Path .env.local)) { Copy-Item .env.example .env.local }
# .env.local에 본인의 TMDB 액세스 토큰을 입력합니다.
pnpm dev
```

기존 6주차의 `.env.local`은 새 앱 위치로 옮겼습니다. Git에는 올리지 않습니다.
설치와 실행은 `umcine`에서만 하고, 패키지 매니저는 pnpm으로 통일합니다.
`node_modules`, `dist`, `.env.local`과 로컬 백업은 Git에서 제외합니다.

## 매주 작업하는 순서

1. 이전 작업을 커밋하고 저장소 루트에서 `git status --short`로 남은 변경을 확인합니다.
2. 팀 규칙대로 최신 `main`에서 해당 주차 브랜치를 만듭니다. 예: `Dongoh/FE-07`.
3. 프로젝트를 복사하지 않고 `umcine/src`의 실제 코드를 수정합니다.
4. `weeks/TEMPLATE.md`를 `weeks/week7.md`로 복사하고, 추가·수정한 기능, 실제 저장 경로, 실제 코드, 동작 설명과 검증 결과를 적습니다. 수정한 파일은 변경 전·후 차이도 남깁니다.
5. `umcine`에서 `pnpm build`, `pnpm lint`를 실행하고 주요 화면 동작을 확인합니다.
6. 아래와 같이 실제 코드 변경과 주차 기록을 함께 커밋하고 PR을 만듭니다.

저장소 루트에서 실행하는 7주차 예시:

```powershell
git branch --show-current
git add -- Dongoh/FE/umcine Dongoh/FE/weeks/week7.md
git diff --cached --stat
git diff --cached
git commit -m "Feat: FE 7주차 미션 구현"
```

주차 기록은 변경 내역을 설명하는 문서입니다. **기록 파일만 올리면 실제 구현은 전달되지 않으므로 코드 변경도 함께 올립니다.**
기존 주차 문서에는 해당 주차 원본의 전체 코드와 수정 diff를 함께 보관했습니다. 다음 주차에도 파일별로 어떤 부분을 구현했고 어디에 저장했는지 작성하고, 설명용 예시 대신 실제 구현 코드를 넣습니다.
커밋 전에는 전체 스테이징 내용을 확인합니다. 이미 스테이징된 다른 변경이 자동으로 제외되지는 않습니다.
한 파일에 여러 주차 작업이 섞였다면 `git add -p -- Dongoh/FE/umcine`으로 이번 주차 변경을 선택할 수 있습니다.

## 이번 구조 정리를 처음 커밋할 때

폴더 이동은 새 경로 추가와 기존 경로 삭제를 함께 커밋해야 반영됩니다.
다른 사람의 폴더를 포함하지 않도록 본인 FE 경로로 범위를 한정합니다.

```powershell
git add -A -- Dongoh/FE
git diff --cached --stat
git diff --cached
git commit -m "Refactor: 프론트엔드 앱 통합 및 주차별 기록 분리"
```

커밋 전에는 현재 브랜치가 실제 제출 주차에 맞는지 확인합니다. 구조 정리와 7주차 구현은 본인의 FE 경로로 범위를 한정해 제출합니다.

## 지난 주차 확인

- [필수 미션 보완 구현과 화면 증빙](weeks/required-missions.md) — 최신 구현 상태

- [전체 필수 미션 점검 결과](weeks/mission-audit.md) — GitHub main·PR 및 노션 원문 대조

- [0주차](weeks/week0.md) · [1주차](weeks/week1.md) · [2주차](weeks/week2.md) · [3주차](weeks/week3.md)
- [4주차](weeks/week4.md) · [5주차](weeks/week5.md) · [6주차](weeks/week6.md)
- [7주차 — 회원가입과 로그인·내 정보 화면](weeks/week7.md)
- 과거 전체 코드는 Git의 커밋·PR 이력에서 확인합니다. 커밋 전이었던 원본도 로컬 백업에 보존했습니다.
- [구조 정리와 백업 복원 방법](weeks/migration.md)

## 새 계정 화면

- `/login`: 로그인 퍼블리싱과 입력 상태 확인
- `/profile`: 미리보기 내 정보 조회
- `/profile-edit`: 내 정보 수정·저장·취소

내 정보 수정은 앱 메모리에 반영되며 새로고침하면 초기 미리보기 데이터로 돌아갑니다. 실제 로그인과 내 정보 API 연동은 워크북의 8주차 범위입니다.
