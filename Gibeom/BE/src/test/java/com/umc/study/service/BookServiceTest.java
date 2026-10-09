package com.umc.study.service;

import com.umc.study.dto.BookResponse;
import com.umc.study.dto.CreateBookRequest;
import com.umc.study.entity.Book;
import com.umc.study.entity.Category;
import com.umc.study.repository.BookRepository;
import com.umc.study.repository.CategoryRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class BookServiceTest {

    @Mock
    private BookRepository bookRepository;

    @Mock
    private CategoryRepository categoryRepository;

    @InjectMocks
    private BookService bookService;

    @Test
    void getBooksReturnsRepositoryOrderAsResponses() {
        Category category = org.mockito.Mockito.mock(Category.class);
        Book book = org.mockito.Mockito.mock(Book.class);
        when(category.getName()).thenReturn("개발");
        when(book.getBookId()).thenReturn(2L);
        when(book.getTitle()).thenReturn("JPA 입문");
        when(book.getDescription()).thenReturn("ORM 학습");
        when(book.getCategory()).thenReturn(category);
        when(book.getIsAvailable()).thenReturn(true);
        when(bookRepository.findAllByOrderByBookIdDesc()).thenReturn(List.of(book));

        List<BookResponse> result = bookService.getBooks();

        assertThat(result).containsExactly(
                new BookResponse(2L, "JPA 입문", "ORM 학습", "개발", true)
        );
        verify(bookRepository).findAllByOrderByBookIdDesc();
    }

    @Test
    void createBookSavesBookWhenCategoryExists() {
        Category category = org.mockito.Mockito.mock(Category.class);
        when(category.getName()).thenReturn("개발");
        when(categoryRepository.findById(1L)).thenReturn(Optional.of(category));
        CreateBookRequest request = new CreateBookRequest(1L, "JPA 입문", "ORM 학습");

        BookResponse result = bookService.createBook(request);

        assertThat(result.title()).isEqualTo("JPA 입문");
        assertThat(result.categoryName()).isEqualTo("개발");
        assertThat(result.isAvailable()).isTrue();
        verify(bookRepository).save(org.mockito.ArgumentMatchers.any(Book.class));
    }

    @Test
    void createBookReturnsNotFoundWhenCategoryDoesNotExist() {
        when(categoryRepository.findById(999L)).thenReturn(Optional.empty());
        CreateBookRequest request = new CreateBookRequest(999L, "JPA 입문", null);

        assertThatThrownBy(() -> bookService.createBook(request))
                .isInstanceOfSatisfying(ResponseStatusException.class, exception -> {
                    assertThat(exception.getStatusCode()).isEqualTo(HttpStatus.NOT_FOUND);
                    assertThat(exception.getReason()).isEqualTo("존재하지 않는 카테고리입니다");
                });
    }
}
