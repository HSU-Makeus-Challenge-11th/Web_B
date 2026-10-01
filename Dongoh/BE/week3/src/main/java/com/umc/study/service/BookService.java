// src/main/java/.../service/BookService.java
package com.umc.study.service;

import com.umc.study.repository.BookRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service // 비즈니스 로직을 수행하는 메인 셰프 계층
@RequiredArgsConstructor
public class BookService {

    // 창고지기(Repository)를 생성자 주입으로 데려옵니다.
    private final BookRepository bookRepository;

    public List<Map<String, Object>> getAllBooks() {
        // 지금은 별도 가공 없이 창고지기가 가져온 도서 목록을 그대로 반환합니다.
        return bookRepository.findAll();
    }

    public void createBook(Map<String, Object> body){
        bookRepository.save(body);
    }

    public List<Map<String, Object>> getFindCategory(Long categoryId) {
        // 해당 카테고리의 책들 가져오기
        return bookRepository.findCategory(categoryId);
    }

    public void createRental(Map<String, Object> body){
        bookRepository.createRental(body);
    }
}