package com.umc.study.book.service;

import com.umc.study.book.dto.CreateBookRequest;
import com.umc.study.book.repository.BookRepository;
import com.umc.study.book.repository.CategoryRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.web.server.ResponseStatusException;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

class BookServiceTest {

    private CategoryRepository categoryRepository;
    private BookService bookService;

    @BeforeEach
    void setUp() {
        BookRepository bookRepository = mock(BookRepository.class);
        categoryRepository = mock(CategoryRepository.class);
        bookService = new BookService(bookRepository, categoryRepository);
    }

    @Test
    void createBookRejectsUnknownCategory() {
        when(categoryRepository.findById(999L)).thenReturn(Optional.empty());
        CreateBookRequest request = new CreateBookRequest(999L, "새 도서", "설명");

        assertThatThrownBy(() -> bookService.createBook(request))
                .isInstanceOf(ResponseStatusException.class)
                .hasMessageContaining("존재하지 않는 카테고리입니다.");
    }
}
