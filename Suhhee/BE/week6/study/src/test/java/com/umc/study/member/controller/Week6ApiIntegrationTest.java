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

    @Test
    void ratingCreateUpdateDeleteAndFailuresUseExpectedStatuses() throws Exception {
        MvcResult createResult = mockMvc.perform(post("/members/1/ratings")
                        .contentType("application/json")
                        .content("""
                                {
                                  "movieId": 299534,
                                  "score": 5,
                                  "comment": "TanStack Query로 다시 보고 싶은 영화"
                                }
                                """))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.isSuccess").value(true))
                .andExpect(jsonPath("$.code").value("COMMON201"))
                .andReturn();

        JsonNode createdBody = objectMapper.readTree(
                createResult.getResponse().getContentAsString()
        );
        long ratingId = createdBody.get("result").asLong();

        mockMvc.perform(post("/members/1/ratings")
                        .contentType("application/json")
                        .content("""
                                {
                                  "movieId": 299534,
                                  "score": 4,
                                  "comment": "중복 평점"
                                }
                                """))
                .andExpect(status().isConflict())
                .andExpect(jsonPath("$.message").value("이미 평점을 등록한 영화입니다."));

        mockMvc.perform(post("/members/1/ratings")
                        .contentType("application/json")
                        .content("""
                                {
                                  "movieId": 299535,
                                  "score": 6,
                                  "comment": "범위를 벗어난 별점"
                                }
                                """))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.isSuccess").value(false));

        mockMvc.perform(patch("/members/2/ratings/{ratingId}", ratingId)
                        .contentType("application/json")
                        .content("""
                                {"score": 4, "comment": "다른 회원의 수정 요청"}
                                """))
                .andExpect(status().isForbidden())
                .andExpect(jsonPath("$.isSuccess").value(false));

        mockMvc.perform(patch("/members/1/ratings/{ratingId}", ratingId)
                        .contentType("application/json")
                        .content("""
                                {"score": 4, "comment": "수정된 한줄평"}
                                """))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.message").value("평점 수정에 성공했습니다."));

        mockMvc.perform(delete("/members/1/ratings/{ratingId}", ratingId))
                .andExpect(status().isNoContent())
                .andExpect(content().string(""));

        mockMvc.perform(delete("/members/1/ratings/{ratingId}", ratingId))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.isSuccess").value(false));
    }
}
