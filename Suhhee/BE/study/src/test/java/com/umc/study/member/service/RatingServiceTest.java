package com.umc.study.member.service;

import com.umc.study.member.repository.MemberRepository;
import com.umc.study.member.repository.RatingRepository;
import org.junit.jupiter.api.Test;
import com.umc.study.common.exception.ApiException;

import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

class RatingServiceTest {

    @Test
    void getRatingsRejectsUnknownMember() {
        RatingRepository ratingRepository = mock(RatingRepository.class);
        MemberRepository memberRepository = mock(MemberRepository.class);
        when(memberRepository.existsById(999L)).thenReturn(false);
        RatingService ratingService = new RatingService(ratingRepository, memberRepository);

        assertThatThrownBy(() -> ratingService.getRatingsByMember(999L))
                .isInstanceOf(ApiException.class)
                .hasMessageContaining("해당 회원을 찾을 수 없습니다.");
    }
}
