# 단일 프로젝트 구조로 정리

## 정리 기준

- `week6/umcine`을 최신 앱으로 사용하고 `FE/umcine`으로 이동했습니다.
- 영화 목록·상세·검색, 북마크, TMDB API, React Query 구현을 유지했습니다.
- 각 주차의 중복 앱·이미지·의존성 설치 폴더와 빌드 결과를 정리했습니다.
- 주차 바깥쪽의 중복 `package.json`, npm lock 파일과 pnpm lock 파일을 정리했습니다. 실제 앱의 `package.json`과 `pnpm-lock.yaml`만 사용합니다.
- 0주차 HTML/CSS/JavaScript와 1주차 TypeScript 기초 실습은 해당 주차 문서에 코드를 보관했습니다.
- 주차별 기록은 현재 로컬 파일의 비교 결과입니다. 3·4주차는 내용이 같았고, 정확한 과거 제출 상태를 새로 추정하지 않았습니다.
- 이전에 추가했던 주차 폴더 정리 스크립트는 이 구조에서 필요하지 않아 제거했습니다.

## 커밋 전 코드 보존

통합 전에 다음 로컬 백업을 만들고 파일별 SHA-256 해시와 ZIP 무결성을 확인했습니다.

```text
Dongoh/FE/.local-backups/before-single-project-20261111.zip
```

주차 0~6의 원본 소스·설정·lock 파일 및 이전 안내·정리 스크립트 등 396개 파일을 보관했습니다.
현재 수정 중이던 3주차 소스와 Git 미추적 6주차 소스도 포함합니다.
`node_modules`, `dist`, TypeScript 빌드 캐시 등 다시 만들 수 있는 결과물은 제외했습니다.
백업에는 기존 환경변수 파일도 있으므로 `.local-backups/` 전체를 Git에서 제외합니다.

복원이 필요하면 저장소 루트에서 별도 백업 하위 폴더에 압축을 풉니다.
현재 앱 위에 덮어쓰지 않고 필요한 파일만 비교합니다.

```powershell
Expand-Archive -LiteralPath ./Dongoh/FE/.local-backups/before-single-project-20261111.zip -DestinationPath ./Dongoh/FE/.local-backups/restored
```

## 검증

- 이동 전 6주차 앱: `pnpm build`, `pnpm lint` 통과.
- 이동 후 앱: `pnpm install --frozen-lockfile`, `pnpm build`, `pnpm lint` 통과.
- 앱 소스·설정·환경변수·lock 파일 85개가 이동 전 백업과 동일함을 SHA-256으로 확인했습니다.
- 로컬 백업·환경변수·의존성·빌드 결과의 Git 제외 상태를 확인했습니다.
- 브라우저에서의 실제 API 호출과 화면 조작은 별도로 검증하지 않았습니다.
- 다른 스터디원 폴더와 백엔드 파일은 수정하지 않았습니다.
- 기존 브랜치와 스테이징 상태를 유지하고 커밋·푸시는 실행하지 않았습니다.
