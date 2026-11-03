package com.umc.study.member.controller;

import com.umc.study.member.dto.AvailabilityResponse;
import com.umc.study.common.dto.ApiResponse;
import com.umc.study.member.dto.MemberResponse;
import com.umc.study.member.dto.SignUpRequest;
import com.umc.study.member.service.MemberService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/members")
public class MemberController {

    private final MemberService memberService;

    @GetMapping("/nickname/{nickname}")
    public ApiResponse<AvailabilityResponse> checkNickname(@PathVariable String nickname) {
        return ApiResponse.ok(
                "닉네임 중복 확인에 성공했습니다.",
                memberService.checkNickname(nickname)
        );
    }

    @GetMapping("/email/{email}")
    public ApiResponse<AvailabilityResponse> checkEmail(@PathVariable String email) {
        return ApiResponse.ok(
                "이메일 중복 확인에 성공했습니다.",
                memberService.checkEmail(email)
        );
    }

    @PostMapping
    public ResponseEntity<ApiResponse<MemberResponse>> signUp(
            @Valid @RequestBody SignUpRequest request
    ) {
        MemberResponse response = memberService.signUp(request);
        return ResponseEntity.status(201)
                .body(ApiResponse.created("회원가입에 성공했습니다.", response));
    }
}
