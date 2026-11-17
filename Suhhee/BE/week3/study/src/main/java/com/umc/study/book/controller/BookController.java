package com.umc.study.book.controller;

import com.umc.study.book.service.BookService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/books")
@RequiredArgsConstructor
public class BookController {

    private final BookService bookService;

    @GetMapping
    public List<Map<String, Object>> getAllBooks() {
        return bookService.getAllBooks();
    }

    @GetMapping("/category/{categoryId}")
    public List<Map<String, Object>> getBooksByCategory(
            @PathVariable Long categoryId
    ) {
        return bookService.getBooksByCategory(categoryId);
    }

    @PostMapping
    public ResponseEntity<String> createBook(
            @RequestBody Map<String, Object> body
    ) {
        bookService.createBook(body);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body("도서 등록이 완료되었습니다!");
    }
}
