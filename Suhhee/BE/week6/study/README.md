# 6주차 - 입력한 데이터를 저장하기 (Spring Boot)

5주차 조회 API에 회원가입과 평점 등록·수정·삭제 API를 추가한 프로젝트입니다.
요청 DTO 검증, bcrypt 비밀번호 해시, 소유자 확인과 전역 예외 처리를 적용했습니다.

## API 명세

| Method | URL | 설명 | 성공 상태 |
| --- | --- | --- | --- |
| POST | `/members` | 회원가입 | 201 |
| POST | `/members/{memberId}/ratings` | 평점 등록 | 201 |
| PATCH | `/members/{memberId}/ratings/{ratingId}` | 평점 수정 | 200 |
| DELETE | `/members/{memberId}/ratings/{ratingId}` | 평점 삭제 | 204 |
| GET | `/members/{memberId}/ratings` | 회원 평점 조회 | 200 |

DELETE의 성공 응답은 body 없이 204를 반환합니다. 그 외 성공과 실패 응답은 아래
공통 형식을 사용합니다.

```json
{
  "isSuccess": true,
  "code": "COMMON201",
  "message": "회원가입에 성공했습니다.",
  "result": {}
}
```

## 입력 규칙과 실패 상태

- 회원가입: 이메일 형식, 닉네임 2~12자, 대·소문자/숫자/특수문자를 포함한 8자
  이상의 비밀번호를 검증합니다.
- 비밀번호는 bcrypt cost 10으로 해시하며 응답 DTO에서 제외합니다.
- 평점은 1~5점, 한줄평은 500자 이하로 검증합니다.
- 이메일·닉네임·평점 중복은 409, 잘못된 입력은 400을 반환합니다.
- 다른 회원의 평점 수정·삭제는 403, 없는 회원·평점은 404를 반환합니다.
- `(member_id, movie_id)` UNIQUE 제약으로 중복 평점을 DB에서도 차단합니다.

## 실행과 검증

MySQL 환경에서는 `.env.example`을 참고해 `DB_URL`, `DB_USER`, `DB_PW`를
설정합니다. 로컬 검증은 H2 demo profile로 실행할 수 있습니다.

```bash
./gradlew bootRun --args='--spring.profiles.active=demo'
./gradlew test
./gradlew build
```

`Week6ApiIntegrationTest`는 회원가입 성공·검증 실패·이메일 중복·비밀번호 해시,
평점 등록·중복·범위 검증·소유자 403·수정·삭제 204·삭제 후 404를 확인합니다.
