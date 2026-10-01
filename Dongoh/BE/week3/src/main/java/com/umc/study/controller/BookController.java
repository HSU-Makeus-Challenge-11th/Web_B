package com.umc.study.controller;

import com.umc.study.service.BookService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
public class BookController {

    private final BookService bookService;

    // 전체 도서 조회
    @GetMapping("/books")
    public List<Map<String, Object>> getBooks() {
        return bookService.getAllBooks();
    }

    // 특정 카테고리 도서 조회
    @GetMapping("/books/category/{categoryId}")
    public List<Map<String, Object>> getFindCategory(
            @PathVariable Long categoryId) {

        return bookService.getFindCategory(categoryId);
    }

    // 신규 도서 등록
    @PostMapping("/books")
    public String createBook(@RequestBody Map<String, Object> body) {
        bookService.createBook(body);
        return "도서 등록이 완료되었습니다!";
    }

    // 신규 도서 대여
    @PostMapping("/rentals")
    public String createRental(@RequestBody Map<String, Object> body) {

        bookService.createRental(body);

        return "신규 도서 대여 기록 생성되었습니다!";
    }
}