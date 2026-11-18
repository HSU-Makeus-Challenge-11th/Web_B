package com.umc.study.member.dto;

public record LoginResponse(
        String nickname,
        String accessToken
) {
}
