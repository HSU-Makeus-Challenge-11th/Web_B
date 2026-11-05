package com.umc.movie;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.umc.movie.entity.Member;
import com.umc.movie.repository.MemberRepository;
import com.umc.movie.repository.RatingRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.bean.override.mockito.MockitoSpyBean;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;

import java.util.Map;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.doReturn;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
class WritingApiIntegrationTests {
    @Autowired MockMvc mvc;
    @Autowired ObjectMapper objectMapper;
    @Autowired PasswordEncoder passwordEncoder;
    @MockitoSpyBean MemberRepository members;
    @MockitoSpyBean RatingRepository ratings;

    @BeforeEach
    void clearDatabase() {
        ratings.deleteAll();
        members.deleteAll();
    }

    @Test
    void signUpStoresBcryptHashAndNeverReturnsPassword() throws Exception {
        signup("umc@example.com", "moviefan", "Umc!1234")
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.isSuccess").value(true))
                .andExpect(jsonPath("$.code").value("COMMON201"))
                .andExpect(jsonPath("$.result.memberId").isNumber())
                .andExpect(jsonPath("$.result.email").value("umc@example.com"))
                .andExpect(jsonPath("$.result.nickname").value("moviefan"))
                .andExpect(jsonPath("$.result.password").doesNotExist());

        Member member = members.findAll().getFirst();
        assertThat(member.getPassword()).hasSize(60).isNotEqualTo("Umc!1234");
        assertThat(passwordEncoder.matches("Umc!1234", member.getPassword())).isTrue();
    }

    @ParameterizedTest
    @ValueSource(strings = {"", "invalid-email"})
    void rejectsInvalidEmail(String email) throws Exception {
        expectFailure(signup(email, "moviefan", "Umc!1234"), 400, "COMMON4001");
        assertThat(members.count()).isZero();
    }

    @ParameterizedTest
    @ValueSource(strings = {"", "a", "1234567890123", "  "})
    void rejectsInvalidNickname(String nickname) throws Exception {
        expectFailure(signup("umc@example.com", nickname, "Umc!1234"), 400, "COMMON4001");
    }

    @ParameterizedTest
    @ValueSource(strings = {"", "Umc!12", "umc!1234", "UMC!1234", "Umc!abcd", "Umca1234"})
    void rejectsWeakPassword(String password) throws Exception {
        expectFailure(signup("umc@example.com", "moviefan", password), 400, "COMMON4001");
    }

    @Test
    void rejectsPasswordExceedingBcryptByteLimit() throws Exception {
        expectFailure(signup("umc@example.com", "moviefan", "Umc!1234" + "가".repeat(22)), 400, "COMMON4001");
        assertThat(members.count()).isZero();
    }

    @Test
    void rejectsMissingSignupFields() throws Exception {
        expectFailure(mvc.perform(post("/members").contentType(MediaType.APPLICATION_JSON).content("{}")),
                400, "COMMON4001");
    }

    @Test
    void rejectsDuplicateEmailAndNickname() throws Exception {
        signup("umc@example.com", "moviefan", "Umc!1234").andExpect(status().isCreated());
        expectFailure(signup("umc@example.com", "another", "Umc!1234"), 409, "COMMON409")
                .andExpect(jsonPath("$.message").value("이미 사용 중인 이메일입니다."));
        expectFailure(signup("other@example.com", "moviefan", "Umc!1234"), 409, "COMMON409")
                .andExpect(jsonPath("$.message").value("이미 사용 중인 닉네임입니다."));
        assertThat(members.count()).isEqualTo(1);
    }

    @ParameterizedTest
    @ValueSource(strings = {"email", "nickname"})
    void databaseUniqueConstraintStillRejectsSignupWhenPrecheckMisses(String field) throws Exception {
        signup("umc@example.com", "moviefan", "Umc!1234").andExpect(status().isCreated());
        // 동시 요청처럼 사전 검사가 중복을 놓친 상황을 재현합니다. 저장은 실제 DB를 사용합니다.
        if (field.equals("email")) {
            doReturn(false).when(members).existsByEmail("umc@example.com");
            expectFailure(signup("umc@example.com", "another", "Umc!1234"), 409, "COMMON4091");
        } else {
            doReturn(false).when(members).existsByNickname("moviefan");
            expectFailure(signup("other@example.com", "moviefan", "Umc!1234"), 409, "COMMON4091");
        }
        assertThat(members.count()).isEqualTo(1);
    }

    @Test
    void ratingCanBeCreatedUpdatedAndDeleted() throws Exception {
        long memberId = createMember("owner");
        long ratingId = createRating(memberId, 550);
        mvc.perform(patch("/members/{memberId}/ratings/{ratingId}", memberId, ratingId)
                        .contentType(MediaType.APPLICATION_JSON).content("{\"score\":4,\"comment\":\"수정한 후기\"}"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.isSuccess").value(true))
                .andExpect(jsonPath("$.code").value("COMMON200"))
                .andExpect(content().json("{\"isSuccess\":true,\"code\":\"COMMON200\",\"message\":\"평점 수정에 성공했습니다.\",\"result\":null}"));
        var rating = ratings.findById(ratingId).orElseThrow();
        assertThat(rating.getScore()).isEqualTo(4);
        assertThat(rating.getComment()).isEqualTo("수정한 후기");

        mvc.perform(delete("/members/{memberId}/ratings/{ratingId}", memberId, ratingId))
                .andExpect(status().isNoContent()).andExpect(content().string(""));
        assertThat(ratings.findById(ratingId)).isEmpty();
    }

    @Test
    void sameMovieCanBeRatedByDifferentMembersButNotTwiceByOneMember() throws Exception {
        long owner = createMember("owner");
        long other = createMember("other");
        createRating(owner, 550);
        expectFailure(postRating(owner, Map.of("movieId", 550, "score", 5)), 409, "COMMON409");
        createRating(other, 550);
        assertThat(ratings.count()).isEqualTo(2);
    }

    @Test
    void databaseUniqueConstraintRejectsDuplicateRatingWhenPrecheckMisses() throws Exception {
        long owner = createMember("owner");
        createRating(owner, 550);
        doReturn(false).when(ratings).existsByMember_MemberIdAndMovieId(owner, 550L);
        expectFailure(postRating(owner, Map.of("movieId", 550, "score", 5)), 409, "COMMON4091");
        assertThat(ratings.count()).isEqualTo(1);
    }

    @ParameterizedTest
    @ValueSource(strings = {"{\"movieId\":550}", "{\"movieId\":550,\"score\":0}",
            "{\"movieId\":550,\"score\":6}", "{\"movieId\":550,\"score\":4.5}",
            "{\"movieId\":550.5,\"score\":4}", "{\"score\":4}", "{\"movieId\":0,\"score\":4}",
            "{\"movieId\":-1,\"score\":4}", "{\"movieId\":550,\"score\":\"invalid\"}"})
    void rejectsInvalidRatingInputs(String json) throws Exception {
        long owner = createMember("owner");
        expectFailure(mvc.perform(post("/members/{memberId}/ratings", owner)
                .contentType(MediaType.APPLICATION_JSON).content(json)), 400, "COMMON4001");
        assertThat(ratings.count()).isZero();
    }

    @Test
    void validatesCommentLengthAndAllowsOmittedComment() throws Exception {
        long owner = createMember("owner");
        expectFailure(postRating(owner, Map.of("movieId", 550, "score", 5, "comment", "가".repeat(501))),
                400, "COMMON4001");
        createRating(owner, 550);
        postRating(owner, Map.of("movieId", 155, "score", 1, "comment", "가".repeat(500)))
                .andExpect(status().isCreated());
    }

    @Test
    void rejectsInvalidUpdateWithoutChangingSavedRating() throws Exception {
        long owner = createMember("owner");
        long ratingId = createRating(owner, 550);
        for (String json : new String[]{"{}", "{\"score\":6}", "{\"score\":2.5}",
                objectMapper.writeValueAsString(Map.of("score", 4, "comment", "가".repeat(501)))}) {
            expectFailure(mvc.perform(patch("/members/{memberId}/ratings/{ratingId}", owner, ratingId)
                    .contentType(MediaType.APPLICATION_JSON).content(json)), 400, "COMMON4001");
        }
        assertThat(ratings.findById(ratingId).orElseThrow().getScore()).isEqualTo(5);
    }

    @Test
    void otherMemberCannotUpdateOrDeleteRating() throws Exception {
        long owner = createMember("owner");
        long other = createMember("other");
        long ratingId = createRating(owner, 550);
        expectFailure(mvc.perform(patch("/members/{memberId}/ratings/{ratingId}", other, ratingId)
                .contentType(MediaType.APPLICATION_JSON).content("{\"score\":1}")), 403, "COMMON403");
        expectFailure(mvc.perform(delete("/members/{memberId}/ratings/{ratingId}", other, ratingId)), 403, "COMMON403");
        assertThat(ratings.findById(ratingId).orElseThrow().getScore()).isEqualTo(5);
    }

    @Test
    void missingMemberOrRatingReturnsNotFound() throws Exception {
        expectFailure(postRating(Long.MAX_VALUE, Map.of("movieId", 550, "score", 5)), 404, "COMMON404");
        expectFailure(mvc.perform(patch("/members/1/ratings/{ratingId}", Long.MAX_VALUE)
                .contentType(MediaType.APPLICATION_JSON).content("{\"score\":3}")), 404, "COMMON404");
        expectFailure(mvc.perform(delete("/members/1/ratings/{ratingId}", Long.MAX_VALUE)), 404, "COMMON404");
    }

    @Test
    void malformedJsonAndPathUseCommonFailureEnvelope() throws Exception {
        expectFailure(mvc.perform(post("/members").contentType(MediaType.APPLICATION_JSON).content("{")),
                400, "COMMON4001");
        expectFailure(mvc.perform(delete("/members/abc/ratings/1")), 400, "COMMON4001");
    }

    @Test
    void existingReadApisKeepTheirResponseShapes() throws Exception {
        long owner = createMember("owner");
        mvc.perform(get("/members/email/owner@example.com"))
                .andExpect(status().isOk()).andExpect(content().json("{\"available\":false}"));
        mvc.perform(get("/members/nickname/unused"))
                .andExpect(status().isOk()).andExpect(content().json("{\"available\":true}"));
        mvc.perform(get("/members/{memberId}/ratings", owner))
                .andExpect(status().isOk()).andExpect(content().json("[]"));
        createRating(owner, 550);
        createRating(owner, 155);
        mvc.perform(get("/members/{memberId}/ratings", owner))
                .andExpect(status().isOk()).andExpect(jsonPath("$[0].movieId").value(155))
                .andExpect(jsonPath("$[1].movieId").value(550));
        expectFailure(mvc.perform(get("/members/{memberId}/ratings", Long.MAX_VALUE)), 404, "COMMON404");
    }

    private ResultActions signup(String email, String nickname, String password) throws Exception {
        return mvc.perform(post("/members").contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(Map.of("email", email, "nickname", nickname, "password", password))));
    }

    private long createMember(String nickname) throws Exception {
        String body = signup(nickname + "@example.com", nickname, "Umc!1234")
                .andExpect(status().isCreated()).andReturn().getResponse().getContentAsString();
        return objectMapper.readTree(body).path("result").path("memberId").asLong();
    }

    private ResultActions postRating(long memberId, Map<String, Object> body) throws Exception {
        return mvc.perform(post("/members/{memberId}/ratings", memberId).contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(body)));
    }

    private long createRating(long memberId, long movieId) throws Exception {
        String body = postRating(memberId, Map.of("movieId", movieId, "score", 5))
                .andExpect(status().isCreated()).andExpect(jsonPath("$.code").value("COMMON201"))
                .andReturn().getResponse().getContentAsString();
        return objectMapper.readTree(body).path("result").asLong();
    }

    private ResultActions expectFailure(ResultActions result, int status, String code) throws Exception {
        return result.andExpect(status().is(status))
                .andExpect(jsonPath("$.isSuccess").value(false))
                .andExpect(jsonPath("$.code").value(code))
                .andExpect(jsonPath("$.message").isNotEmpty())
                .andExpect(content().string(org.hamcrest.Matchers.containsString("\"result\":null")));
    }
}
