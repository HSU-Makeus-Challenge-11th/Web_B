# Dongoh Backend — 영화 평점 서비스

Java 21 / Spring Boot 3.5.0 / Spring Data JPA를 사용한다.

## 9주차 필수 미션

- Swagger/OpenAPI 문서와 JWT Bearer 인증 표시
- 회원·인증·평점·즐겨찾기 API 설명과 요청 예시
- 즐겨찾기와 평점 Service 단위 테스트
- 즐겨찾기와 평점 API 통합 테스트
- [Swagger·테스트 미션 기록과 결과 화면](docs/9주차-미션-기록.md)

## 6주차 필수 미션

- 회원가입 입력 검증, bcrypt 저장, 비밀번호 응답 제외
- 평점 등록·수정·삭제, 중복 등록 방지와 소유자 확인
- 400·403·404·409 공통 오류 응답, 삭제 성공 204
- [API 명세·실습 기록·캡처 14장·트러블슈팅 1건](docs/6주차-미션-기록.md)
- [실행용 HTTP 요청](docs/6주차-api.http)
- [API 통합 테스트](src/test/java/com/umc/movie/WritingApiIntegrationTests.java)

## 실행

이 폴더(`Dongoh/BE`)에서 Java 21을 사용해 실행한다.

```powershell
# MySQL: localhost:3307/umc_movie, 테이블 생성 SQL은 5주차 기록 참고
$env:DB_PASSWORD = "본인 MySQL 비밀번호"
.\gradlew.bat bootRun
```

MySQL 스키마와 UNIQUE 제약은 [5주차 실습 기록](docs/5주차-미션-기록.md)의 SQL로 준비한다. 일반 실행 주소는 `http://localhost:8080`이다.

MySQL 없이 H2 메모리 DB로 확인하려면 다음 명령을 사용한다.

```powershell
.\gradlew.bat --init-script docs/tools/practice-server.init.gradle practiceServer --no-daemon
```

H2 실습 서버 주소는 `http://localhost:18080`이며, 서버를 종료하면 데이터가 사라진다.

## 테스트

```powershell
.\gradlew.bat test --no-daemon
```

9주차에 추가한 테스트만 실행하려면 다음 명령을 사용한다.

```powershell
.\gradlew.bat test --no-daemon --tests '*FavoriteServiceTest' --tests '*FavoriteApiTest' --tests '*RatingServiceTest' --tests '*RatingApiTest'
```

테스트는 H2를 사용하며 실제 MySQL 검증과 구분한다. 전체 테스트에는 현재 API 규격보다 오래된 6주차 URL을 호출하는 `WritingApiIntegrationTests`가 남아 있으므로 별도 정리가 필요하다.
