// src/main/java/.../repository/BookRepository.java
package com.umc.study.repository;

import lombok.RequiredArgsConstructor;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository // 스프링 컨테이너에 "나 창고지기 부품이야!"라고 등록
@RequiredArgsConstructor
public class RentalRepository {

    // 2단계에서 준비된 스프링의 DB 통신 도구(JdbcTemplate) 주입
    private final JdbcTemplate jdbcTemplate;

    public List<Map<String, Object>> findRental() {
        String sql = "SELECT * FROM rental";

        return jdbcTemplate.queryForList(sql);
    }

    public void save(Map<String, Object> body){
        // rental_ AUTO_INCREMENT이므로 생략, rented_at은 NOW()로, due_at은 DATE_ADD(NOW(), INTERVAL 7 DAY)로,returned_at은 기본 null로 삽입
        String sql = "INSERT INTO rental (user_id, book_id, rented_at, due_at, returned_at) " +
                "VALUES (?, ?, NOW(), DATE_ADD(NOW(), INTERVAL 7 DAY) , NULL)";

        // SQL 뒤에 파라미터를 차례대로 넘겨주면 ? 자리에 순서대로 안전하게 바인딩됩니다.
        jdbcTemplate.update(
                sql,
                body.get("userId"),
                body.get("bookId")
        );
    }
}