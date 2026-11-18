package com.umc.study.member.controller;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.umc.study.auth.JwtUtil;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest(properties = "jwt.secret=week7-integration-test-key-for-hmac-sha-256-only")
@AutoConfigureMockMvc
@ActiveProfiles("demo")
class Week7AuthIntegrationTest {
    @Autowired MockMvc mvc;
    @Autowired ObjectMapper mapper;
    @Autowired JwtUtil jwt;

    private JsonNode signup(String email, String nickname) throws Exception {
        String body = mapper.writeValueAsString(java.util.Map.of(
                "email", email, "nickname", nickname, "password", "Week7!pass"));
        return mapper.readTree(mvc.perform(post("/members").contentType("application/json").content(body))
                .andExpect(status().isCreated()).andReturn().getResponse().getContentAsString());
    }

    private String login(String email) throws Exception {
        String body = mapper.writeValueAsString(java.util.Map.of("email", email, "password", "Week7!pass"));
        JsonNode response = mapper.readTree(mvc.perform(post("/auth/login")
                        .contentType("application/json").content(body))
                .andExpect(status().isOk()).andExpect(jsonPath("$.result.accessToken").isString())
                .andReturn().getResponse().getContentAsString());
        return response.path("result").path("accessToken").asText();
    }

    @Test
    void tokensEnforceOwnershipAcrossTheRequiredScenario() throws Exception {
        long memberId = signup("owner7@test.com", "주인7").path("result").path("memberId").asLong();
        signup("other7@test.com", "다른7");
        String tokenA = login("owner7@test.com"), tokenB = login("other7@test.com");
        assertThat(jwt.getMemberId(tokenA)).isEqualTo(memberId);

        mvc.perform(get("/members/me")).andExpect(status().isUnauthorized())
                .andExpect(jsonPath("$.code").value("AUTH401_2"));
        mvc.perform(get("/members/me").header("Authorization", "Bearer " + tokenA))
                .andExpect(status().isOk()).andExpect(jsonPath("$.result.email").value("owner7@test.com"))
                .andExpect(jsonPath("$.result.password").doesNotExist());

        String payload = "{\"movieId\":999700,\"score\":5,\"comment\":\"토큰 기반 평점\"}";
        JsonNode created = mapper.readTree(mvc.perform(post("/ratings")
                        .header("Authorization", "Bearer " + tokenA).contentType("application/json").content(payload))
                .andExpect(status().isCreated()).andExpect(jsonPath("$.code").value("COMMON201"))
                .andReturn().getResponse().getContentAsString());
        long ratingId = created.path("result").path("ratingId").asLong();
        mvc.perform(post("/ratings").header("Authorization", "Bearer " + tokenA)
                        .contentType("application/json").content(payload))
                .andExpect(status().isConflict()).andExpect(jsonPath("$.code").value("RATING409_1"));
        mvc.perform(patch("/ratings/{id}", ratingId).header("Authorization", "Bearer " + tokenB)
                        .contentType("application/json").content("{\"score\":1,\"comment\":\"남의 평점\"}"))
                .andExpect(status().isForbidden()).andExpect(jsonPath("$.code").value("RATING403_1"));
        mvc.perform(delete("/ratings/{id}", ratingId).header("Authorization", "Bearer " + tokenB))
                .andExpect(status().isForbidden());
        mvc.perform(patch("/ratings/{id}", ratingId).header("Authorization", "Bearer " + tokenA)
                        .contentType("application/json").content("{\"score\":4,\"comment\":\"본인 수정\"}"))
                .andExpect(status().isOk()).andExpect(jsonPath("$.result.score").value(4));
        mvc.perform(get("/members/{id}/ratings", memberId))
                .andExpect(status().isOk()).andExpect(jsonPath("$.code").value("COMMON200"))
                .andExpect(jsonPath("$.result[0].ratingId").value(ratingId));
        mvc.perform(delete("/ratings/9999999").header("Authorization", "Bearer " + tokenA))
                .andExpect(status().isNotFound()).andExpect(jsonPath("$.code").value("RATING404_1"));
        mvc.perform(delete("/ratings/{id}", ratingId).header("Authorization", "Bearer " + tokenA))
                .andExpect(status().isOk()).andExpect(jsonPath("$.code").value("COMMON200"))
                .andExpect(jsonPath("$.result").doesNotExist());
        mvc.perform(delete("/ratings/{id}", ratingId).header("Authorization", "Bearer " + tokenA))
                .andExpect(status().isNotFound());
    }

    @Test
    void invalidCredentialsHaveTheSameResponseAndTamperedTokensAreRejected() throws Exception {
        signup("credentials7@test.com", "로그인7");
        var missing = mvc.perform(post("/auth/login").contentType("application/json")
                        .content("{\"email\":\"missing7@test.com\",\"password\":\"wrong\"}"))
                .andExpect(status().isUnauthorized()).andReturn().getResponse().getContentAsString();
        var wrong = mvc.perform(post("/auth/login").contentType("application/json")
                        .content("{\"email\":\"credentials7@test.com\",\"password\":\"wrong\"}"))
                .andExpect(status().isUnauthorized()).andExpect(jsonPath("$.code").value("AUTH401_1"))
                .andReturn().getResponse().getContentAsString();
        assertThat(mapper.readTree(missing)).isEqualTo(mapper.readTree(wrong));
        String token = login("credentials7@test.com");
        String[] pieces = token.split("\\.");
        pieces[1] = java.util.Base64.getUrlEncoder().withoutPadding().encodeToString(
                "{\"sub\":\"999\"}".getBytes(java.nio.charset.StandardCharsets.UTF_8));
        mvc.perform(get("/members/me").header("Authorization", "Bearer " + String.join(".", pieces)))
                .andExpect(status().isUnauthorized()).andExpect(jsonPath("$.code").value("AUTH401_3"));
    }

    @Test
    void profileUpdateValidatesNicknameAndRejectsDuplicates() throws Exception {
        signup("profile7@test.com", "정보7");
        signup("taken7@test.com", "중복7");
        String token = login("profile7@test.com");
        mvc.perform(patch("/members/me").header("Authorization", "Bearer " + token)
                        .contentType("application/json").content("{\"nickname\":\"수정7\"}"))
                .andExpect(status().isOk()).andExpect(jsonPath("$.result.nickname").value("수정7"));
        mvc.perform(get("/members/me").header("Authorization", "Bearer " + token))
                .andExpect(jsonPath("$.result.nickname").value("수정7"));
        mvc.perform(patch("/members/me").header("Authorization", "Bearer " + token)
                        .contentType("application/json").content("{\"nickname\":\"중복7\"}"))
                .andExpect(status().isConflict()).andExpect(jsonPath("$.code").value("MEMBER409_1"));
        mvc.perform(patch("/members/me").header("Authorization", "Bearer " + token)
                        .contentType("application/json").content("{\"nickname\":\"한\"}"))
                .andExpect(status().isBadRequest());
        mvc.perform(options("/members/me").header("Origin", "http://localhost:5174")
                        .header("Access-Control-Request-Method", "PATCH"))
                .andExpect(status().isOk());
    }
}
