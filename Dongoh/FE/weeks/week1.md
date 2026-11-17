# FE 1주차 — TypeScript 기초

## 필수 미션 점검 — 2026-11-11

**판정: 제출·병합 확인, 필수 미션 전체 판정 보류.** 원본 1주차 워크북이 현재 첨부에 없어 모든 요구사항을 대조할 수 없습니다. TypeScript 실습 코드와 PR은 확인했습니다.

[전체 주차 점검과 GitHub 근거](./mission-audit.md)

> 통합 전 로컬 백업의 해당 주차 코드를 기준으로 작성했습니다. 실제 제출 시점은 Git 커밋·PR 이력을 확인하세요. 코드 블록은 줄바꿈과 후행 공백을 정리했으며, 현재 앱은 후속 주차 변경이 반영되어 있을 수 있습니다.

## 이번 주차에 추가·변경한 부분

- 스터디원 타입과 배열 정의
- 회원 조회와 선택적 속성의 기본값 처리

## 저장 위치와 변경 파일

모든 실제 앱 개발은 `Dongoh/FE/umcine`에서 이어갑니다. 이 문서는 당시 코드와 변경 이유를 보관합니다.

| 구분 | 당시 파일 경로 | 현재 위치 또는 보관 방식 |
| --- | --- | --- |
| 추가 | `Dongoh/FE/week1/package.json` | 이 문서에 코드 보관 |
| 추가 | `Dongoh/FE/week1/pnpm-lock.yaml` | 통합 전 로컬 백업 |
| 추가 | `Dongoh/FE/week1/src/index.ts` | 이 문서에 코드 보관 |
| 추가 | `Dongoh/FE/week1/tsconfig.json` | 이 문서에 코드 보관 |

## 파일별 구현 내용과 코드

### 1. `package.json`

- **당시 저장 경로:** `Dongoh/FE/week1/package.json`
- **현재 저장 위치:** 독립 실습 파일은 이 문서의 코드 블록에 보관합니다. 현재 앱의 실행 파일에는 포함하지 않습니다.
- **구현 내용:** TypeScript 실습의 개발 의존성과 모듈 방식, 사용한 패키지 매니저 정보를 기록합니다.

<details>
<summary>추가한 전체 코드</summary>

```json
{
  "name": "week1-typescript",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devEngines": {
    "packageManager": {
      "name": "pnpm",
      "version": "12.4.1",
      "onFail": "download"
    }
  },
  "packageManager": "pnpm@12.4.1",
  "type": "module",
  "devDependencies": {
    "typescript": "^7.0.2"
  }
}
```

</details>

### 2. `src/index.ts`

- **당시 저장 경로:** `Dongoh/FE/week1/src/index.ts`
- **현재 저장 위치:** 독립 실습 파일은 이 문서의 코드 블록에 보관합니다. 현재 앱의 실행 파일에는 포함하지 않습니다.
- **구현 내용:** StudyMember 타입으로 회원 배열을 구성합니다. find로 ID를 조회하고 없는 회원은 안내 문구를 반환하며 githubId는 ??로 기본값을 적용합니다.

<details>
<summary>추가한 전체 코드</summary>

```typescript
type StudyMember = {
  id: number;
  name: string;
  role: "leader" | "member";
  githubId?: string;
};

const members: StudyMember[] = [
  {
    id: 1,
    name: "광수",
    role: "leader",
    githubId: "gwangsu123",
  },
  {
    id: 2,
    name: "지수",
    role: "member",
  },
];

function createMemberCard(id: number): string {
  const foundMember = members.find((member) => member.id === id);

  if (!foundMember) {
    return "존재하지 않는 회원입니다.";
  }

  const displayGithubId = foundMember.githubId ?? "등록되지 않음";

  return (
    foundMember.name +
    " 님, 역할: " +
    foundMember.role +
    ", GitHub: " +
    displayGithubId
  );
}

console.log(createMemberCard(1));
console.log(createMemberCard(2));
console.log(createMemberCard(999));
```

</details>

### 3. `tsconfig.json`

- **당시 저장 경로:** `Dongoh/FE/week1/tsconfig.json`
- **현재 저장 위치:** 독립 실습 파일은 이 문서의 코드 블록에 보관합니다. 현재 앱의 실행 파일에는 포함하지 않습니다.
- **구현 내용:** TypeScript 실습의 입력·출력 경로와 타입 검사 옵션을 설정합니다.

<details>
<summary>추가한 전체 코드</summary>

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "rootDir": "./src",
    "outDir": "./dist",
    "strict": true
  },
  "include": ["src/**/*.ts"]
}
```

</details>

## 자동 생성 파일·리소스·이전 파일

- `pnpm-lock.yaml`: 패키지의 고정 버전·의존성 해시를 기록하는 자동 생성 파일입니다. 의존성 선언은 위 `package.json` 코드에서 확인하고, lock 파일 전체는 현재 앱 또는 통합 전 백업에서 확인합니다.

## 검증 기록

- 통합 이전 주차별 실행 결과는 별도로 기록되지 않았습니다.
- 통합 후 최신 앱의 빌드·린트는 통과했습니다. [구조 정리 기록](./migration.md)에서 범위를 확인하세요.
- 이 문서의 코드·차이는 통합 전 백업에서 추출했으며 줄바꿈과 후행 공백만 정리했습니다.

## 제출 기록

- Issue: [#12](https://github.com/HSU-Makeus-Challenge-11th/Web_B/issues/12)
- PR: [#13](https://github.com/HSU-Makeus-Challenge-11th/Web_B/pull/13) — main 병합 확인
- 커밋: 병합 커밋 [d2c547f](https://github.com/HSU-Makeus-Challenge-11th/Web_B/commit/d2c547fb8cc0a5d5adffab74e78729b32e1a54b7)
