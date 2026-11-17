# Dongoh Backend — 영화 평점 서비스

Java 21 / Spring Boot 3.5.0 / Spring Data JPA를 사용한다.

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

기본 기동 테스트 1건과 API 통합 테스트 36건이 포함되어 있다. 테스트는 H2를 사용하며 실제 MySQL 검증과 구분한다.
