package com.umc.study.rental.repository;

import lombok.RequiredArgsConstructor;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.Map;

@Repository
@RequiredArgsConstructor
public class RentalRepository {

    private final JdbcTemplate jdbcTemplate;

    public int save(Map<String, Object> body) {
        String sql = """
                INSERT INTO rental (user_id, book_id, rented_at, due_at, returned_at)
                VALUES (?, ?, NOW(), DATE_ADD(NOW(), INTERVAL 7 DAY), NULL)
                """;

        return jdbcTemplate.update(
                sql,
                body.get("userId"),
                body.get("bookId")
        );
    }
}
