# 3주차 - 첫 API 만들고 검증하기 (Spring Boot)

워크북의 NestJS 예제를 Spring Boot로 옮긴 프로젝트입니다. 이번 주차의 학습
의도에 맞춰 DTO와 JPA를 사용하지 않고 `Map<String, Object>`, `JdbcTemplate`,
Raw SQL로 구현했습니다.

## 구현 API

| Method | URL | 설명 | 성공 상태 |
| --- | --- | --- | --- |
| GET | `/books` | 전체 도서 목록 조회 | 200 |
| POST | `/books` | 신규 도서 등록 | 201 |
| GET | `/books/category/{categoryId}` | 카테고리별 도서 조회 | 200 |
| POST | `/rentals` | 도서 대여 등록 | 201 |

모든 SQL 입력값은 문자열 연결이 아닌 `?` 자리 표시자로 전달합니다. 따라서
사용자가 SQL 문법처럼 보이는 문자열을 보내도 명령어가 아니라 하나의 값으로
처리됩니다.

## 1. 데이터베이스 준비

MySQL 서버를 실행한 뒤 프로젝트 루트에서 다음 SQL 파일을 순서대로 실행합니다.

```bash
mysql -u root -p < db/01_schema.sql
mysql -u root -p < db/02_seed.sql
```

이미 1주차에 동일한 테이블과 데이터를 만들었다면 스키마가 일치하는지만 확인하고
이 단계는 건너뛰어도 됩니다.

## 2. 환경 변수 설정

비밀번호를 `application.yml`이나 Git에 올리지 않습니다. `.env.example`을 참고해
실행 환경에 세 값을 등록합니다.

```bash
export DB_URL='jdbc:mysql://localhost:3306/umc_book_rental?serverTimezone=Asia/Seoul&characterEncoding=UTF-8'
export DB_USER='root'
export DB_PW='본인의_MySQL_비밀번호'
```

IntelliJ에서는 `StudyApplication`의 Run Configuration → Environment variables에
`DB_URL`, `DB_USER`, `DB_PW`를 등록하면 됩니다.

## 3. 실행

프로젝트가 Java 21을 사용하도록 확인한 뒤 실행합니다.

```bash
./gradlew bootRun
```

정상 실행되면 기본 주소는 `http://localhost:8080`입니다.

## 4. Postman 또는 curl로 검증

### 전체 도서 조회

```bash
curl -i http://localhost:8080/books
```

`HTTP/1.1 200`과 JSON 배열이 반환되어야 합니다.

### 신규 도서 등록

```bash
curl -i -X POST http://localhost:8080/books \
  -H 'Content-Type: application/json' \
  -d '{"categoryId":1,"title":"새로운 책","description":"새 도서 설명"}'
```

`HTTP/1.1 201`과 `도서 등록이 완료되었습니다!`가 반환되고 `book` 테이블에
행이 추가되어야 합니다.

### 카테고리별 도서 조회 (필수 미션 1)

```bash
curl -i http://localhost:8080/books/category/1
```

`HTTP/1.1 200`과 `category_id`가 `1`인 도서 배열이 반환되어야 합니다.

### 도서 대여 등록 (필수 미션 2)

```bash
curl -i -X POST http://localhost:8080/rentals \
  -H 'Content-Type: application/json' \
  -d '{"userId":1,"bookId":1}'
```

`HTTP/1.1 201`과 `도서 대여가 완료되었습니다!`가 반환되어야 합니다. MySQL에서
아래 쿼리로 `rented_at`은 요청 시각, `due_at`은 그로부터 7일 뒤인지 확인합니다.

```sql
SELECT * FROM rental ORDER BY rental_id DESC;
```

## 5. 테스트와 빌드

```bash
./gradlew test
./gradlew build
```

Repository 테스트는 외부 입력이 SQL 문자열에 합쳐지지 않고 `JdbcTemplate`의
바인딩 매개변수로 전달되는지 검증합니다.

## 폴더 구조

```text
src/main/java/com/umc/study
├── book
│   ├── controller/BookController.java
│   ├── service/BookService.java
│   └── repository/BookRepository.java
└── rental
    ├── controller/RentalController.java
    ├── service/RentalService.java
    └── repository/RentalRepository.java
```
