# 🍀 HSU UMC 11th Web B 🍀

## 🕓 스터디 일정 & 장소

| 팀 | 요일 | 시간 | 장소 |
| --- | --- | --- | --- |
| B팀 | 금요일 | 11:00 | 코딩 라운지 |

<br>

## 📁 폴더 구조

프로젝트 세팅과 주차별 미션은 반드시 본인의 개인 폴더에서 진행합니다.

개인 폴더 안에서 프론트엔드와 백엔드 파트를 분리합니다.

```text
이름/
├── FE/
└── BE/
```

예시:

```text
Suhhee/
├── FE/
└── BE/
```

주차별 폴더는 별도로 만들지 않습니다.

각 미션의 주차는 다음 항목으로 구분합니다.

- Issue 제목
- Branch 이름
- Pull Request 제목

<br>

## 🚀 미션 진행 방식

### 1. Issue 생성

주차별로 진행할 미션에 대한 Issue를 생성합니다.

[Issue 생성 화면](https://github.com/HSU-Makeus-Challenge-11th/Web_B/issues/new/choose)에서 작업 파트와 작업 유형에 맞는 템플릿을 선택합니다.

#### Frontend

- `[Frontend] Feature`
- `[Frontend] Fix`
- `[Frontend] Refactor`
- `[Frontend] Chore`
- `[Frontend] Docs`
- `[Frontend] CI/CD`

#### Backend

- `[Backend] Feature`
- `[Backend] Fix`
- `[Backend] Refactor`
- `[Backend] Chore`
- `[Backend] Docs`
- `[Backend] CI/CD`

Issue 제목의 `주차` 부분을 실제 주차 번호로 변경합니다.

```text
✨ Feat: [FE-01] 로그인 화면 구현
🐛 Fix: [FE-02] 버튼 클릭 오류 수정
✨ Feat: [BE-01] 회원가입 API 구현
🐛 Fix: [BE-02] 로그인 요청 오류 수정
```

### 2. Branch 생성

생성한 Issue를 기준으로 `main` 브랜치에서 개인 브랜치를 생성합니다.

#### Frontend 브랜치

```text
[이름]/FE-[주차]
```

#### Backend 브랜치

```text
[이름]/BE-[주차]
```

예시:

```text
Suhhee/FE-01
Suhhee/BE-03
```

### 3. 작업 진행

모든 작업은 본인의 개인 폴더 안에서 진행합니다.

- 프론트엔드 작업: `[이름]/FE`
- 백엔드 작업: `[이름]/BE`

다른 스터디원의 폴더는 수정하지 않습니다.

### 4. Pull Request 생성

작업이 끝나면 Pull Request를 생성합니다.

PR의 브랜치는 다음과 같이 설정합니다.

```text
base: main
compare: 본인의 작업 브랜치
```

예시:

```text
base: main
compare: Suhhee/FE-01
```

PR 제목은 다음 형식을 사용합니다.

```text
[이름] 파트-주차
```

예시:

```text
[Suhhee] FE-01
[Suhhee] BE-03
```

PR 본문에서는 작업 파트를 선택하고 해당 파트에 필요한 항목을 작성합니다.

연관된 Issue는 다음 형식으로 연결합니다.

```text
Closes #이슈번호
```

예시:

```text
Closes #12
```

PR이 `main` 브랜치에 병합되면 연결된 Issue가 자동으로 닫힙니다.

<br>

## 💡 작업 범위 규칙

- ✅ 본인 폴더 내 미션 코드 작성
- ✅ 본인 폴더 내 리팩토링, 테스트 및 문서 보완
- ✅ 본인 브랜치에서 작업
- ✅ 작업 파트에 맞는 Issue 템플릿 사용
- ❌ 다른 스터디원의 개인 폴더 수정
- ❌ 공통 구조 임의 변경
- ❌ 다른 스터디원의 브랜치에서 작업
- ❌ 본인의 작업 브랜치를 PR의 base로 설정
- ❌ API 키, 비밀번호, 환경변수 등 민감한 정보 업로드

공통 구조를 변경해야 한다면 임의로 수정하지 않고 스터디원과 먼저 논의합니다.

<br>

## 🤙🏼 컨벤션

### 💡 Issue 제목

```text
이모지 Type: [파트-주차] 작업 내용
```

예시:

```text
✨ Feat: [FE-01] 로그인 화면 구현
♻️ Refactor: [FE-02] 공통 버튼 컴포넌트 분리
✨ Feat: [BE-01] 회원가입 API 구현
🐛 Fix: [BE-02] 토큰 갱신 오류 수정
```

### 💡 개인 브랜치명

Frontend:

```text
[이름]/FE-[주차]
```

Backend:

```text
[이름]/BE-[주차]
```

예시:

```text
Suhhee/FE-01
Suhhee/BE-03
```

### 💡 커밋 메시지

```text
Type: 메시지
```

예시:

```text
Feat: 로그인 화면 구현
Fix: 회원가입 요청 오류 수정
Design: 메인 화면 레이아웃 수정
```

### 💻 Commit Message Convention

| Type | Description |
| --- | --- |
| Feat | 새로운 기능 추가 |
| Fix | 버그 수정 |
| Docs | 문서 수정 |
| Style | 포맷팅, 세미콜론 누락 등 코드 동작에 영향을 주지 않는 수정 |
| Refactor | 기능 변경 없는 코드 리팩토링 |
| Test | 테스트 코드 추가 및 수정 |
| Chore | 패키지 매니저, 설정 파일 및 기타 작업 |
| Design | CSS 등 사용자 UI 디자인 변경 |
| Comment | 필요한 주석 추가 및 변경 |
| Rename | 파일 또는 폴더 이름 변경 및 이동 |
| Remove | 파일 삭제 |
| Init | 프로젝트 초기 설정 |
| Merge | 브랜치 병합 |
| !BREAKING CHANGE | 호환되지 않는 큰 변경 |
| !HOTFIX | 치명적인 문제의 긴급 수정 |

### 💡 Pull Request 제목

```text
[이름] 파트-주차
```

예시:

```text
[Suhhee] FE-01
[Suhhee] BE-03
```

<br>

## ✅ Pull Request 확인 사항

### 공통

- Issue가 연결되어 있는지 확인합니다.
- PR의 base가 `main`인지 확인합니다.
- compare가 본인의 작업 브랜치인지 확인합니다.
- 본인의 폴더 외 파일이 변경되지 않았는지 확인합니다.
- 로컬에서 프로젝트가 정상적으로 실행되는지 확인합니다.
- 불필요한 주석과 로그를 제거합니다.

### Frontend

- UI 변경이 있다면 스크린샷을 첨부합니다.
- 주요 사용자 동작이 정상적으로 작동하는지 확인합니다.
- 필요한 화면 크기에서 레이아웃을 확인합니다.
- 브라우저 콘솔에 불필요한 오류가 없는지 확인합니다.

### Backend

- 변경된 API 또는 데이터 모델을 설명합니다.
- 필요한 테스트를 실행합니다.
- API 문서 또는 ERD 변경 여부를 확인합니다.
- 환경변수나 민감한 정보가 포함되지 않았는지 확인합니다.