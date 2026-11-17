package com.umc.study.book.repository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.jdbc.core.JdbcTemplate;

import java.util.List;
import java.util.Map;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

class BookRepositoryTest {

    private JdbcTemplate jdbcTemplate;
    private BookRepository bookRepository;

    @BeforeEach
    void setUp() {
        jdbcTemplate = mock(JdbcTemplate.class);
        bookRepository = new BookRepository(jdbcTemplate);
    }

    @Test
    void findAllReturnsEveryBook() {
        String sql = "SELECT * FROM book";
        List<Map<String, Object>> books = List.of(
                Map.of("book_id", 1L, "title", "달빛 도서관")
        );
        when(jdbcTemplate.queryForList(sql)).thenReturn(books);

        List<Map<String, Object>> result = bookRepository.findAll();

        assertThat(result).isEqualTo(books);
        verify(jdbcTemplate).queryForList(sql);
    }

    @Test
    void findByCategoryIdBindsCategoryIdAsAParameter() {
        String sql = "SELECT * FROM book WHERE category_id = ?";
        when(jdbcTemplate.queryForList(sql, 1L)).thenReturn(List.of());

        bookRepository.findByCategoryId(1L);

        verify(jdbcTemplate).queryForList(sql, 1L);
    }

    @Test
    void saveBindsRequestValuesInsteadOfConcatenatingThem() {
        String sql = """
                INSERT INTO book (category_id, title, description, is_available)
                VALUES (?, ?, ?, true)
                """;
        String unsafeTitle = "제목'); DROP TABLE book; --";
        Map<String, Object> body = Map.of(
                "categoryId", 1,
                "title", unsafeTitle,
                "description", "설명"
        );

        bookRepository.save(body);

        verify(jdbcTemplate).update(sql, 1, unsafeTitle, "설명");
    }
}
