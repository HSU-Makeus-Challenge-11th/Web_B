package com.umc.study.member.service;

import com.umc.study.member.repository.MemberRepository;
import com.umc.study.member.repository.RatingRepository;
import org.junit.jupiter.api.Test;
import org.springframework.web.server.ResponseStatusException;

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
                .isInstanceOf(ResponseStatusException.class)
                .hasMessageContaining("존재하지 않는 유저입니다.");
    }
}
