package com.umc.study.repository;

import org.junit.jupiter.api.Test;
import org.springframework.jdbc.core.JdbcTemplate;

import java.util.Map;

import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;

class RentalRepositoryTest {

    @Test
    void saveCreatesSevenDayRental() {
        JdbcTemplate jdbcTemplate = mock(JdbcTemplate.class);
        RentalRepository repository = new RentalRepository(jdbcTemplate);

        repository.save(Map.of("userId", 10, "bookId", 20));

        verify(jdbcTemplate).update(
                "INSERT INTO rental (user_id, book_id, rented_at, due_at) " +
                        "VALUES (?, ?, NOW(), DATE_ADD(NOW(), INTERVAL 7 DAY))",
                10,
                20
        );
    }
}
