package com.umc.study.rental.repository;

import org.junit.jupiter.api.Test;
import org.springframework.jdbc.core.JdbcTemplate;

import java.util.Map;

import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;

class RentalRepositoryTest {

    @Test
    void saveCreatesASevenDayRentalWithBoundParameters() {
        JdbcTemplate jdbcTemplate = mock(JdbcTemplate.class);
        RentalRepository rentalRepository = new RentalRepository(jdbcTemplate);
        String sql = """
                INSERT INTO rental (user_id, book_id, rented_at, due_at, returned_at)
                VALUES (?, ?, NOW(), DATE_ADD(NOW(), INTERVAL 7 DAY), NULL)
                """;

        rentalRepository.save(Map.of("userId", 1, "bookId", 2));

        verify(jdbcTemplate).update(sql, 1, 2);
    }
}
