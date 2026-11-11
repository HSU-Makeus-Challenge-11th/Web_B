# FE 2주차 — React 영화 목록 화면

## 필수 미션 점검 — 2026-11-11

**판정: 제출·병합 확인, 필수 미션 전체 판정 보류.** 원본 2주차 워크북이 현재 첨부에 없어 모든 요구사항을 대조할 수 없습니다. 영화 목록·카드 구현과 PR의 실행·빌드 확인 기록은 있습니다.

[전체 주차 점검과 GitHub 근거](./mission-audit.md)

> 통합 전 로컬 백업의 해당 주차 코드를 기준으로 작성했습니다. 실제 제출 시점은 Git 커밋·PR 이력을 확인하세요. 코드 블록은 줄바꿈과 후행 공백을 정리했으며, 현재 앱은 후속 주차 변경이 반영되어 있을 수 있습니다.

## 이번 주차에 추가·변경한 부분

- React + TypeScript + Vite 프로젝트 시작
- 정적 영화 카드·목록과 컴포넌트 상태 기반 북마크 구현

## 저장 위치와 변경 파일

모든 실제 앱 개발은 `Dongoh/FE/umcine`에서 이어갑니다. 이 문서는 당시 코드와 변경 이유를 보관합니다.

| 구분 | 당시 파일 경로 | 현재 위치 또는 보관 방식 |
| --- | --- | --- |
| 추가 | `Dongoh/FE/week2/umcine/.gitignore` | [`umcine/.gitignore`](../umcine/.gitignore) |
| 추가 | `Dongoh/FE/week2/umcine/eslint.config.js` | [`umcine/eslint.config.js`](../umcine/eslint.config.js) |
| 추가 | `Dongoh/FE/week2/umcine/index.html` | [`umcine/index.html`](../umcine/index.html) |
| 추가 | `Dongoh/FE/week2/umcine/package.json` | [`umcine/package.json`](../umcine/package.json) |
| 추가 | `Dongoh/FE/week2/umcine/pnpm-lock.yaml` | [`umcine/pnpm-lock.yaml`](../umcine/pnpm-lock.yaml) |
| 추가 | `Dongoh/FE/week2/umcine/public/favicon.svg` | [`umcine/public/favicon.svg`](../umcine/public/favicon.svg) |
| 추가 | `Dongoh/FE/week2/umcine/public/icons.svg` | [`umcine/public/icons.svg`](../umcine/public/icons.svg) |
| 추가 | `Dongoh/FE/week2/umcine/public/icons/movie-icons/arrow-right.svg` | [`umcine/public/icons/movie-icons/arrow-right.svg`](../umcine/public/icons/movie-icons/arrow-right.svg) |
| 추가 | `Dongoh/FE/week2/umcine/public/icons/movie-icons/bookmark-outline.svg` | [`umcine/public/icons/movie-icons/bookmark-outline.svg`](../umcine/public/icons/movie-icons/bookmark-outline.svg) |
| 추가 | `Dongoh/FE/week2/umcine/public/icons/movie-icons/bookmark.svg` | [`umcine/public/icons/movie-icons/bookmark.svg`](../umcine/public/icons/movie-icons/bookmark.svg) |
| 추가 | `Dongoh/FE/week2/umcine/public/icons/movie-icons/chevron-left.svg` | [`umcine/public/icons/movie-icons/chevron-left.svg`](../umcine/public/icons/movie-icons/chevron-left.svg) |
| 추가 | `Dongoh/FE/week2/umcine/public/icons/movie-icons/chevron-right.svg` | [`umcine/public/icons/movie-icons/chevron-right.svg`](../umcine/public/icons/movie-icons/chevron-right.svg) |
| 추가 | `Dongoh/FE/week2/umcine/public/icons/movie-icons/close.svg` | [`umcine/public/icons/movie-icons/close.svg`](../umcine/public/icons/movie-icons/close.svg) |
| 추가 | `Dongoh/FE/week2/umcine/public/icons/movie-icons/edit.svg` | [`umcine/public/icons/movie-icons/edit.svg`](../umcine/public/icons/movie-icons/edit.svg) |
| 추가 | `Dongoh/FE/week2/umcine/public/icons/movie-icons/lock.svg` | [`umcine/public/icons/movie-icons/lock.svg`](../umcine/public/icons/movie-icons/lock.svg) |
| 추가 | `Dongoh/FE/week2/umcine/public/icons/movie-icons/mail.svg` | [`umcine/public/icons/movie-icons/mail.svg`](../umcine/public/icons/movie-icons/mail.svg) |
| 추가 | `Dongoh/FE/week2/umcine/public/icons/movie-icons/movie.svg` | [`umcine/public/icons/movie-icons/movie.svg`](../umcine/public/icons/movie-icons/movie.svg) |
| 추가 | `Dongoh/FE/week2/umcine/public/icons/movie-icons/person.svg` | [`umcine/public/icons/movie-icons/person.svg`](../umcine/public/icons/movie-icons/person.svg) |
| 추가 | `Dongoh/FE/week2/umcine/public/icons/movie-icons/search.svg` | [`umcine/public/icons/movie-icons/search.svg`](../umcine/public/icons/movie-icons/search.svg) |
| 추가 | `Dongoh/FE/week2/umcine/public/icons/movie-icons/star-outline.svg` | [`umcine/public/icons/movie-icons/star-outline.svg`](../umcine/public/icons/movie-icons/star-outline.svg) |
| 추가 | `Dongoh/FE/week2/umcine/public/icons/movie-icons/star.svg` | [`umcine/public/icons/movie-icons/star.svg`](../umcine/public/icons/movie-icons/star.svg) |
| 추가 | `Dongoh/FE/week2/umcine/public/images/logos/tmdb-logo.svg` | [`umcine/public/images/logos/tmdb-logo.svg`](../umcine/public/images/logos/tmdb-logo.svg) |
| 추가 | `Dongoh/FE/week2/umcine/public/images/movies/colony-backdrop.jpg` | [`umcine/public/images/movies/colony-backdrop.jpg`](../umcine/public/images/movies/colony-backdrop.jpg) |
| 추가 | `Dongoh/FE/week2/umcine/public/images/movies/colony.jpg` | [`umcine/public/images/movies/colony.jpg`](../umcine/public/images/movies/colony.jpg) |
| 추가 | `Dongoh/FE/week2/umcine/public/images/movies/death-of-robin-hood-backdrop.jpg` | [`umcine/public/images/movies/death-of-robin-hood-backdrop.jpg`](../umcine/public/images/movies/death-of-robin-hood-backdrop.jpg) |
| 추가 | `Dongoh/FE/week2/umcine/public/images/movies/death-of-robin-hood.jpg` | [`umcine/public/images/movies/death-of-robin-hood.jpg`](../umcine/public/images/movies/death-of-robin-hood.jpg) |
| 추가 | `Dongoh/FE/week2/umcine/public/images/movies/evil-dead-burn-backdrop.jpg` | [`umcine/public/images/movies/evil-dead-burn-backdrop.jpg`](../umcine/public/images/movies/evil-dead-burn-backdrop.jpg) |
| 추가 | `Dongoh/FE/week2/umcine/public/images/movies/evil-dead-burn.jpg` | [`umcine/public/images/movies/evil-dead-burn.jpg`](../umcine/public/images/movies/evil-dead-burn.jpg) |
| 추가 | `Dongoh/FE/week2/umcine/public/images/movies/last-house-backdrop.jpg` | [`umcine/public/images/movies/last-house-backdrop.jpg`](../umcine/public/images/movies/last-house-backdrop.jpg) |
| 추가 | `Dongoh/FE/week2/umcine/public/images/movies/last-house.jpg` | [`umcine/public/images/movies/last-house.jpg`](../umcine/public/images/movies/last-house.jpg) |
| 추가 | `Dongoh/FE/week2/umcine/public/images/movies/minions-monsters-backdrop.jpg` | [`umcine/public/images/movies/minions-monsters-backdrop.jpg`](../umcine/public/images/movies/minions-monsters-backdrop.jpg) |
| 추가 | `Dongoh/FE/week2/umcine/public/images/movies/minions-monsters.jpg` | [`umcine/public/images/movies/minions-monsters.jpg`](../umcine/public/images/movies/minions-monsters.jpg) |
| 추가 | `Dongoh/FE/week2/umcine/public/images/movies/obsession-backdrop.jpg` | [`umcine/public/images/movies/obsession-backdrop.jpg`](../umcine/public/images/movies/obsession-backdrop.jpg) |
| 추가 | `Dongoh/FE/week2/umcine/public/images/movies/obsession.jpg` | [`umcine/public/images/movies/obsession.jpg`](../umcine/public/images/movies/obsession.jpg) |
| 추가 | `Dongoh/FE/week2/umcine/public/images/movies/odyssey-backdrop.jpg` | [`umcine/public/images/movies/odyssey-backdrop.jpg`](../umcine/public/images/movies/odyssey-backdrop.jpg) |
| 추가 | `Dongoh/FE/week2/umcine/public/images/movies/odyssey.jpg` | [`umcine/public/images/movies/odyssey.jpg`](../umcine/public/images/movies/odyssey.jpg) |
| 추가 | `Dongoh/FE/week2/umcine/public/images/movies/spider-man-brand-new-day-backdrop.jpg` | [`umcine/public/images/movies/spider-man-brand-new-day-backdrop.jpg`](../umcine/public/images/movies/spider-man-brand-new-day-backdrop.jpg) |
| 추가 | `Dongoh/FE/week2/umcine/public/images/movies/spider-man-brand-new-day.jpg` | [`umcine/public/images/movies/spider-man-brand-new-day.jpg`](../umcine/public/images/movies/spider-man-brand-new-day.jpg) |
| 추가 | `Dongoh/FE/week2/umcine/public/images/movies/spider-man-no-way-home-backdrop.jpg` | [`umcine/public/images/movies/spider-man-no-way-home-backdrop.jpg`](../umcine/public/images/movies/spider-man-no-way-home-backdrop.jpg) |
| 추가 | `Dongoh/FE/week2/umcine/public/images/movies/spider-man-no-way-home.jpg` | [`umcine/public/images/movies/spider-man-no-way-home.jpg`](../umcine/public/images/movies/spider-man-no-way-home.jpg) |
| 추가 | `Dongoh/FE/week2/umcine/public/images/movies/toy-story-5-backdrop.jpg` | [`umcine/public/images/movies/toy-story-5-backdrop.jpg`](../umcine/public/images/movies/toy-story-5-backdrop.jpg) |
| 추가 | `Dongoh/FE/week2/umcine/public/images/movies/toy-story-5.jpg` | [`umcine/public/images/movies/toy-story-5.jpg`](../umcine/public/images/movies/toy-story-5.jpg) |
| 추가 | `Dongoh/FE/week2/umcine/src/App.css` | 이 문서 또는 통합 전 로컬 백업 |
| 추가 | `Dongoh/FE/week2/umcine/src/App.tsx` | 이 문서 또는 통합 전 로컬 백업 |
| 추가 | `Dongoh/FE/week2/umcine/src/assets/hero.png` | [`umcine/src/assets/hero.png`](../umcine/src/assets/hero.png) |
| 추가 | `Dongoh/FE/week2/umcine/src/assets/react.svg` | [`umcine/src/assets/react.svg`](../umcine/src/assets/react.svg) |
| 추가 | `Dongoh/FE/week2/umcine/src/assets/vite.svg` | [`umcine/src/assets/vite.svg`](../umcine/src/assets/vite.svg) |
| 추가 | `Dongoh/FE/week2/umcine/src/components/header.tsx` | 이 문서 또는 통합 전 로컬 백업 |
| 추가 | `Dongoh/FE/week2/umcine/src/components/movie-card.tsx` | [`umcine/src/components/movie-card.tsx`](../umcine/src/components/movie-card.tsx) |
| 추가 | `Dongoh/FE/week2/umcine/src/components/movie-grid.tsx` | 이 문서 또는 통합 전 로컬 백업 |
| 추가 | `Dongoh/FE/week2/umcine/src/components/pagination.tsx` | 이 문서 또는 통합 전 로컬 백업 |
| 추가 | `Dongoh/FE/week2/umcine/src/data/movies.ts` | [`umcine/src/data/movies.ts`](../umcine/src/data/movies.ts) |
| 추가 | `Dongoh/FE/week2/umcine/src/index.css` | [`umcine/src/index.css`](../umcine/src/index.css) |
| 추가 | `Dongoh/FE/week2/umcine/src/main.tsx` | [`umcine/src/main.tsx`](../umcine/src/main.tsx) |
| 추가 | `Dongoh/FE/week2/umcine/src/types/movie.ts` | [`umcine/src/types/movie.ts`](../umcine/src/types/movie.ts) |
| 추가 | `Dongoh/FE/week2/umcine/tsconfig.app.json` | [`umcine/tsconfig.app.json`](../umcine/tsconfig.app.json) |
| 추가 | `Dongoh/FE/week2/umcine/tsconfig.json` | [`umcine/tsconfig.json`](../umcine/tsconfig.json) |
| 추가 | `Dongoh/FE/week2/umcine/tsconfig.node.json` | [`umcine/tsconfig.node.json`](../umcine/tsconfig.node.json) |
| 추가 | `Dongoh/FE/week2/umcine/vite.config.ts` | [`umcine/vite.config.ts`](../umcine/vite.config.ts) |

## 파일별 구현 내용과 코드

### 1. `.gitignore`

- **당시 저장 경로:** `Dongoh/FE/week2/umcine/.gitignore`
- **현재 저장 위치:** [`Dongoh/FE/umcine/.gitignore`](../umcine/.gitignore)
- **구현 내용:** 설치 파일, 빌드 결과, 로컬 설정 등 Git에서 제외할 경로를 정의합니다.

<details>
<summary>추가한 전체 코드</summary>

```text
# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
lerna-debug.log*

node_modules
dist
dist-ssr
*.local

# Editor directories and files
.vscode/*
!.vscode/extensions.json
.idea
.DS_Store
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?
```

</details>

### 2. `eslint.config.js`

- **당시 저장 경로:** `Dongoh/FE/week2/umcine/eslint.config.js`
- **현재 저장 위치:** [`Dongoh/FE/umcine/eslint.config.js`](../umcine/eslint.config.js)
- **구현 내용:** JavaScript·TypeScript·React Hooks 코드의 린트 규칙을 설정합니다.

<details>
<summary>추가한 전체 코드</summary>

```javascript
import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: globals.browser,
    },
  },
])
```

</details>

### 3. `index.html`

- **당시 저장 경로:** `Dongoh/FE/week2/umcine/index.html`
- **현재 저장 위치:** [`Dongoh/FE/umcine/index.html`](../umcine/index.html)
- **구현 내용:** 앱이 마운트될 root 요소와 진입 모듈을 지정합니다.

<details>
<summary>추가한 전체 코드</summary>

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>umcine</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

</details>

### 4. `package.json`

- **당시 저장 경로:** `Dongoh/FE/week2/umcine/package.json`
- **현재 저장 위치:** [`Dongoh/FE/umcine/package.json`](../umcine/package.json)
- **구현 내용:** 실행·빌드·린트 명령과 프로젝트에서 사용하는 패키지를 선언합니다.

<details>
<summary>추가한 전체 코드</summary>

```json
{
  "name": "umcine",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "lint": "eslint .",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^19.2.8",
    "react-dom": "^19.2.8"
  },
  "devDependencies": {
    "@eslint/js": "^10.0.1",
    "@types/node": "^24.13.3",
    "@types/react": "^19.2.18",
    "@types/react-dom": "^19.2.7",
    "@vitejs/plugin-react": "^6.1.1",
    "eslint": "^10.10.0",
    "eslint-plugin-react-hooks": "^7.1.1",
    "eslint-plugin-react-refresh": "^0.5.6",
    "globals": "^17.12.0",
    "typescript": "~6.0.2",
    "typescript-eslint": "^8.69.0",
    "vite": "^8.3.0"
  }
}
```

</details>

### 5. `src/App.css`

- **당시 저장 경로:** `Dongoh/FE/week2/umcine/src/App.css`
- **현재 저장 위치:** 현재 앱에서는 사용하지 않는 초기 파일입니다. 이 문서에 당시 코드를 보관합니다.
- **구현 내용:** 정적 영화 목록, 영화 카드와 헤더의 배치·색상·크기를 정의합니다.

<details>
<summary>추가한 전체 코드</summary>

```css
main {
  padding: 40px;
}

.movie-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 24px;
  padding: 0;
  margin: 0;
  list-style: none;
}

.movie-card {
  min-width: 0;
}

.movie-card__poster-wrap {
  position: relative;
}

.movie-card__poster {
  width: 100%;
  aspect-ratio: 2 / 3;
  object-fit: cover;
  display: block;
}

.counter {
  font-size: 16px;
  padding: 5px 10px;
  border-radius: 5px;
  color: var(--accent);
  background: var(--accent-bg);
  border: 2px solid transparent;
  transition: border-color 0.3s;
  margin-bottom: 24px;

  &:hover {
    border-color: var(--accent-border);
  }
  &:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
  }
}

.hero {
  position: relative;

  .base,
  .framework,
  .vite {
    inset-inline: 0;
    margin: 0 auto;
  }

  .base {
    width: 170px;
    position: relative;
    z-index: 0;
  }

  .framework,
  .vite {
    position: absolute;
  }

  .framework {
    z-index: 1;
    top: 34px;
    height: 28px;
    transform: perspective(2000px) rotateZ(300deg) rotateX(44deg) rotateY(39deg)
      scale(1.4);
  }

  .vite {
    z-index: 0;
    top: 107px;
    height: 26px;
    width: auto;
    transform: perspective(2000px) rotateZ(300deg) rotateX(40deg) rotateY(39deg)
      scale(0.8);
  }
}

#center {
  display: flex;
  flex-direction: column;
  gap: 25px;
  place-content: center;
  place-items: center;
  flex-grow: 1;

  @media (max-width: 1024px) {
    padding: 32px 20px 24px;
    gap: 18px;
  }
}

#next-steps {
  display: flex;
  border-top: 1px solid var(--border);
  text-align: left;

  & > div {
    flex: 1 1 0;
    padding: 32px;
    @media (max-width: 1024px) {
      padding: 24px 20px;
    }
  }

  .icon {
    margin-bottom: 16px;
    width: 22px;
    height: 22px;
  }

  @media (max-width: 1024px) {
    flex-direction: column;
    text-align: center;
  }
}

#docs {
  border-right: 1px solid var(--border);

  @media (max-width: 1024px) {
    border-right: none;
    border-bottom: 1px solid var(--border);
  }
}

#next-steps ul {
  list-style: none;
  padding: 0;
  display: flex;
  gap: 8px;
  margin: 32px 0 0;

  .logo {
    height: 18px;
  }

  a {
    color: var(--text-h);
    font-size: 16px;
    border-radius: 6px;
    background: var(--social-bg);
    display: flex;
    padding: 6px 12px;
    align-items: center;
    gap: 8px;
    text-decoration: none;
    transition: box-shadow 0.3s;

    &:hover {
      box-shadow: var(--shadow);
    }
    .button-icon {
      height: 18px;
      width: 18px;
    }
  }

  @media (max-width: 1024px) {
    margin-top: 20px;
    flex-wrap: wrap;
    justify-content: center;

    li {
      flex: 1 1 calc(50% - 8px);
    }

    a {
      width: 100%;
      justify-content: center;
      box-sizing: border-box;
    }
  }
}

#spacer {
  height: 88px;
  border-top: 1px solid var(--border);
  @media (max-width: 1024px) {
    height: 48px;
  }
}

.ticks {
  position: relative;
  width: 100%;

  &::before,
  &::after {
    content: '';
    position: absolute;
    top: -4.5px;
    border: 5px solid transparent;
  }

  &::before {
    left: 0;
    border-left-color: var(--border);
  }
  &::after {
    right: 0;
    border-right-color: var(--border);
  }
}
```

</details>

### 6. `src/App.tsx`

- **당시 저장 경로:** `Dongoh/FE/week2/umcine/src/App.tsx`
- **현재 저장 위치:** 현재 앱에서는 사용하지 않는 초기 파일입니다. 이 문서에 당시 코드를 보관합니다.
- **구현 내용:** Header와 MovieGrid를 조합해 정적 영화 목록 화면을 구성합니다.

<details>
<summary>추가한 전체 코드</summary>

```tsx
import './App.css'
import Header from "./components/header";
import MovieGrid from "./components/movie-grid";

export default function App() {

  return (
    <main>
      <Header/>
      <MovieGrid />
    </main>
  );
}
```

</details>

### 7. `src/components/header.tsx`

- **당시 저장 경로:** `Dongoh/FE/week2/umcine/src/components/header.tsx`
- **현재 저장 위치:** 현재 앱에서는 사용하지 않는 초기 파일입니다. 이 문서에 당시 코드를 보관합니다.
- **구현 내용:** 영화 앱의 제목을 표시하는 초기 헤더 컴포넌트입니다.

<details>
<summary>추가한 전체 코드</summary>

```tsx
export default function Header() {
  return (
    <h1>
     UMC Movie
    </h1>
  );

}
```

</details>

### 8. `src/components/movie-card.tsx`

- **당시 저장 경로:** `Dongoh/FE/week2/umcine/src/components/movie-card.tsx`
- **현재 저장 위치:** [`Dongoh/FE/umcine/src/components/movie-card.tsx`](../umcine/src/components/movie-card.tsx)
- **구현 내용:** 영화 정보와 북마크 버튼을 표시하고 클릭한 영화 ID를 부모로 전달합니다.

<details>
<summary>추가한 전체 코드</summary>

```tsx
import type { Movie } from "../types/movie";

interface MovieCardProps {
  movie: Movie;
  onToggleBookmark: (movieId: number) => void;
}

export default function MovieCard({ movie, onToggleBookmark }: MovieCardProps) {
  const bookmarkIcon = movie.isBookmarked
    ? "/icons/movie-icons/bookmark.svg"
    : "/icons/movie-icons/bookmark-outline.svg";

  return (
    <li className="movie-card">
      <div className="movie-card__poster-wrap">
        <img className="movie-card__poster" src={movie.posterPath} alt={`${movie.title} 포스터`} />
        <button
          className="movie-card__bookmark-button"
          type="button"
          aria-label={`${movie.title} 북마크 ${movie.isBookmarked ? "해제" : "추가"}`}
          aria-pressed={movie.isBookmarked}
          onClick={() => onToggleBookmark(movie.id)}
        >
          <img src={bookmarkIcon} alt="" aria-hidden="true" />
        </button>
      </div>

      <div className="movie-card__content">
        <h2>{movie.title}</h2>
        <p>{movie.originalTitle}</p>
        <span>{movie.releaseDate}</span>
      </div>
    </li>
  );
}
```

</details>

### 9. `src/components/movie-grid.tsx`

- **당시 저장 경로:** `Dongoh/FE/week2/umcine/src/components/movie-grid.tsx`
- **현재 저장 위치:** 현재 앱에서는 사용하지 않는 초기 파일입니다. 이 문서에 당시 코드를 보관합니다.
- **구현 내용:** 정적 영화 데이터를 useState로 관리하고 북마크를 클릭한 영화의 상태를 갱신합니다.

<details>
<summary>추가한 전체 코드</summary>

```tsx
import { useState } from "react";
import { movies as initialMovies } from "../data/movies";
import MovieCard from "../components/movie-card";



export default function MovieGrid() {
    const [movies, setMovies] = useState(initialMovies);

    function handleToggleBookmark(movieId: number) {
        setMovies((currentMovies) =>
            currentMovies.map((movie) =>
                movie.id === movieId
                    ? { ...movie, isBookmarked: !movie.isBookmarked }
                    : movie,
            ),
        );
    }

    return (
        <ul className="movie-grid">
            {movies.map((movie) => (
                <MovieCard
                    key={movie.id}
                    movie={movie}
                    onToggleBookmark={handleToggleBookmark}
                />
            ))}
        </ul>

    );

}
```

</details>

### 10. `src/components/pagination.tsx`

- **당시 저장 경로:** `Dongoh/FE/week2/umcine/src/components/pagination.tsx`
- **현재 저장 위치:** 현재 앱에서는 사용하지 않는 초기 파일입니다. 이 문서에 당시 코드를 보관합니다.
- **구현 내용:** 초기 페이지네이션 파일입니다. 이 주차에는 구현 코드가 없는 빈 파일입니다.

이 파일은 비어 있습니다. 실제 구현 코드는 아직 없습니다.

### 11. `src/data/movies.ts`

- **당시 저장 경로:** `Dongoh/FE/week2/umcine/src/data/movies.ts`
- **현재 저장 위치:** [`Dongoh/FE/umcine/src/data/movies.ts`](../umcine/src/data/movies.ts)
- **구현 내용:** API 연결 전 화면에 사용할 정적 영화 데이터와 이미지 경로를 정의합니다.

<details>
<summary>추가한 전체 코드</summary>

```typescript
import type { Movie } from "../types/movie";

export const movies: Movie[] = [
  {
    id: 1,
    title: "스파이더맨: 브랜드 뉴 데이",
    originalTitle: "Spider-Man: Brand New Day",
    releaseDate: "2026.07.29",
    posterPath: "/images/movies/spider-man-brand-new-day.jpg",
    backdropPath: "/images/movies/spider-man-brand-new-day-backdrop.jpg",
    genres: ["SF", "액션", "모험"],
    runtime: "2시간 25분",
    tagline: "스파이더맨의 새로운 날을 확인하라!",
    overview: "모두의 기억에서 사라진 피터 파커가 새로운 힘과 자신의 정체를 아는 적을 마주해요.",
    isBookmarked: false,
  },
  {
    id: 2,
    title: "오디세이",
    originalTitle: "The Odyssey",
    releaseDate: "2026.08.05",
    posterPath: "/images/movies/odyssey.jpg",
    backdropPath: "/images/movies/odyssey-backdrop.jpg",
    genres: ["모험", "드라마"],
    runtime: "2시간 30분",
    tagline: "집으로 돌아가기 위한 가장 긴 여정",
    overview: "긴 전쟁을 마친 영웅이 수많은 시련을 지나 고향으로 돌아가는 여정을 그려요.",
    isBookmarked: true,
  },
  {
    id: 3,
    title: "스파이더맨: 노 웨이 홈",
    originalTitle: "Spider-Man: No Way Home",
    releaseDate: "2021.12.15",
    posterPath: "/images/movies/spider-man-no-way-home.jpg",
    backdropPath: "/images/movies/spider-man-no-way-home-backdrop.jpg",
    genres: ["액션", "모험", "SF"],
    runtime: "2시간 28분",
    tagline: "모든 세계의 운명이 하나로 이어진다",
    overview: "정체가 드러난 피터 파커가 도움을 청하는 과정에서 여러 세계의 문이 열려요.",
    isBookmarked: false,
  },
  {
    id: 4,
    title: "라스트 하우스",
    originalTitle: "The Last House",
    releaseDate: "2026.08.07",
    posterPath: "/images/movies/last-house.jpg",
    backdropPath: "/images/movies/last-house-backdrop.jpg",
    genres: ["스릴러", "미스터리"],
    runtime: "1시간 42분",
    tagline: "마지막 문을 열면 진실이 드러난다",
    overview: "외딴 저택에 모인 사람들이 감춰진 사건의 흔적을 발견해요.",
    isBookmarked: false,
  },
  {
    id: 5,
    title: "미니언즈 & 몬스터즈",
    originalTitle: "Minions & Monsters",
    releaseDate: "2026.07.15",
    posterPath: "/images/movies/minions-monsters.jpg",
    backdropPath: "/images/movies/minions-monsters-backdrop.jpg",
    genres: ["애니메이션", "코미디", "모험"],
    runtime: "1시간 35분",
    tagline: "작은 영웅들의 거대한 소동",
    overview: "미니언들이 도시를 찾아온 몬스터와 친구가 되며 새로운 모험을 시작해요.",
    isBookmarked: false,
  },
  {
    id: 6,
    title: "군체",
    originalTitle: "Colony",
    releaseDate: "2026.05.21",
    posterPath: "/images/movies/colony.jpg",
    backdropPath: "/images/movies/colony-backdrop.jpg",
    genres: ["SF", "스릴러"],
    runtime: "1시간 48분",
    tagline: "하나의 신호가 모두를 바꾼다",
    overview: "고립된 연구 기지의 구성원들이 정체를 알 수 없는 신호와 마주해요.",
    isBookmarked: false,
  },
  {
    id: 7,
    title: "토이 스토리 5",
    originalTitle: "Toy Story 5",
    releaseDate: "2026.06.17",
    posterPath: "/images/movies/toy-story-5.jpg",
    backdropPath: "/images/movies/toy-story-5-backdrop.jpg",
    genres: ["애니메이션", "모험", "가족"],
    runtime: "1시간 45분",
    tagline: "장난감들의 새로운 모험이 시작된다",
    overview: "우디와 친구들이 새로운 주인을 만나며 장난감의 의미를 다시 찾아가요.",
    isBookmarked: true,
  },
  {
    id: 8,
    title: "로빈 후드의 죽음",
    originalTitle: "The Death of Robin Hood",
    releaseDate: "2026.06.18",
    posterPath: "/images/movies/death-of-robin-hood.jpg",
    backdropPath: "/images/movies/death-of-robin-hood-backdrop.jpg",
    genres: ["액션", "모험", "드라마"],
    runtime: "2시간 10분",
    tagline: "전설의 마지막 화살",
    overview: "오랜 싸움을 마친 로빈 후드가 자신의 마지막 선택과 마주해요.",
    isBookmarked: false,
  },
  {
    id: 9,
    title: "옵세션",
    originalTitle: "Obsession",
    releaseDate: "2026.09.02",
    posterPath: "/images/movies/obsession.jpg",
    backdropPath: "/images/movies/obsession-backdrop.jpg",
    genres: ["스릴러", "드라마"],
    runtime: "1시간 50분",
    tagline: "완벽한 믿음이 집착으로 변한다",
    overview: "한 사람을 향한 믿음이 점차 위험한 집착으로 바뀌기 시작해요.",
    isBookmarked: false,
  },
  {
    id: 10,
    title: "이블 데드 번",
    originalTitle: "Evil Dead Burn",
    releaseDate: "2026.07.07",
    posterPath: "/images/movies/evil-dead-burn.jpg",
    backdropPath: "/images/movies/evil-dead-burn-backdrop.jpg",
    genres: ["공포", "스릴러"],
    runtime: "1시간 40분",
    tagline: "꺼진 불길 속에서 악이 깨어난다",
    overview: "버려진 오두막을 찾은 사람들이 오래 잠들어 있던 악을 깨워요.",
    isBookmarked: false,
  },
];
```

</details>

### 12. `src/index.css`

- **당시 저장 경로:** `Dongoh/FE/week2/umcine/src/index.css`
- **현재 저장 위치:** [`Dongoh/FE/umcine/src/index.css`](../umcine/src/index.css)
- **구현 내용:** 영화 목록·상세·검색·북마크 UI의 공통 스타일과 상태 표시 스타일을 정의합니다.

<details>
<summary>추가한 전체 코드</summary>

```css
:root {
  --text: #6b6375;
  --text-h: #08060d;
  --bg: #fff;
  --border: #e5e4e7;
  --code-bg: #f4f3ec;
  --accent: #aa3bff;
  --accent-bg: rgba(170, 59, 255, 0.1);
  --accent-border: rgba(170, 59, 255, 0.5);
  --social-bg: rgba(244, 243, 236, 0.5);
  --shadow:
    rgba(0, 0, 0, 0.1) 0 10px 15px -3px, rgba(0, 0, 0, 0.05) 0 4px 6px -2px;

  --sans: system-ui, 'Segoe UI', Roboto, sans-serif;
  --heading: system-ui, 'Segoe UI', Roboto, sans-serif;
  --mono: ui-monospace, Consolas, monospace;

  font: 18px/145% var(--sans);
  letter-spacing: 0.18px;
  color-scheme: light dark;
  color: var(--text);
  background: var(--bg);
  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  @media (max-width: 1024px) {
    font-size: 16px;
  }
}

@media (prefers-color-scheme: dark) {
  :root {
    --text: #9ca3af;
    --text-h: #f3f4f6;
    --bg: #16171d;
    --border: #2e303a;
    --code-bg: #1f2028;
    --accent: #c084fc;
    --accent-bg: rgba(192, 132, 252, 0.15);
    --accent-border: rgba(192, 132, 252, 0.5);
    --social-bg: rgba(47, 48, 58, 0.5);
    --shadow:
      rgba(0, 0, 0, 0.4) 0 10px 15px -3px, rgba(0, 0, 0, 0.25) 0 4px 6px -2px;
  }

  #social .button-icon {
    filter: invert(1) brightness(2);
  }
}

#root {
  width: 1126px;
  max-width: 100%;
  margin: 0 auto;
  text-align: center;
  border-inline: 1px solid var(--border);
  min-height: 100svh;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
}

body {
  margin: 0;
}

h1,
h2 {
  font-family: var(--heading);
  font-weight: 500;
  color: var(--text-h);
}

h1 {
  font-size: 56px;
  letter-spacing: -1.68px;
  margin: 32px 0;
  @media (max-width: 1024px) {
    font-size: 36px;
    margin: 20px 0;
  }
}
h2 {
  font-size: 24px;
  line-height: 118%;
  letter-spacing: -0.24px;
  margin: 0 0 8px;
  @media (max-width: 1024px) {
    font-size: 20px;
  }
}
p {
  margin: 0;
}

code,
.counter {
  font-family: var(--mono);
  display: inline-flex;
  border-radius: 4px;
  color: var(--text-h);
}

code {
  font-size: 15px;
  line-height: 135%;
  padding: 4px 8px;
  background: var(--code-bg);
}
```

</details>

### 13. `src/main.tsx`

- **당시 저장 경로:** `Dongoh/FE/week2/umcine/src/main.tsx`
- **현재 저장 위치:** [`Dongoh/FE/umcine/src/main.tsx`](../umcine/src/main.tsx)
- **구현 내용:** React의 createRoot와 StrictMode로 App을 root 요소에 마운트하고 기본 스타일을 불러옵니다.

<details>
<summary>추가한 전체 코드</summary>

```tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

</details>

### 14. `src/types/movie.ts`

- **당시 저장 경로:** `Dongoh/FE/week2/umcine/src/types/movie.ts`
- **현재 저장 위치:** [`Dongoh/FE/umcine/src/types/movie.ts`](../umcine/src/types/movie.ts)
- **구현 내용:** 영화 ID·제목·포스터·장르·북마크 여부를 담는 Movie 타입을 선언합니다.

<details>
<summary>추가한 전체 코드</summary>

```typescript
export interface Movie {
  id: number;
  title: string;
  originalTitle: string;
  releaseDate: string;
  posterPath: string;
  backdropPath: string;
  genres: string[];
  runtime: string;
  tagline: string;
  overview: string;
  isBookmarked: boolean;
}
```

</details>

### 15. `tsconfig.app.json`

- **당시 저장 경로:** `Dongoh/FE/week2/umcine/tsconfig.app.json`
- **현재 저장 위치:** [`Dongoh/FE/umcine/tsconfig.app.json`](../umcine/tsconfig.app.json)
- **구현 내용:** 브라우저 앱의 TypeScript·JSX 타입 검사 옵션을 설정합니다.

<details>
<summary>추가한 전체 코드</summary>

```json
{
  "compilerOptions": {
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.app.tsbuildinfo",
    "target": "es2023",
    "lib": ["ES2023", "DOM"],
    "module": "esnext",
    "types": ["vite/client"],
    "allowArbitraryExtensions": true,
    "skipLibCheck": true,

    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "verbatimModuleSyntax": true,
    "moduleDetection": "force",
    "noEmit": true,
    "jsx": "react-jsx",

    /* Linting */
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "erasableSyntaxOnly": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src"]
}
```

</details>

### 16. `tsconfig.json`

- **당시 저장 경로:** `Dongoh/FE/week2/umcine/tsconfig.json`
- **현재 저장 위치:** [`Dongoh/FE/umcine/tsconfig.json`](../umcine/tsconfig.json)
- **구현 내용:** 앱과 빌드 설정용 TypeScript 프로젝트를 연결합니다.

<details>
<summary>추가한 전체 코드</summary>

```json
{
  "files": [],
  "references": [
    { "path": "./tsconfig.app.json" },
    { "path": "./tsconfig.node.json" }
  ]
}
```

</details>

### 17. `tsconfig.node.json`

- **당시 저장 경로:** `Dongoh/FE/week2/umcine/tsconfig.node.json`
- **현재 저장 위치:** [`Dongoh/FE/umcine/tsconfig.node.json`](../umcine/tsconfig.node.json)
- **구현 내용:** Vite 설정 등 Node 환경에서 실행되는 코드의 타입 검사 옵션을 설정합니다.

<details>
<summary>추가한 전체 코드</summary>

```json
{
  "compilerOptions": {
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.node.tsbuildinfo",
    "target": "es2023",
    "lib": ["ES2023"],
    "types": ["node"],
    "skipLibCheck": true,

    /* Bundler mode */
    "module": "nodenext",
    "allowImportingTsExtensions": true,
    "verbatimModuleSyntax": true,
    "moduleDetection": "force",
    "noEmit": true,

    /* Linting */
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "erasableSyntaxOnly": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["vite.config.ts"]
}
```

</details>

### 18. `vite.config.ts`

- **당시 저장 경로:** `Dongoh/FE/week2/umcine/vite.config.ts`
- **현재 저장 위치:** [`Dongoh/FE/umcine/vite.config.ts`](../umcine/vite.config.ts)
- **구현 내용:** Vite에서 사용할 React·라우팅·스타일 플러그인을 설정합니다.

<details>
<summary>추가한 전체 코드</summary>

```typescript
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
})
```

</details>

## 자동 생성 파일·리소스·이전 파일

- `pnpm-lock.yaml`: 패키지의 고정 버전·의존성 해시를 기록하는 자동 생성 파일입니다. 의존성 선언은 위 `package.json` 코드에서 확인하고, lock 파일 전체는 현재 앱 또는 통합 전 백업에서 확인합니다.
- 이미지·아이콘 파일은 소스 코드가 아닌 화면 리소스로 추가했습니다. 저장 경로는 다음과 같습니다:
  - `Dongoh/FE/umcine/public/favicon.svg`
  - `Dongoh/FE/umcine/public/icons.svg`
  - `Dongoh/FE/umcine/public/icons/movie-icons/arrow-right.svg`
  - `Dongoh/FE/umcine/public/icons/movie-icons/bookmark-outline.svg`
  - `Dongoh/FE/umcine/public/icons/movie-icons/bookmark.svg`
  - `Dongoh/FE/umcine/public/icons/movie-icons/chevron-left.svg`
  - `Dongoh/FE/umcine/public/icons/movie-icons/chevron-right.svg`
  - `Dongoh/FE/umcine/public/icons/movie-icons/close.svg`
  - `Dongoh/FE/umcine/public/icons/movie-icons/edit.svg`
  - `Dongoh/FE/umcine/public/icons/movie-icons/lock.svg`
  - `Dongoh/FE/umcine/public/icons/movie-icons/mail.svg`
  - `Dongoh/FE/umcine/public/icons/movie-icons/movie.svg`
  - `Dongoh/FE/umcine/public/icons/movie-icons/person.svg`
  - `Dongoh/FE/umcine/public/icons/movie-icons/search.svg`
  - `Dongoh/FE/umcine/public/icons/movie-icons/star-outline.svg`
  - `Dongoh/FE/umcine/public/icons/movie-icons/star.svg`
  - `Dongoh/FE/umcine/public/images/logos/tmdb-logo.svg`
  - `Dongoh/FE/umcine/public/images/movies/colony-backdrop.jpg`
  - `Dongoh/FE/umcine/public/images/movies/colony.jpg`
  - `Dongoh/FE/umcine/public/images/movies/death-of-robin-hood-backdrop.jpg`
  - `Dongoh/FE/umcine/public/images/movies/death-of-robin-hood.jpg`
  - `Dongoh/FE/umcine/public/images/movies/evil-dead-burn-backdrop.jpg`
  - `Dongoh/FE/umcine/public/images/movies/evil-dead-burn.jpg`
  - `Dongoh/FE/umcine/public/images/movies/last-house-backdrop.jpg`
  - `Dongoh/FE/umcine/public/images/movies/last-house.jpg`
  - `Dongoh/FE/umcine/public/images/movies/minions-monsters-backdrop.jpg`
  - `Dongoh/FE/umcine/public/images/movies/minions-monsters.jpg`
  - `Dongoh/FE/umcine/public/images/movies/obsession-backdrop.jpg`
  - `Dongoh/FE/umcine/public/images/movies/obsession.jpg`
  - `Dongoh/FE/umcine/public/images/movies/odyssey-backdrop.jpg`
  - `Dongoh/FE/umcine/public/images/movies/odyssey.jpg`
  - `Dongoh/FE/umcine/public/images/movies/spider-man-brand-new-day-backdrop.jpg`
  - `Dongoh/FE/umcine/public/images/movies/spider-man-brand-new-day.jpg`
  - `Dongoh/FE/umcine/public/images/movies/spider-man-no-way-home-backdrop.jpg`
  - `Dongoh/FE/umcine/public/images/movies/spider-man-no-way-home.jpg`
  - `Dongoh/FE/umcine/public/images/movies/toy-story-5-backdrop.jpg`
  - `Dongoh/FE/umcine/public/images/movies/toy-story-5.jpg`
  - `Dongoh/FE/umcine/src/assets/hero.png`
  - `Dongoh/FE/umcine/src/assets/react.svg`
  - `Dongoh/FE/umcine/src/assets/vite.svg`

## 검증 기록

- 통합 이전 주차별 실행 결과는 별도로 기록되지 않았습니다.
- 통합 후 최신 앱의 빌드·린트는 통과했습니다. [구조 정리 기록](./migration.md)에서 범위를 확인하세요.
- 이 문서의 코드·차이는 통합 전 백업에서 추출했으며 줄바꿈과 후행 공백만 정리했습니다.

## 제출 기록

- Issue: [#21](https://github.com/HSU-Makeus-Challenge-11th/Web_B/issues/21)
- PR: [#22](https://github.com/HSU-Makeus-Challenge-11th/Web_B/pull/22) — main 병합 확인
- 커밋: 병합 커밋 [006d8c2](https://github.com/HSU-Makeus-Challenge-11th/Web_B/commit/006d8c2eac906aeb6bb7c2b68bb2db3442d6a6e4)
