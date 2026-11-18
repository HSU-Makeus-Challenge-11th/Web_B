package com.umc.study.member.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.umc.study.auth.JwtUtil;
import com.umc.study.member.entity.Member;
import com.umc.study.member.repository.*;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("demo")
class Week8FavoriteIntegrationTest {
    @Autowired MockMvc mvc;
    @Autowired JwtUtil jwt;
    @Autowired MemberRepository members;
    @Autowired FavoriteRepository favorites;
    @Autowired RatingRepository ratings;
    @Autowired ObjectMapper mapper;

    private Member member(String name) {
        return members.saveAndFlush(new Member(name + "@week8.test", "unused-test-hash", name));
    }
    private String auth(Member member) {
        return "Bearer " + jwt.createAccessToken(member.getMemberId(), member.getEmail());
    }

    @Test
    void favoritesArePrivateOrderedAndUniquePerMemberMovie() throws Exception {
        var a = member("favorites8a"); var b = member("favorites8b");
        mvc.perform(post("/favorites").contentType("application/json").content("{\"movieId\":550}"))
                .andExpect(status().isUnauthorized()).andExpect(jsonPath("$.code").value("AUTH401_2"));
        mvc.perform(get("/favorites/550").header("Authorization", auth(a)))
                .andExpect(jsonPath("$.result.isFavorite").value(false));
        for (long movieId : new long[]{550, 155}) {
            mvc.perform(post("/favorites").header("Authorization", auth(a))
                            .contentType("application/json").content("{\"movieId\":" + movieId + "}"))
                    .andExpect(status().isCreated()).andExpect(jsonPath("$.result.createdAt").isString());
        }
        mvc.perform(post("/favorites").header("Authorization", auth(a))
                        .contentType("application/json").content("{\"movieId\":550}"))
                .andExpect(status().isConflict()).andExpect(jsonPath("$.code").value("FAVORITE409_1"));
        mvc.perform(get("/favorites").header("Authorization", auth(a)))
                .andExpect(jsonPath("$.result.length()").value(2)).andExpect(jsonPath("$.result[0].movieId").value(155));
        mvc.perform(get("/favorites").header("Authorization", auth(b)))
                .andExpect(jsonPath("$.result").isEmpty());
        mvc.perform(delete("/favorites/550").header("Authorization", auth(b)))
                .andExpect(status().isNotFound()).andExpect(jsonPath("$.code").value("FAVORITE404_1"));
        mvc.perform(get("/favorites/550").header("Authorization", auth(a)))
                .andExpect(jsonPath("$.result.isFavorite").value(true));
        mvc.perform(post("/favorites").header("Authorization", auth(b))
                        .contentType("application/json").content("{\"movieId\":550}"))
                .andExpect(status().isCreated());
        mvc.perform(delete("/favorites/550").header("Authorization", auth(a)))
                .andExpect(status().isOk()).andExpect(jsonPath("$.code").value("COMMON200"));
        mvc.perform(get("/favorites/550").header("Authorization", auth(b)))
                .andExpect(jsonPath("$.result.isFavorite").value(true));
        mvc.perform(post("/favorites").header("Authorization", auth(a))
                        .contentType("application/json").content("{\"movieId\":0}"))
                .andExpect(status().isBadRequest());
    }

    @Test
    void movieRecordCommitsBothOrOnlyRatingAsRequested() throws Exception {
        var a = member("record8");
        mvc.perform(post("/movie-records").header("Authorization", auth(a)).contentType("application/json")
                        .content("{\"movieId\":238,\"score\":5,\"comment\":\"함께 저장\",\"addToFavorites\":true}"))
                .andExpect(status().isCreated()).andExpect(jsonPath("$.result.rating.movieId").value(238))
                .andExpect(jsonPath("$.result.favorite.movieId").value(238));
        assertThat(ratings.existsByMember_MemberIdAndMovieId(a.getMemberId(), 238L)).isTrue();
        assertThat(favorites.existsByMember_MemberIdAndMovieId(a.getMemberId(), 238L)).isTrue();
        mvc.perform(post("/movie-records").header("Authorization", auth(a)).contentType("application/json")
                        .content("{\"movieId\":240,\"score\":4,\"addToFavorites\":false}"))
                .andExpect(status().isCreated()).andExpect(jsonPath("$.result.favorite").doesNotExist());
        assertThat(favorites.existsByMember_MemberIdAndMovieId(a.getMemberId(), 240L)).isFalse();
    }

    @Test
    void favoriteFailureRollsBackAnAlreadyInsertedRating() throws Exception {
        var a = member("rollback8");
        mvc.perform(post("/favorites").header("Authorization", auth(a))
                        .contentType("application/json").content("{\"movieId\":278}"))
                .andExpect(status().isCreated());
        long before = ratings.count();
        mvc.perform(post("/movie-records").header("Authorization", auth(a)).contentType("application/json")
                        .content("{\"movieId\":278,\"score\":5,\"addToFavorites\":true}"))
                .andExpect(status().isConflict()).andExpect(jsonPath("$.code").value("FAVORITE409_1"));
        // Test 자체에는 @Transactional을 붙이지 않아 실제 Service 경계의 rollback을 검사함.
        assertThat(ratings.count()).isEqualTo(before);
        assertThat(ratings.existsByMember_MemberIdAndMovieId(a.getMemberId(), 278L)).isFalse();
        assertThat(favorites.existsByMember_MemberIdAndMovieId(a.getMemberId(), 278L)).isTrue();
    }
}
