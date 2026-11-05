-- 5주차: movie_db DB 생성 + 테이블 + 더미 데이터
CREATE DATABASE IF NOT EXISTS movie_db DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;
USE movie_db;

CREATE TABLE member (
    member_id   BIGINT AUTO_INCREMENT PRIMARY KEY,
    email       VARCHAR(254) NOT NULL UNIQUE,
    password    VARCHAR(60)  NOT NULL,
    nickname    VARCHAR(50)  NOT NULL UNIQUE,
    created_at  DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at  DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE rating (
    rating_id   BIGINT AUTO_INCREMENT PRIMARY KEY,
    member_id   BIGINT   NOT NULL,
    movie_id    BIGINT   NOT NULL,
    score       TINYINT  NOT NULL,
    comment     TEXT,
    created_at  DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at  DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (member_id) REFERENCES member(member_id),
    UNIQUE KEY uk_rating_member_movie (member_id, movie_id)
);

-- 8주차 즐겨찾기 실습에서 사용할 테이블입니다. 이번 주차에는 스키마만 만들어 둡니다.
CREATE TABLE favorite (
    favorite_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    member_id   BIGINT   NOT NULL,
    movie_id    BIGINT   NOT NULL,
    created_at  DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at  DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (member_id) REFERENCES member(member_id),
    UNIQUE KEY uk_favorite_member_movie (member_id, movie_id)
);

INSERT INTO member (email, password, nickname) VALUES
('noco@umc.com', '$2a$10$dummyEncodedPasswordValue', '수현'),
('minseo@umc.com', '$2a$10$dummyEncodedPasswordValue', '민서');

INSERT INTO rating (member_id, movie_id, score, comment) VALUES
(1, 550, 5, '최고의 영화!'),
(1, 155, 4, '다시 봐도 명작'),
(2, 550, 3, '호불호가 갈릴 것 같아요');
