package com.umc.movie;

import com.umc.movie.entity.Member;
import com.umc.movie.repository.FavoriteRepository;
import com.umc.movie.repository.MemberRepository;
import com.umc.movie.repository.RatingRepository;
import com.umc.movie.util.JwtUtil;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
class Week8ApiIntegrationTests {
    @Autowired MockMvc mvc;
    @Autowired JwtUtil jwtUtil;
    @Autowired MemberRepository members;
    @Autowired RatingRepository ratings;
    @Autowired FavoriteRepository favorites;
    private String authorization;

    @BeforeEach
    void setUp() {
        favorites.deleteAll();
        ratings.deleteAll();
        members.deleteAll();
        Member member = members.save(Member.builder()
                .email("week8@example.com").password("encoded").nickname("week8").build());
        authorization = "Bearer " + jwtUtil.createAccessToken(member.getMemberId(), member.getEmail());
    }

    @Test
    void favoriteApisFollowPracticeFourRules() throws Exception {
        mvc.perform(post("/favorites").contentType(MediaType.APPLICATION_JSON).content("{\"movieId\":550}"))
                .andExpect(status().isUnauthorized()).andExpect(jsonPath("$.code").value("AUTH401_2"));

        mvc.perform(get("/favorites").header(HttpHeaders.AUTHORIZATION, authorization))
                .andExpect(status().isOk()).andExpect(jsonPath("$.result").isEmpty());
        mvc.perform(get("/favorites/550").header(HttpHeaders.AUTHORIZATION, authorization))
                .andExpect(status().isOk()).andExpect(jsonPath("$.result.isFavorite").value(false));
        mvc.perform(delete("/favorites/550").header(HttpHeaders.AUTHORIZATION, authorization))
                .andExpect(status().isNotFound()).andExpect(jsonPath("$.code").value("FAVORITE404_1"));
        mvc.perform(post("/favorites").header(HttpHeaders.AUTHORIZATION, authorization)
                        .contentType(MediaType.APPLICATION_JSON).content("{\"movieId\":0}"))
                .andExpect(status().isBadRequest());

        mvc.perform(post("/favorites").header(HttpHeaders.AUTHORIZATION, authorization)
                        .contentType(MediaType.APPLICATION_JSON).content("{\"movieId\":550}"))
                .andExpect(status().isCreated()).andExpect(jsonPath("$.result.movieId").value(550));
        mvc.perform(post("/favorites").header(HttpHeaders.AUTHORIZATION, authorization)
                        .contentType(MediaType.APPLICATION_JSON).content("{\"movieId\":550}"))
                .andExpect(status().isConflict()).andExpect(jsonPath("$.code").value("FAVORITE409_1"));
        mvc.perform(get("/favorites/550").header(HttpHeaders.AUTHORIZATION, authorization))
                .andExpect(status().isOk()).andExpect(jsonPath("$.result.isFavorite").value(true));
        mvc.perform(delete("/favorites/550").header(HttpHeaders.AUTHORIZATION, authorization))
                .andExpect(status().isOk()).andExpect(jsonPath("$.code").value("COMMON200"))
                .andExpect(jsonPath("$.result").doesNotExist());
    }

    @Test
    void movieRecordStoresRatingAndFavoriteInOneRequest() throws Exception {
        mvc.perform(post("/movie-records").header(HttpHeaders.AUTHORIZATION, authorization)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"movieId\":238,\"score\":5,\"comment\":\"다시 보고 싶은 영화입니다.\",\"addToFavorites\":true}"))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.result.rating.movieId").value(238))
                .andExpect(jsonPath("$.result.favorite.movieId").value(238));
        assertThat(ratings.count()).isEqualTo(1);
        assertThat(favorites.count()).isEqualTo(1);

        mvc.perform(post("/movie-records").header(HttpHeaders.AUTHORIZATION, authorization)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"movieId\":238,\"score\":4,\"addToFavorites\":true}"))
                .andExpect(status().isConflict()).andExpect(jsonPath("$.code").value("RATING409_1"));
        assertThat(ratings.count()).isEqualTo(1);
        assertThat(favorites.count()).isEqualTo(1);
    }
}
