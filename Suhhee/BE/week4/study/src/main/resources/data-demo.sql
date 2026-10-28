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
