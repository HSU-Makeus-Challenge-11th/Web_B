package com.umc.study.member.dto;

import com.umc.study.member.entity.Member;

public record MemberResponse(Long memberId, String email, String nickname) {

    public static MemberResponse from(Member member) {
        return new MemberResponse(
                member.getMemberId(),
                member.getEmail(),
                member.getNickname()
        );
    }
}
