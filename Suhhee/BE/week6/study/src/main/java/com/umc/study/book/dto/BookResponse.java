package com.umc.study.book.dto;

import com.umc.study.book.entity.Book;

public record BookResponse(
        Long bookId,
        String title,
        String description,
        String categoryName,
        boolean available
) {

    public static BookResponse from(Book book) {
        return new BookResponse(
                book.getBookId(),
                book.getTitle(),
                book.getDescription(),
                book.getCategory().getName(),
                book.isAvailable()
        );
    }
}
