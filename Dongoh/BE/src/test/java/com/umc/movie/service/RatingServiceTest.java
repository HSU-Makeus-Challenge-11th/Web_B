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

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.mock;
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
    @DisplayName("같은 영화에 평점을 중복 등록하면 RATING409_1 예외를 던지고 저장하지 않는다")
    void createRatingWhenDuplicated() {
        Member member = Member.builder()
                .email("challenger@umc.com")
                .password("암호화된비밀번호")
                .nickname("영화조아")
                .build();
        given(memberRepository.findById(1L)).willReturn(Optional.of(member));
        given(ratingRepository.existsByMember_MemberIdAndMovieId(1L, 550L))
                .willReturn(true);

        assertThatThrownBy(() -> ratingService.create(
                1L,
                new CreateRatingRequest(550L, 5, "재미있어요.")
        ))
                .isInstanceOfSatisfying(ApiException.class, exception -> {
                    assertThat(exception.getStatus().value()).isEqualTo(409);
                    assertThat(exception.getCode()).isEqualTo("RATING409_1");
                });

        verify(ratingRepository, never()).save(org.mockito.ArgumentMatchers.any(Rating.class));
    }

    @Test
    @DisplayName("다른 회원의 평점을 수정하면 RATING403_1 예외를 던지고 저장하지 않는다")
    void updateOtherMembersRating() {
        Member owner = mock(Member.class);
        given(owner.getMemberId()).willReturn(2L);
        Rating rating = Rating.builder()
                .member(owner)
                .movieId(550L)
                .score(5)
                .comment("재미있어요.")
                .build();
        given(ratingRepository.findById(10L)).willReturn(Optional.of(rating));

        assertThatThrownBy(() -> ratingService.update(
                1L,
                10L,
                new UpdateRatingRequest(4, "수정할 수 없어야 합니다.")
        ))
                .isInstanceOfSatisfying(ApiException.class, exception -> {
                    assertThat(exception.getStatus().value()).isEqualTo(403);
                    assertThat(exception.getCode()).isEqualTo("RATING403_1");
                });

        verify(ratingRepository, never()).save(rating);
    }
}
