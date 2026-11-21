package com.umc.movie.service;

import com.umc.movie.dto.CreateRatingRequest;
import com.umc.movie.dto.UpdateRatingRequest;
import com.umc.movie.entity.Member;
import com.umc.movie.entity.Rating;
import com.umc.movie.exception.ApiException;
import com.umc.movie.repository.MemberRepository;
import com.umc.movie.repository.RatingRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.test.util.ReflectionTestUtils;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;

@ExtendWith(MockitoExtension.class)
class RatingServiceTest {

    @Mock
    private RatingRepository ratingRepository;

    @Mock
    private MemberRepository memberRepository;

    @InjectMocks
    private RatingService ratingService;

    @Test
    @DisplayName("같은 영화에 평점을 중복 등록하면 RATING409_1을 던지고 저장하지 않는다")
    void createRatingWhenDuplicated() {
        Member member = member(1L, "writer@umc.com");
        given(memberRepository.findById(1L)).willReturn(Optional.of(member));
        given(ratingRepository.existsByMember_MemberIdAndMovieId(1L, 550L)).willReturn(true);

        assertThatThrownBy(() -> ratingService.create(1L, new CreateRatingRequest(550L, 5, "좋아요")))
                .isInstanceOf(ApiException.class)
                .extracting("code")
                .isEqualTo("RATING409_1");

        verify(ratingRepository, never()).save(any(Rating.class));
    }

    @Test
    @DisplayName("남의 평점을 수정하면 RATING403_1을 던지고 저장하지 않는다")
    void updateRatingOwnedByAnotherMember() {
        Member writer = member(2L, "writer@umc.com");
        Rating rating = Rating.builder().member(writer).movieId(550L).score(3).comment("보통").build();
        given(ratingRepository.findById(10L)).willReturn(Optional.of(rating));

        assertThatThrownBy(() -> ratingService.update(1L, 10L, new UpdateRatingRequest(5, "수정")))
                .isInstanceOf(ApiException.class)
                .extracting("code")
                .isEqualTo("RATING403_1");

        verify(ratingRepository, never()).save(any(Rating.class));
    }

    private Member member(Long id, String email) {
        Member member = Member.builder()
                .email(email)
                .password("암호화된비밀번호")
                .nickname("회원" + id)
                .build();
        ReflectionTestUtils.setField(member, "memberId", id);
        return member;
    }
}
