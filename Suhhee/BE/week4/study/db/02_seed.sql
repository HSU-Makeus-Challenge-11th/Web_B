USE umc_book_rental;

INSERT INTO category (category_id, name)
VALUES
    (1, '문학'),
    (2, '과학'),
    (3, '역사')
ON DUPLICATE KEY UPDATE name = VALUES(name);

INSERT INTO users (user_id, name, email)
VALUES
    (1, '서희', 'seohui@example.com'),
    (2, '광수', 'gwangsu@example.com')
ON DUPLICATE KEY UPDATE
    name = VALUES(name),
    email = VALUES(email);

INSERT INTO book (book_id, category_id, title, description, is_available)
VALUES
    (1, 1, '달빛 도서관', '달빛 아래에서 펼쳐지는 도서관 이야기', TRUE),
    (2, 1, '겨울의 편지', '겨울에 도착한 한 통의 편지', TRUE),
    (3, 2, '우주의 시작', '우주의 탄생을 쉽게 설명하는 과학책', TRUE)
ON DUPLICATE KEY UPDATE
    category_id = VALUES(category_id),
    title = VALUES(title),
    description = VALUES(description),
    is_available = VALUES(is_available);
