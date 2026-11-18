# 8주차 - 즐겨찾기와 영화 기록 (Spring Boot)

7주차 JWT 인증 코드에 필수 API 5개를 추가했습니다.

## 실행

Java 21, Gradle 사용. JWT_SECRET은 32바이트 이상의 환경변수로 전달합니다.

```bash
cd Suhhee/BE/study
cp src/main/resources/application.example.yml src/main/resources/application.yml
export JAVA_HOME=$(/usr/libexec/java_home -v 21)
export JWT_SECRET="$(openssl rand -base64 48)"
./gradlew bootRun --args='--spring.profiles.active=demo'
```

H2 demo DB는 서버 종료 시 초기화됩니다. MySQL은 DB_URL, DB_USER, DB_PW를 설정합니다.

## API

| Method | 경로 | 성공 |
| --- | --- | --- |
| POST | /favorites | 201 |
| GET | /favorites | 200, 본인의 최신순 목록 |
| GET | /favorites/{movieId} | 200, isFavorite |
| DELETE | /favorites/{movieId} | 200, result null |
| POST | /movie-records | 201, rating 및 선택적인 favorite |

모든 API는 Bearer 토큰으로 회원을 식별합니다. 요청 DTO에는 memberId가 없습니다.
즐겨찾기는 BaseTimeEntity를 상속하고 (member_id, movie_id) 복합 UNIQUE를 유지합니다.
동일 회원·영화 중복은 409 FAVORITE409_1, 없는 해제는 404 FAVORITE404_1입니다.

MovieRecordService의 @Transactional 경계 안에서 RatingService와 FavoriteService가
기본 REQUIRED 전파로 참여합니다. 즐겨찾기 실패 시 먼저 저장한 평점도 rollback됩니다.
addToFavorites:false이면 평점만 저장하고 favorite은 null로 반환합니다.

## 검증

```bash
./gradlew test bootJar
postman collection run postman/week8-favorites.postman_collection.json --no-report-events
```

Gradle 11개 테스트 통과. 실제 서버에서 Postman 27개 요청·77개 assertion 통과.
회원 간 데이터 격리, 최신순, 복합 중복, 인증 실패, 유효성 검사와 실제 rollback을 확인했습니다.
Postman과 같은 요청을 실제 HTTP로 재실행한 요청·응답 및 구현 코드 화면을 Notion에 첨부했습니다.

## 설정과 작업 범위

`application.yml`은 로컬 전용이며 추적하지 않습니다. 저장소의 `application.example.yml`은 환경변수 이름만 포함합니다.
테스트의 JWT 키는 공개된 테스트 전용 값이며 실행 서버 키와 별개입니다.
main에 아직 없는 7주차 JWT 인증·회원 정보 API도 선행 구현으로 포함합니다.
팀 규칙에 따라 이 경로를 사용하며 기존 주차 기록은 보존합니다.
