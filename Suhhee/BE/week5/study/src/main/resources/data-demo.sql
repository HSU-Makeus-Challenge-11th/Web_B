INSERT INTO category (category_id, name)
VALUES
    (1, '문학'),
    (2, '과학'),
    (3, '역사');

INSERT INTO book (book_id, category_id, title, description, is_available)
VALUES
    (1, 1, '달빛 도서관', '달빛 아래에서 펼쳐지는 도서관 이야기', TRUE),
    (2, 1, '겨울의 편지', '겨울에 도착한 한 통의 편지', TRUE),
    (3, 2, '우주의 시작', '우주의 탄생을 쉽게 설명하는 과학책', TRUE);

ALTER TABLE category ALTER COLUMN category_id RESTART WITH 4;
ALTER TABLE book ALTER COLUMN book_id RESTART WITH 4;

INSERT INTO member (member_id, email, password, nickname, created_at, updated_at)
VALUES
    (1, 'noco@umc.com', '$2a$10$dummyEncodedPasswordValue', '수현', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (2, 'minseo@umc.com', '$2a$10$dummyEncodedPasswordValue', '민서', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO rating (
    rating_id,
    member_id,
    movie_id,
    score,
    comment,
    created_at,
    updated_at
)
VALUES
    (1, 1, 550, 5, '최고의 영화!', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (2, 1, 155, 4, '다시 봐도 명작', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (3, 2, 550, 3, '호불호가 갈릴 것 같아요', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

ALTER TABLE member ALTER COLUMN member_id RESTART WITH 3;
ALTER TABLE rating ALTER COLUMN rating_id RESTART WITH 4;
