package com.umc.study.controller;

import com.umc.study.dto.BookResponse;
import com.umc.study.service.BookService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(BookController.class)
class BookControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private BookService bookService;

    @Test
    void getBooksReturnsBookResponses() throws Exception {
        when(bookService.getBooks()).thenReturn(List.of(
                new BookResponse(2L, "JPA 입문", "ORM 학습", "개발", true)
        ));

        mockMvc.perform(get("/books"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].bookId").value(2))
                .andExpect(jsonPath("$[0].categoryName").value("개발"));
    }

    @Test
    void createBookReturnsCreated() throws Exception {
        when(bookService.createBook(any())).thenReturn(
                new BookResponse(3L, "스프링 JPA", "JPA 학습", "개발", true)
        );

        mockMvc.perform(post("/books")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                  "categoryId": 1,
                                  "title": "스프링 JPA",
                                  "description": "JPA 학습"
                                }
                                """))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.bookId").value(3))
                .andExpect(jsonPath("$.title").value("스프링 JPA"));
    }

    @Test
    void createBookRejectsMissingCategoryId() throws Exception {
        mockMvc.perform(post("/books")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                  "title": "스프링 JPA",
                                  "description": "JPA 학습"
                                }
                                """))
                .andExpect(status().isBadRequest());
    }

    @Test
    void createBookRejectsBlankTitle() throws Exception {
        mockMvc.perform(post("/books")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                  "categoryId": 1,
                                  "title": "",
                                  "description": "JPA 학습"
                                }
                                """))
                .andExpect(status().isBadRequest());
    }
}
