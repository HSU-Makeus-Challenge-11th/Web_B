package com.umc.study.member.controller;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.umc.study.member.entity.Member;
import com.umc.study.member.repository.MemberRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.patch;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("demo")
class Week6ApiIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private MemberRepository memberRepository;

    @Test
    void signUpValidatesAndHashesPassword() throws Exception {
        mockMvc.perform(post("/members")
                        .contentType("application/json")
                        .content("""
                                {
                                  "email": "week6@umc.com",
                                  "password": "Week6!pass",
                                  "nickname": "솔6주차"
                                }
                                """))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.isSuccess").value(true))
                .andExpect(jsonPath("$.code").value("COMMON201"))
                .andExpect(jsonPath("$.result.email").value("week6@umc.com"))
                .andExpect(jsonPath("$.result.nickname").value("솔6주차"))
                .andExpect(jsonPath("$.result.password").doesNotExist());

        Member savedMember = memberRepository.findByEmail("week6@umc.com")
                .orElseThrow();
        assertThat(savedMember.getPassword())
                .startsWith("$2")
                .isNotEqualTo("Week6!pass");

        mockMvc.perform(post("/members")
                        .contentType("application/json")
                        .content("""
                                {
                                  "email": "week6@umc.com",
                                  "password": "Week6!pass",
                                  "nickname": "다른닉네임"
                                }
                                """))
                .andExpect(status().isConflict())
                .andExpect(jsonPath("$.isSuccess").value(false))
                .andExpect(jsonPath("$.message").value("이미 사용 중인 이메일입니다."));

        mockMvc.perform(post("/members")
                        .contentType("application/json")
                        .content("""
                                {
                                  "email": "not-an-email",
                                  "password": "short",
                                  "nickname": "솔"
                                }
                                """))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.isSuccess").value(false))
                .andExpect(jsonPath("$.result").doesNotExist());
    }

}
