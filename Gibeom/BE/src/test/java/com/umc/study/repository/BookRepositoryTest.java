package com.umc.study.repository;

import org.junit.jupiter.api.Test;
import org.springframework.jdbc.core.JdbcTemplate;

import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;

class BookRepositoryTest {

    @Test
    void findByCategoryIdFiltersByCategoryId() {
        JdbcTemplate jdbcTemplate = mock(JdbcTemplate.class);
        BookRepository repository = new BookRepository(jdbcTemplate);

        repository.findByCategoryId(3L);

        verify(jdbcTemplate).queryForList(
                "SELECT * FROM book WHERE category_id = ?",
                3L
        );
    }
}
