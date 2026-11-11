# FE 7주차 — 회원가입과 로그인·내 정보 화면

## 필수 미션 보완 구현 — 최신 상태

필수인 로그인·내 정보 조회·수정 화면과 /login·/profile·/profile-edit 경로를 추가했습니다. 실제 브라우저에서 로그인 입력, 프로필 수정·저장·취소·조회 반영을 확인했습니다. 워크북의 8주차 범위인 실제 로그인/내 정보 API는 연결하지 않았습니다. 회원가입 성공 후 로그인 이동은 노션 안내에 따라 연결했습니다.

[추가·수정한 파일 경로, 전체 코드와 화면 증빙](./required-missions.md)

## 구현 전 필수 미션 점검 — 2026-11-11

**판정: 본문 3.1~3.4 프론트엔드 구현 완료, 별도 필수 미션 미완료.** 워크북의 필수 미션은 **로그인·내 정보 조회·내 정보 수정 화면 퍼블리싱**입니다. 현재 세 화면과 라우트가 없으며 로그인·내 정보 버튼은 비활성화되어 있습니다. 회원가입 본문 구현과 필수 미션 완료를 구분합니다.

**회원 API 재확인:** GitHub main의 Dongoh/BE에 회원 API가 이미 있습니다. 앞서 오래된 로컬 브랜치만 보고 백엔드 API가 없다고 판단한 설명은 정정합니다. 로컬 8080 연결 거부는 실행 상태 문제이고, API 코드 미존재를 뜻하지 않습니다. 자세한 코드·포트 근거는 종합 점검을 참고하세요.

[전체 주차 점검과 GitHub 근거](./mission-audit.md)

## 구현 기준과 범위

**사용자가 붙여넣은 노션 워크북을 기준으로 구현했습니다.**

- 3.1: `/signup` 경로와 회원가입 컴포넌트 연결. 예제의 @ 경로를 사용하기 위한 설정.
- 3.2: 제공된 회원가입 디자인 이미지를 참고한 폼과 네 입력값의 검증.
- 3.3: 이메일·닉네임 중복 확인, 확인 상태 관리, 값 수정 시 확인 결과 초기화.
- 3.4: `POST /members` 회원가입 요청, 진행 상태와 버튼 비활성화, 서버 메시지·오류 alert 안내.
- 문서의 `useState`, `try/catch/finally`, `alert` 방식을 사용합니다. 8주차의 `useMutation`으로 바꾸지 않았습니다.
- 필수 미션 보완에서 로그인·내 정보 조회·수정 화면을 추가했습니다. 노션의 안내에 따라 로그인 페이지 연결 후 useNavigate 주석을 해제했고 회원가입 성공 시 /login으로 이동합니다. 로그인·내 정보의 서버 API 연동은 8주차 범위입니다.

## 노션 예제와 실제 파일의 대응

| 노션의 구현 항목 | 실제 저장 위치 | 반영 방식 |
| --- | --- | --- |
| 3.3 env에 회원 서버 주소 추가 | `Dongoh/FE/umcine/src/config/env.ts` | 기존 env에 apiBaseUrl 추가 |
| 3.3 ky 공통 클라이언트 | `Dongoh/FE/umcine/src/api/api-client.ts` | 코드 블록 그대로 저장 |
| 3.3 이메일 중복 확인 함수 | `Dongoh/FE/umcine/src/api/members/check-email-duplicate.ts` | 코드 블록 그대로 저장 |
| 3.3 닉네임 중복 확인 함수 | `Dongoh/FE/umcine/src/api/members/check-nickname-duplicate.ts` | 코드 블록 그대로 저장 |
| 3.3 확인 상태·버튼·입력 연결 | `Dongoh/FE/umcine/src/pages/auth/signup-page.tsx` | 문서의 상태와 핸들러를 기존 UI에 연결 |
| 3.4 회원가입 요청 함수와 타입 | `Dongoh/FE/umcine/src/api/members/signup.ts` | 코드 블록 그대로 저장 |
| 3.4 제출 상태·버튼·alert | `Dongoh/FE/umcine/src/pages/auth/signup-page.tsx` | 문서의 handleSubmit과 isSubmitting 반영, 로그인 페이지 연결 후 이동 주석 해제 |
| 회원 서버 환경변수 | `Dongoh/FE/umcine/.env.local` | VITE_API_BASE_URL=http://localhost:8080 설정, Git 제외 |

워크북의 `src/...`는 **앱 루트 `Dongoh/FE/umcine`** 기준입니다.

## 입력값 검증

| 입력 | 검사 조건 |
| --- | --- |
| 이메일 | trim한 값이 EMAIL_REGEX와 일치 |
| 닉네임 | trim한 길이가 2~12 |
| 비밀번호 | 영문 소문자·대문자·숫자·!@#$%^&* 각각 포함, 8자 이상, 허용 문자만 사용 |
| 비밀번호 확인 | 비어 있지 않고 비밀번호와 동일 |

입력을 시작한 필드에만 오류를 표시하며, 기존 label·aria-invalid·aria-describedby 연결을 유지합니다.

## 3.3 중복 확인의 동작

1. 형식이 올바른 이메일 또는 닉네임의 중복 확인 버튼을 누릅니다.
2. `isChecking`을 true로 바꾸고 해당 입력과 버튼을 잠급니다. 버튼은 **확인 중**으로 표시합니다.
3. trim한 값을 요청 함수에 전달합니다. 요청 함수는 경로 값을 encodeURIComponent로 인코딩합니다.
4. 응답의 `available`을 `isAvailable`에 저장하고 사용 가능 여부를 alert로 보여줍니다.
5. 실패하면 `isAvailable`을 false로 두고 **중복 확인에 실패했어요. 다시 시도해 주세요.**를 알립니다.
6. finally에서 `isChecking`을 false로 되돌려 입력과 버튼을 다시 사용할 수 있게 합니다.
7. 확인한 이메일 또는 닉네임을 수정하면 **그 필드의 확인 결과만 초기화**합니다. 다시 중복 확인해야 가입할 수 있습니다.

## 3.4 회원가입의 동작

1. 네 입력값 검증과 두 중복 확인이 모두 통과해야 `canSubmit`이 true가 됩니다.
2. 제출 시 preventDefault로 새로고침을 막고 `!canSubmit || isSubmitting`이면 요청하지 않습니다.
3. `isSubmitting`을 true로 두고 버튼을 잠그며 **가입 중**을 표시합니다.
4. 이메일·닉네임은 trim하고 비밀번호는 그대로 POST /members에 전송합니다. **passwordConfirm은 보내지 않습니다.**
5. 성공 응답의 `message`를 alert로 표시하고 /login으로 이동합니다. 노션의 로그인 페이지 연결 후 주석 해제 안내를 적용했습니다.
6. 실패하면 **회원가입에 실패했어요. 다시 시도해 주세요.**를 알리고 입력값은 유지합니다.
7. finally에서 `isSubmitting`을 false로 되돌려 재시도할 수 있게 합니다.

문서의 응답 타입은 `isSuccess`, `code`, `message`, `result`를 포함합니다. 응답 처리 방식도 문서와 같이 성공한 요청의 message를 표시하고, 실패한 요청은 catch에서 안내합니다.

## 회원가입 본문 파일과 현재 코드

로그인·프로필·Tailwind 보완의 신규 파일 전체 코드는 [필수 미션 보완 기록](./required-missions.md)에 있습니다. 아래 diff는 3.4 본문 구현 당시 변경 내역을 보존하고 전체 코드 블록은 현재 파일로 갱신했습니다.

### 1. 3.1 회원가입 페이지 경로

- **구분:** 유지
- **저장 경로:** [`Dongoh/FE/umcine/src/routes/signup.tsx`](../umcine/src/routes/signup.tsx)
- **코드 내용과 역할:** `/signup`과 SignupPage를 연결하는 기존 코드입니다.

<details>
<summary>현재 전체 코드</summary>

```tsx
import { createFileRoute } from "@tanstack/react-router";
import { SignupPage } from "@/pages/auth/signup-page";

export const Route = createFileRoute("/signup")({ component: SignupPage });
```

</details>

### 2. 3.1 Vite 경로 별칭

- **구분:** 유지
- **저장 경로:** [`Dongoh/FE/umcine/vite.config.ts`](../umcine/vite.config.ts)
- **코드 내용과 역할:** 워크북의 `@/pages/...` import를 사용하도록 @를 앱의 src에 연결했습니다.

<details>
<summary>현재 전체 코드</summary>

```typescript
import { defineConfig } from "vite";
import { fileURLToPath, URL } from "node:url";
import react from "@vitejs/plugin-react";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  plugins: [
    tanstackRouter({ autoCodeSplitting: true }),
    react(),
    tailwindcss(),
  ],
});
```

</details>

### 3. 3.1 TypeScript 경로 별칭

- **구분:** 유지
- **저장 경로:** [`Dongoh/FE/umcine/tsconfig.app.json`](../umcine/tsconfig.app.json)
- **코드 내용과 역할:** 타입 검사와 편집기가 @/*를 ./src/*로 찾도록 설정했습니다.

<details>
<summary>현재 전체 코드</summary>

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    },
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

### 4. 3.3 회원 서버 주소

- **구분:** 수정
- **저장 경로:** [`Dongoh/FE/umcine/src/config/env.ts`](../umcine/src/config/env.ts)
- **코드 내용과 역할:** 노션 문서대로 기존 env 객체에 `apiBaseUrl: import.meta.env.VITE_API_BASE_URL || ""`를 추가했습니다. TMDB 환경변수는 기존대로 유지합니다.

**이번에 추가·수정한 부분:**

```diff
--- 3.2까지/src/config/env.ts
+++ 3.4까지/src/config/env.ts
@@ -8,4 +8,5 @@
 export const env = {
   tmdbApiBaseUrl,
   tmdbAccessToken,
-};+  apiBaseUrl: import.meta.env.VITE_API_BASE_URL || "",
+};
```

<details>
<summary>현재 전체 코드</summary>

```typescript
const tmdbApiBaseUrl = import.meta.env.VITE_TMDB_API_BASE_URL;
const tmdbAccessToken = import.meta.env.VITE_TMDB_ACCESS_TOKEN;

if (!tmdbApiBaseUrl || !tmdbAccessToken) {
  throw new Error("TMDB 환경 변수가 필요해요.");
}

export const env = {
  tmdbApiBaseUrl,
  tmdbAccessToken,
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL || "",
};
```

</details>

### 5. 3.3 회원 서버 공통 클라이언트

- **구분:** 추가
- **저장 경로:** [`Dongoh/FE/umcine/src/api/api-client.ts`](../umcine/src/api/api-client.ts)
- **코드 내용과 역할:** 노션의 코드 블록을 그대로 저장했습니다. ky.create에 env.apiBaseUrl을 전달합니다. TMDB 전용 클라이언트의 인증 헤더를 회원 서버에 재사용하지 않습니다.

<details>
<summary>현재 전체 코드</summary>

```typescript
import ky from "ky";
import { env } from "../config/env";

export const apiClient = ky.create({ baseUrl: env.apiBaseUrl });
```

</details>

### 6. 3.3 이메일 중복 확인 요청

- **구분:** 추가
- **저장 경로:** [`Dongoh/FE/umcine/src/api/members/check-email-duplicate.ts`](../umcine/src/api/members/check-email-duplicate.ts)
- **코드 내용과 역할:** 노션의 코드 블록과 동일합니다. encodeURIComponent로 이메일을 경로에 넣고 GET /members/email/{email}의 available 값을 읽습니다.

<details>
<summary>현재 전체 코드</summary>

```typescript
import { apiClient } from "../api-client";

export interface CheckEmailDuplicateResponse {
  available: boolean;
}

export function checkEmailDuplicate(email: string) {
  return apiClient
    .get(`members/email/${encodeURIComponent(email)}`)
    .json<CheckEmailDuplicateResponse>();
}
```

</details>

### 7. 3.3 닉네임 중복 확인 요청

- **구분:** 추가
- **저장 경로:** [`Dongoh/FE/umcine/src/api/members/check-nickname-duplicate.ts`](../umcine/src/api/members/check-nickname-duplicate.ts)
- **코드 내용과 역할:** 노션의 코드 블록과 동일합니다. encodeURIComponent로 닉네임을 경로에 넣고 GET /members/nickname/{nickname}의 available 값을 읽습니다.

<details>
<summary>현재 전체 코드</summary>

```typescript
import { apiClient } from "../api-client";

export interface CheckNicknameDuplicateResponse {
  available: boolean;
}

export function checkNicknameDuplicate(nickname: string) {
  return apiClient
    .get(`members/nickname/${encodeURIComponent(nickname)}`)
    .json<CheckNicknameDuplicateResponse>();
}
```

</details>

### 8. 3.4 회원가입 요청과 응답 타입

- **구분:** 추가
- **저장 경로:** [`Dongoh/FE/umcine/src/api/members/signup.ts`](../umcine/src/api/members/signup.ts)
- **코드 내용과 역할:** 노션의 SignupRequest·SignupResponse 타입과 signup 함수를 그대로 저장했습니다. POST /members에 email·nickname·password를 JSON으로 전달합니다.

<details>
<summary>현재 전체 코드</summary>

```typescript
import { apiClient } from "../api-client";

export interface SignupRequest {
  email: string;
  nickname: string;
  password: string;
}

export interface SignupResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: {
    memberId: number;
    email: string;
    nickname: string;
  };
}

export function signup(body: SignupRequest) {
  return apiClient.post("members", { json: body }).json<SignupResponse>();
}
```

</details>

### 9. 3.2~3.4 폼·중복 확인·제출 상태 연결

- **구분:** 수정
- **저장 경로:** [`Dongoh/FE/umcine/src/pages/auth/signup-page.tsx`](../umcine/src/pages/auth/signup-page.tsx)
- **코드 내용과 역할:** 기존 디자인과 입력값 검증을 유지하고 노션의 DEFAULT_DUPLICATE_CHECK, duplicateCheck, canSubmit, handleChangeField, handleCheckDuplicate, isSubmitting, handleSubmit을 연결했습니다. 결과와 실패는 alert로 알리고, 로그인 페이지가 연결되어 문서의 안내대로 로그인 이동 코드를 활성화했습니다. 이전의 입력값 확인 전용 안내 상태는 실제 회원가입 요청으로 교체했습니다.

**이번에 추가·수정한 부분:**

```diff
--- 3.2까지/src/pages/auth/signup-page.tsx
+++ 3.4까지/src/pages/auth/signup-page.tsx
@@ -1,4 +1,8 @@
-import { useState, type SubmitEvent } from "react";
+import { useState } from "react";
+import { checkEmailDuplicate } from "@/api/members/check-email-duplicate";
+import { checkNicknameDuplicate } from "@/api/members/check-nickname-duplicate";
+import { signup } from "@/api/members/signup";
+// import { useNavigate } from "@tanstack/react-router";
 import "./signup-page.css";

 // 이메일 형식 검사
@@ -17,9 +21,21 @@
 type DefaultFormKey = keyof typeof DEFAULT_FORM;
 type DefaultFormValue = (typeof DEFAULT_FORM)[DefaultFormKey];

+const DEFAULT_DUPLICATE_CHECK = {
+  isChecking: false,
+  isAvailable: false,
+};
+
+type DuplicateCheckKey = "email" | "nickname";
+
 export function SignupPage() {
   const [form, setForm] = useState(DEFAULT_FORM);
-  const [hasCheckedForm, setHasCheckedForm] = useState(false);
+  const [duplicateCheck, setDuplicateCheck] = useState({
+    email: DEFAULT_DUPLICATE_CHECK,
+    nickname: DEFAULT_DUPLICATE_CHECK,
+  });
+  const [isSubmitting, setIsSubmitting] = useState(false);
+  // const navigate = useNavigate();

   // 입력값의 유효성 검사
   const isEmailValid = EMAIL_REGEX.test(form.email.trim());
@@ -43,18 +59,79 @@
     isPasswordValid &&
     isPasswordConfirmValid;

+  // 입력 조건과 두 중복 확인을 모두 통과해야 제출 가능
+  const canSubmit =
+    isFormValid &&
+    duplicateCheck.email.isAvailable &&
+    duplicateCheck.nickname.isAvailable;
+
   const handleChangeField = (key: DefaultFormKey, value: DefaultFormValue) => {
+    if (key === "email" || key === "nickname") {
+      if (duplicateCheck[key].isChecking) return;
+      // 확인한 값을 바꾸면 다시 중복 확인해야 함
+      setDuplicateCheck((prev) => ({ ...prev, [key]: DEFAULT_DUPLICATE_CHECK }));
+    }
     setForm((prev) => ({ ...prev, [key]: value }));
-    setHasCheckedForm(false);
   };

-  const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
-    // 폼 제출 시 페이지 새로고침 방지
-    event.preventDefault();
-    if (!isFormValid) return;
-
-    setHasCheckedForm(true);
-    // 3.4에서 회원가입 API 요청 추가
+  const handleCheckDuplicate = async (key: DuplicateCheckKey) => {
+    const isValid = key === "email" ? isEmailValid : isNicknameValid;
+    if (!isValid || duplicateCheck[key].isChecking) return;
+
+    const label = key === "email" ? "이메일" : "닉네임";
+    setDuplicateCheck((prev) => ({
+      ...prev,
+      [key]: { isChecking: true, isAvailable: false },
+    }));
+
+    try {
+      const response =
+        key === "email"
+          ? await checkEmailDuplicate(form.email.trim())
+          : await checkNicknameDuplicate(form.nickname.trim());
+      const isAvailable = response.available;
+      setDuplicateCheck((prev) => ({
+        ...prev,
+        [key]: { ...prev[key], isAvailable },
+      }));
+      alert(
+        isAvailable
+          ? `사용할 수 있는 ${label}이에요.`
+          : `이미 사용 중인 ${label}이에요.`,
+      );
+    } catch {
+      setDuplicateCheck((prev) => ({
+        ...prev,
+        [key]: { ...prev[key], isAvailable: false },
+      }));
+      alert("중복 확인에 실패했어요. 다시 시도해 주세요.");
+    } finally {
+      setDuplicateCheck((prev) => ({
+        ...prev,
+        [key]: { ...prev[key], isChecking: false },
+      }));
+    }
+  };
+
+  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
+    e.preventDefault();
+    if (!canSubmit || isSubmitting) return;
+
+    setIsSubmitting(true);
+    try {
+      const response = await signup({
+        email: form.email.trim(),
+        nickname: form.nickname.trim(),
+        password: form.password,
+      });
+      alert(response.message);
+      // 로그인 페이지 연결 후 주석 해제
+      // navigate({ to: "/login" });
+    } catch {
+      alert("회원가입에 실패했어요. 다시 시도해 주세요.");
+    } finally {
+      setIsSubmitting(false);
+    }
   };

   // noValidate는 폼 제출 시 브라우저의 기본 유효성 검사를 끔
@@ -76,6 +153,7 @@
                 autoComplete="email"
                 placeholder="name@example.com"
                 value={form.email}
+                disabled={duplicateCheck.email.isChecking}
                 onChange={(event) =>
                   handleChangeField("email", event.target.value)
                 }
@@ -83,9 +161,13 @@
                 aria-describedby={showEmailError ? "signup-email-error" : undefined}
                 required
               />
-              {/* 중복 확인 요청은 워크북 3.3에서 연결합니다. */}
-              <button className="signup-duplicate-button" type="button" disabled>
-                중복 확인
+              <button
+                className="signup-duplicate-button"
+                type="button"
+                disabled={!isEmailValid || duplicateCheck.email.isChecking}
+                onClick={() => handleCheckDuplicate("email")}
+              >
+                {duplicateCheck.email.isChecking ? "확인 중" : "중복 확인"}
               </button>
             </div>
             {showEmailError && (
@@ -107,6 +189,7 @@
                 autoComplete="nickname"
                 placeholder="2–12자"
                 value={form.nickname}
+                disabled={duplicateCheck.nickname.isChecking}
                 onChange={(event) =>
                   handleChangeField("nickname", event.target.value)
                 }
@@ -114,8 +197,13 @@
                 aria-describedby={showNicknameError ? "signup-nickname-error" : undefined}
                 required
               />
-              <button className="signup-duplicate-button" type="button" disabled>
-                중복 확인
+              <button
+                className="signup-duplicate-button"
+                type="button"
+                disabled={!isNicknameValid || duplicateCheck.nickname.isChecking}
+                onClick={() => handleCheckDuplicate("nickname")}
+              >
+                {duplicateCheck.nickname.isChecking ? "확인 중" : "중복 확인"}
               </button>
             </div>
             {showNicknameError && (
@@ -185,15 +273,10 @@
           <button
             className="signup-submit-button"
             type="submit"
-            disabled={!isFormValid}
+            disabled={!canSubmit || isSubmitting}
           >
-            가입하기
+            {isSubmitting ? "가입 중" : "가입하기"}
           </button>
-          {hasCheckedForm && (
-            <p className="signup-form__notice" role="status">
-              입력값이 모두 올바릅니다.
-            </p>
-          )}
         </form>

         <p className="signup-panel__login">
```

<details>
<summary>현재 전체 코드</summary>

```tsx
import { useState } from "react";
import { checkEmailDuplicate } from "@/api/members/check-email-duplicate";
import { checkNicknameDuplicate } from "@/api/members/check-nickname-duplicate";
import { signup } from "@/api/members/signup";
import { Link, useNavigate } from "@tanstack/react-router";
import "./signup-page.css";

// 이메일 형식 검사
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// 영문 대소문자, 숫자, 특수문자(!@#$%^&*)를 모두 포함해 8자 이상
const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,}$/;

const DEFAULT_FORM = {
  email: "",
  nickname: "",
  password: "",
  passwordConfirm: "",
};

type DefaultFormKey = keyof typeof DEFAULT_FORM;
type DefaultFormValue = (typeof DEFAULT_FORM)[DefaultFormKey];

const DEFAULT_DUPLICATE_CHECK = {
  isChecking: false,
  isAvailable: false,
};

type DuplicateCheckKey = "email" | "nickname";

export function SignupPage() {
  const [form, setForm] = useState(DEFAULT_FORM);
  const [duplicateCheck, setDuplicateCheck] = useState({
    email: DEFAULT_DUPLICATE_CHECK,
    nickname: DEFAULT_DUPLICATE_CHECK,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  // 입력값의 유효성 검사
  const isEmailValid = EMAIL_REGEX.test(form.email.trim());
  const isNicknameValid =
    form.nickname.trim().length >= 2 && form.nickname.trim().length <= 12;
  const isPasswordValid = PASSWORD_REGEX.test(form.password);
  const isPasswordConfirmValid =
    form.passwordConfirm.length > 0 && form.password === form.passwordConfirm;

  // 입력을 시작한 필드에만 오류 표시
  const showEmailError = form.email.length > 0 && !isEmailValid;
  const showNicknameError = form.nickname.length > 0 && !isNicknameValid;
  const showPasswordError = form.password.length > 0 && !isPasswordValid;
  const showPasswordConfirmError =
    form.passwordConfirm.length > 0 && !isPasswordConfirmValid;

  // 모든 입력값이 유효하면 제출 버튼 활성화
  const isFormValid =
    isEmailValid &&
    isNicknameValid &&
    isPasswordValid &&
    isPasswordConfirmValid;

  // 입력 조건과 두 중복 확인을 모두 통과해야 제출 가능
  const canSubmit =
    isFormValid &&
    duplicateCheck.email.isAvailable &&
    duplicateCheck.nickname.isAvailable;

  const handleChangeField = (key: DefaultFormKey, value: DefaultFormValue) => {
    if (key === "email" || key === "nickname") {
      if (duplicateCheck[key].isChecking) return;
      // 확인한 값을 바꾸면 다시 중복 확인해야 함
      setDuplicateCheck((prev) => ({ ...prev, [key]: DEFAULT_DUPLICATE_CHECK }));
    }
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleCheckDuplicate = async (key: DuplicateCheckKey) => {
    const isValid = key === "email" ? isEmailValid : isNicknameValid;
    if (!isValid || duplicateCheck[key].isChecking) return;

    const label = key === "email" ? "이메일" : "닉네임";
    setDuplicateCheck((prev) => ({
      ...prev,
      [key]: { isChecking: true, isAvailable: false },
    }));

    try {
      const response =
        key === "email"
          ? await checkEmailDuplicate(form.email.trim())
          : await checkNicknameDuplicate(form.nickname.trim());
      const isAvailable = response.available;
      setDuplicateCheck((prev) => ({
        ...prev,
        [key]: { ...prev[key], isAvailable },
      }));
      alert(
        isAvailable
          ? `사용할 수 있는 ${label}이에요.`
          : `이미 사용 중인 ${label}이에요.`,
      );
    } catch {
      setDuplicateCheck((prev) => ({
        ...prev,
        [key]: { ...prev[key], isAvailable: false },
      }));
      alert("중복 확인에 실패했어요. 다시 시도해 주세요.");
    } finally {
      setDuplicateCheck((prev) => ({
        ...prev,
        [key]: { ...prev[key], isChecking: false },
      }));
    }
  };

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!canSubmit || isSubmitting) return;

    setIsSubmitting(true);
    try {
      const response = await signup({
        email: form.email.trim(),
        nickname: form.nickname.trim(),
        password: form.password,
      });
      alert(response.message);
      navigate({ to: "/login" });
    } catch {
      alert("회원가입에 실패했어요. 다시 시도해 주세요.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // noValidate는 폼 제출 시 브라우저의 기본 유효성 검사를 끔
  return (
    <main className="signup-page">
      <section className="signup-panel" aria-labelledby="signup-title">
        <h1 id="signup-title">회원가입</h1>

        <form className="signup-form" onSubmit={handleSubmit} noValidate>
          <div className="signup-field">
            <label htmlFor="signup-email">이메일</label>
            <div
              className={`signup-input-row${showEmailError ? " signup-input-row--error" : ""}`}
            >
              <input
                id="signup-email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="name@example.com"
                value={form.email}
                disabled={duplicateCheck.email.isChecking}
                onChange={(event) =>
                  handleChangeField("email", event.target.value)
                }
                aria-invalid={showEmailError}
                aria-describedby={showEmailError ? "signup-email-error" : undefined}
                required
              />
              <button
                className="signup-duplicate-button"
                type="button"
                disabled={!isEmailValid || duplicateCheck.email.isChecking}
                onClick={() => handleCheckDuplicate("email")}
              >
                {duplicateCheck.email.isChecking ? "확인 중" : "중복 확인"}
              </button>
            </div>
            {showEmailError && (
              <p className="signup-field__error" id="signup-email-error" role="status">
                올바른 이메일 형식으로 입력해 주세요.
              </p>
            )}
          </div>

          <div className="signup-field">
            <label htmlFor="signup-nickname">닉네임</label>
            <div
              className={`signup-input-row${showNicknameError ? " signup-input-row--error" : ""}`}
            >
              <input
                id="signup-nickname"
                name="nickname"
                type="text"
                autoComplete="nickname"
                placeholder="2–12자"
                value={form.nickname}
                disabled={duplicateCheck.nickname.isChecking}
                onChange={(event) =>
                  handleChangeField("nickname", event.target.value)
                }
                aria-invalid={showNicknameError}
                aria-describedby={showNicknameError ? "signup-nickname-error" : undefined}
                required
              />
              <button
                className="signup-duplicate-button"
                type="button"
                disabled={!isNicknameValid || duplicateCheck.nickname.isChecking}
                onClick={() => handleCheckDuplicate("nickname")}
              >
                {duplicateCheck.nickname.isChecking ? "확인 중" : "중복 확인"}
              </button>
            </div>
            {showNicknameError && (
              <p className="signup-field__error" id="signup-nickname-error" role="status">
                닉네임은 2~12자로 입력해 주세요.
              </p>
            )}
          </div>

          <div className="signup-field">
            <label htmlFor="signup-password">비밀번호</label>
            <div
              className={`signup-input-row${showPasswordError ? " signup-input-row--error" : ""}`}
            >
              <input
                id="signup-password"
                name="password"
                type="password"
                autoComplete="new-password"
                placeholder="8자 이상"
                value={form.password}
                onChange={(event) =>
                  handleChangeField("password", event.target.value)
                }
                aria-invalid={showPasswordError}
                aria-describedby="signup-password-help"
                required
              />
            </div>
            <p
              className={showPasswordError ? "signup-field__error" : "signup-field__hint"}
              id="signup-password-help"
              role={showPasswordError ? "status" : undefined}
            >
              영문 대소문자, 숫자, 특수문자(!@#$%^&amp;*)를 모두 포함해 8자 이상
              입력해 주세요.
            </p>
          </div>

          <div className="signup-field">
            <label htmlFor="signup-password-confirm">비밀번호 확인</label>
            <div
              className={`signup-input-row${showPasswordConfirmError ? " signup-input-row--error" : ""}`}
            >
              <input
                id="signup-password-confirm"
                name="passwordConfirm"
                type="password"
                autoComplete="new-password"
                placeholder="다시 입력"
                value={form.passwordConfirm}
                onChange={(event) =>
                  handleChangeField("passwordConfirm", event.target.value)
                }
                aria-invalid={showPasswordConfirmError}
                aria-describedby={showPasswordConfirmError ? "signup-password-confirm-error" : undefined}
                required
              />
            </div>
            {showPasswordConfirmError && (
              <p className="signup-field__error" id="signup-password-confirm-error" role="status">
                비밀번호가 일치하지 않아요.
              </p>
            )}
          </div>

          <button
            className="signup-submit-button"
            type="submit"
            disabled={!canSubmit || isSubmitting}
          >
            {isSubmitting ? "가입 중" : "가입하기"}
          </button>
        </form>

        <p className="signup-panel__login">
          이미 계정이 있나요?{" "}
          <Link to="/login" className="font-bold text-[#4b60e8]">
            로그인
          </Link>
        </p>
      </section>
    </main>
  );
}
```

</details>

### 10. 3.2 제공 이미지 기반 스타일

- **구분:** 유지·정리
- **저장 경로:** [`Dongoh/FE/umcine/src/pages/auth/signup-page.css`](../umcine/src/pages/auth/signup-page.css)
- **코드 내용과 역할:** 제공 이미지 기준의 회색 배경·중앙 폼·파란 버튼·전용 헤더를 유지합니다. 더 이상 쓰지 않는 입력 확인 안내 스타일만 제거했습니다.

<details>
<summary>현재 전체 코드</summary>

```css
.signup-page {
  --signup-primary: #4b60e8;
  display: grid;
  min-height: calc(100svh - 88px);
  padding: 64px 24px;
  place-items: center;
  background: #f6f7f9;
  color: #17191e;
}

.signup-panel {
  width: min(100%, 430px);
}

.signup-panel h1 {
  margin: 0 0 20px;
  font-size: 32px;
  font-weight: 800;
  letter-spacing: -1.2px;
  line-height: 1.25;
}

.signup-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.signup-field label {
  display: block;
  margin-bottom: 6px;
  font-size: 12px;
  font-weight: 700;
  line-height: 18px;
}

.signup-input-row {
  display: flex;
  align-items: center;
  min-height: 48px;
  overflow: hidden;
  border: 1px solid #e1e5ec;
  border-radius: 6px;
  background: #fff;
  transition: border-color 150ms;
}

.signup-input-row:focus-within {
  outline: 2px solid #4b60e830;
  outline-offset: 1px;
  border-color: var(--signup-primary);
}

.signup-input-row--error {
  border-color: #dc2626;
}

.signup-input-row input {
  width: 100%;
  min-width: 0;
  min-height: 46px;
  flex: 1;
  border: 0;
  outline: 0;
  padding: 0 16px;
  background: transparent;
  color: #17191e;
  font-size: 14px;
}

.signup-input-row input::placeholder {
  color: #929bad;
  opacity: 1;
}

.signup-duplicate-button {
  min-height: 44px;
  flex-shrink: 0;
  border: 0;
  padding: 0 14px;
  background: transparent;
  color: var(--signup-primary);
  font-size: 12px;
  font-weight: 700;
}

.signup-duplicate-button:disabled,
.signup-panel__login button:disabled,
.signup-header button:disabled {
  cursor: not-allowed;
}

.signup-field__hint,
.signup-field__error {
  margin: 5px 0 0;
  font-size: 11px;
  line-height: 1.5;
}

.signup-field__hint {
  color: #8e96a5;
}

.signup-field__error {
  color: #c52222;
}

.signup-submit-button {
  width: 100%;
  min-height: 48px;
  border: 0;
  border-radius: 7px;
  background: var(--signup-primary);
  color: #fff;
  font-size: 14px;
  font-weight: 700;
}

.signup-submit-button:hover:not(:disabled) {
  background: #3d50d4;
}

.signup-submit-button:disabled {
  cursor: not-allowed;
  opacity: 0.55;
}

.signup-submit-button:focus-visible,
.signup-header a:focus-visible {
  outline: 3px solid #8494ff;
  outline-offset: 3px;
}

.signup-panel__login {
  margin: 16px 0 0;
  text-align: center;
  color: #7b8494;
  font-size: 12px;
}

.signup-panel__login button {
  border: 0;
  padding: 0;
  background: transparent;
  color: var(--signup-primary);
  font: inherit;
  font-weight: 700;
}

@media (max-width: 600px) {
  .signup-page { min-height: calc(100svh - 72px); padding: 48px 20px; }
  .signup-panel h1 { font-size: 28px; }
}
```

</details>

### 11. 3.2 회원가입 전용 헤더

- **구분:** 유지
- **저장 경로:** [`Dongoh/FE/umcine/src/components/layout/header.tsx`](../umcine/src/components/layout/header.tsx)
- **코드 내용과 역할:** 회원가입 경로에서만 제공 이미지의 UMCine 헤더를 표시합니다. 로그인·내 정보 메뉴를 새 경로에 연결했습니다.

<details>
<summary>현재 전체 코드</summary>

```tsx
import { Link, useRouterState } from "@tanstack/react-router";
import { cn } from "../../utils/cn";

export function Header() {
  const isAccountPage = useRouterState({
    select: (state) => ["/signup", "/login", "/profile", "/profile-edit"].includes(state.location.pathname.replace(/\/$/, "")),
  });

  return (
    <header className="sticky top-0 z-20 border-b border-gray-200 bg-white/95 backdrop-blur-md">
      <nav className={cn("mx-auto flex w-[calc(100%_-_32px)] items-center justify-between gap-4", isAccountPage ? "min-h-[88px] max-w-[1280px] max-[600px]:min-h-[72px]" : "min-h-16 max-w-[1120px]")} aria-label="주요 메뉴">
        <div className="flex min-w-0 items-center gap-6 sm:gap-10">
          <Link className="inline-flex shrink-0 items-center gap-2.5 text-xl font-extrabold tracking-tight text-gray-900" to="/" aria-label="UMCine 홈">
            <span className="grid size-8 place-items-center rounded-lg border-2 border-gray-900"><img src="/icons/movie-icons/movie.svg" alt="" aria-hidden="true" className="size-6" /></span>
            <span>UMCine</span>
          </Link>
          <div className="hidden items-center gap-6 text-[13px] font-semibold text-gray-600 sm:flex">
            <Link to="/" activeOptions={{ exact: true }} activeProps={{ className: "text-indigo-600" }}>영화</Link>
            <Link to="/search" activeProps={{ className: "text-indigo-600" }}>검색</Link>
            <Link to="/profile" activeProps={{ className: "text-indigo-600" }}>내 정보</Link>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <Link to="/profile" className="text-xs font-semibold text-gray-600 sm:hidden">내 정보</Link>
          <Link to="/search" className="grid size-10 place-items-center rounded-lg border border-gray-200 max-[380px]:hidden" aria-label="영화 검색">
            <img src="/icons/movie-icons/search.svg" alt="" aria-hidden="true" className="size-5 opacity-65" />
          </Link>
          <Link to="/login" className="rounded-md bg-[#4b60e8] px-4 py-2.5 text-[13px] font-bold text-white hover:bg-[#3d50d4]">로그인</Link>
        </div>
      </nav>
    </header>
  );
}
```

</details>

### 12. 3.3 환경변수 예제

- **구분:** 수정
- **저장 경로:** [`Dongoh/FE/umcine/.env.example`](../umcine/.env.example)
- **코드 내용과 역할:** 실제 개인 토큰 대신 예제 값만 보관하고 문서의 회원 서버 주소 VITE_API_BASE_URL=http://localhost:8080을 추가했습니다.

**이번에 추가·수정한 부분:**

```diff
--- 3.2까지/.env.example
+++ 3.4까지/.env.example
@@ -1,2 +1,3 @@
 VITE_TMDB_API_BASE_URL=https://api.themoviedb.org/3
 VITE_TMDB_ACCESS_TOKEN=your_tmdb_read_access_token
+VITE_API_BASE_URL=http://localhost:8080
```

<details>
<summary>현재 전체 코드</summary>

```text
VITE_TMDB_API_BASE_URL=https://api.themoviedb.org/3
VITE_TMDB_ACCESS_TOKEN=your_tmdb_read_access_token
VITE_API_BASE_URL=http://localhost:8080
```

</details>

## 실행과 실제 서버 확인

회원 서버가 문서의 주소인 **http://localhost:8080**에서 실행되어 있어야 합니다.
프론트엔드에서는 아래 명령으로 실행한 뒤 터미널의 로컬 주소에 `/signup`을 붙여 접속합니다.

```powershell
# 저장소 루트에서
cd Dongoh/FE/umcine
pnpm dev
```

기존 개발 서버가 실행 중이었다면 환경변수 변경을 반영하도록 재시작합니다.
기존 TMDB 환경변수는 유지하고 회원 서버 주소만 추가했습니다. `.env.local`의 실제 개인 토큰은 MD나 Git에 올리지 않습니다.

실제 서버에서 확인할 항목:

- [ ] 사용 가능한 이메일·닉네임에서 사용 가능 alert가 나오는지 확인.
- [ ] 기존 이메일·닉네임에서 중복 alert가 나오고 가입이 차단되는지 확인.
- [ ] 확인한 값을 수정하면 다시 중복 확인해야 하는지 확인.
- [ ] 가입 중 버튼이 비활성화되고 성공 응답의 메시지가 표시되는지 확인.
- [ ] 요청 본문에 passwordConfirm이 없는지 확인.
- [ ] 서버 실패 시 입력값을 유지하고 다시 요청할 수 있는지 확인.

## 검증 결과

- 새 API 모듈 4개가 붙여넣은 노션의 해당 코드 블록과 정확히 일치함을 확인했습니다.
- DEFAULT_DUPLICATE_CHECK, duplicateCheck, canSubmit, handleChangeField, handleCheckDuplicate, isSubmitting, handleSubmit의 구문 구조가 노션 예제와 같음을 확인했습니다. 들여쓰기·주석은 비교에서 제외했습니다.
- 실제 컴포넌트의 핸들러와 요청 함수, 설치된 ky를 사용하고 **HTTP 전송에 가짜 응답을 주입한 테스트**로 다음을 검증했습니다: 입력값 15가지 사례, URL 인코딩, 중복 확인 성공·중복·실패, 입력 잠금, 값 변경 시 확인 초기화, 가입 요청 본문, 제출 중 재요청 차단, 성공 메시지, 실패 후 값 유지·재시도.
- `pnpm build`: 타입 검사와 프로덕션 빌드 통과.
- `pnpm lint`: 통과.
- 로컬 8080 포트 연결은 ECONNREFUSED였습니다. 현재 회원 서버가 실행 중이지 않아 **실제 서버의 응답과 DB 저장은 검증하지 못했습니다.** 가짜 응답 테스트를 실제 가입 완료로 기록하지 않습니다.
- 이번 변경은 기존 화면에 요청 동작을 연결한 작업이며 브라우저에서의 실제 서버 연동 확인은 위 체크리스트로 진행해야 합니다.

## 제출 기록

- Issue: [#88](https://github.com/HSU-Makeus-Challenge-11th/Web_B/issues/88)
- PR: 미기록
- 커밋: 미기록
