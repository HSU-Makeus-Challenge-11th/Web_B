package com.umc.study.member.service;

import com.umc.study.member.dto.AvailabilityResponse;
import com.umc.study.member.repository.MemberRepository;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

class MemberServiceTest {

    @Test
    void checkNicknameReturnsTheOppositeOfExists() {
        MemberRepository memberRepository = mock(MemberRepository.class);
        when(memberRepository.existsByNickname("수현")).thenReturn(true);
        MemberService memberService = new MemberService(memberRepository);

        AvailabilityResponse response = memberService.checkNickname("수현");

        assertThat(response.available()).isFalse();
    }
}
