CREATE DATABASE IF NOT EXISTS umc_book_rental
    DEFAULT CHARACTER SET utf8mb4
    DEFAULT COLLATE utf8mb4_unicode_ci;

USE umc_book_rental;

CREATE TABLE IF NOT EXISTS category (
    category_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS users (
    user_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS book (
    book_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    category_id BIGINT NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    is_available BOOLEAN NOT NULL DEFAULT TRUE,
    CONSTRAINT fk_book_category
        FOREIGN KEY (category_id) REFERENCES category (category_id)
);

CREATE TABLE IF NOT EXISTS rental (
    rental_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    book_id BIGINT NOT NULL,
    rented_at DATETIME NOT NULL,
    due_at DATETIME NOT NULL,
    returned_at DATETIME NULL,
    CONSTRAINT fk_rental_user
        FOREIGN KEY (user_id) REFERENCES users (user_id),
    CONSTRAINT fk_rental_book
        FOREIGN KEY (book_id) REFERENCES book (book_id)
);
