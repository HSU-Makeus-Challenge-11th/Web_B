# FE 0주차 — 웹 개발 기초

## 필수 미션 점검 — 2026-11-11

**판정: 제출·병합 확인, 필수 미션 전체 판정 보류.** 원본 0주차 워크북이 현재 첨부에 없어 과제의 모든 요구사항을 대조할 수 없습니다. HTML/CSS/JavaScript 실습 코드와 PR은 확인했습니다.

[전체 주차 점검과 GitHub 근거](./mission-audit.md)

> 통합 전 로컬 백업의 해당 주차 코드를 기준으로 작성했습니다. 실제 제출 시점은 Git 커밋·PR 이력을 확인하세요. 코드 블록은 줄바꿈과 후행 공백을 정리했으며, 현재 앱은 후속 주차 변경이 반영되어 있을 수 있습니다.

## 이번 주차에 추가·변경한 부분

- HTML/CSS로 자기소개 카드 구성
- 클릭 이벤트로 응원 메시지 변경

## 저장 위치와 변경 파일

모든 실제 앱 개발은 `Dongoh/FE/umcine`에서 이어갑니다. 이 문서는 당시 코드와 변경 이유를 보관합니다.

| 구분 | 당시 파일 경로 | 현재 위치 또는 보관 방식 |
| --- | --- | --- |
| 추가 | `Dongoh/FE/week0/index.html` | 이 문서에 코드 보관 |
| 추가 | `Dongoh/FE/week0/script.js` | 이 문서에 코드 보관 |
| 추가 | `Dongoh/FE/week0/style.css` | 이 문서에 코드 보관 |

## 파일별 구현 내용과 코드

### 1. `index.html`

- **당시 저장 경로:** `Dongoh/FE/week0/index.html`
- **현재 저장 위치:** 독립 실습 파일은 이 문서의 코드 블록에 보관합니다. 현재 앱의 실행 파일에는 포함하지 않습니다.
- **구현 내용:** 카드의 제목·학습 기술 목록·메시지 영역·버튼을 만들고 CSS와 JavaScript를 연결합니다.

<details>
<summary>추가한 전체 코드</summary>

```html
<!doctype html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>나의 웹 개발 카드</title>
    <link rel="stylesheet" href="style.css" />
    <script src="script.js" defer></script>
  </head>
  <body>
    <main class="card">
      <header>
        <p>WEEK 0</p>
        <h1>동오의 웹 개발 시작</h1>
        <p id="message">HTML, CSS, JavaScript를 배우고 있습니다.</p>
      </header>

      <section>
        <h2>배우고 싶은 기술</h2>
        <ul class="skills">
          <li class="skill">HTML</li>
          <li class="skill">CSS</li>
          <li class="skill">JavaScript</li>
        </ul>
      </section>

      <button id="cheer-button" type="button">응원 메시지 보기</button>
    </main>
  </body>
</html>
```

</details>

### 2. `script.js`

- **당시 저장 경로:** `Dongoh/FE/week0/script.js`
- **현재 저장 위치:** 독립 실습 파일은 이 문서의 코드 블록에 보관합니다. 현재 앱의 실행 파일에는 포함하지 않습니다.
- **구현 내용:** querySelector로 메시지와 버튼을 찾고 클릭 이벤트에서 textContent를 응원 문구로 바꿉니다.

<details>
<summary>추가한 전체 코드</summary>

```javascript
const message = document.querySelector("#message");
const cheerButton = document.querySelector("#cheer-button");

cheerButton.addEventListener("click", function () {
    message.textContent = "좋아요! 작은 코드부터 직접 바꾸어 봅시다. 🚀";
});
```

</details>

### 3. `style.css`

- **당시 저장 경로:** `Dongoh/FE/week0/style.css`
- **현재 저장 위치:** 독립 실습 파일은 이 문서의 코드 블록에 보관합니다. 현재 앱의 실행 파일에는 포함하지 않습니다.
- **구현 내용:** 카드 크기·가운데 정렬·기술 태그·버튼 색상과 hover 스타일을 정의합니다.

<details>
<summary>추가한 전체 코드</summary>

```css
body {
    margin: 0;
    background: #f1f5f9;
    color: #0f172a;
}

.card {
    box-sizing: border-box;
    width: 90%;
    max-width: 520px;
    margin: 40px auto;
    padding: 32px;
    border: 1px solid #dbeafe;
    border-radius: 20px;
    background: #ffffff;
}

.skills {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    padding: 0;
    list-style: none;
}

.skill {
    padding: 6px 10px;
    border-radius: 16px;
    background: #dbeafe;
}

button {
    margin-top: 16px;
    padding: 10px 16px;
    border: 0;
    border-radius: 10px;
    background: #2563eb;
    color: #ffffff;
}

button:hover {
    background: #1d4ed8;
}
```

</details>

## 검증 기록

- 통합 이전 주차별 실행 결과는 별도로 기록되지 않았습니다.
- 통합 후 최신 앱의 빌드·린트는 통과했습니다. [구조 정리 기록](./migration.md)에서 범위를 확인하세요.
- 이 문서의 코드·차이는 통합 전 백업에서 추출했으며 줄바꿈과 후행 공백만 정리했습니다.

## 제출 기록

- Issue: [#6](https://github.com/HSU-Makeus-Challenge-11th/Web_B/issues/6)
- PR: [#8](https://github.com/HSU-Makeus-Challenge-11th/Web_B/pull/8) — main 병합 확인
- 커밋: 병합 커밋 [e6d226f](https://github.com/HSU-Makeus-Challenge-11th/Web_B/commit/e6d226fc66508d97b2caa1115657bc42974ed9ca)
