package com.umc.study.member.controller;

import com.umc.study.member.dto.MemberInfoResponse;
import com.umc.study.member.dto.MemberUpdateRequest;
import com.umc.study.auth.AuthInterceptor;
import org.springframework.web.bind.annotation.RequestAttribute;
import org.springframework.web.bind.annotation.PatchMapping;

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
@GetMapping("/me")
public ResponseEntity<ApiResponse<MemberInfoResponse>> getMyInfo(
        // 인터셉터가 request.setAttribute("memberId", ...)로 담아둔 값을 꺼냅니다
        @RequestAttribute(AuthInterceptor.MEMBER_ID) Long memberId
) {
    MemberInfoResponse response = memberService.getMyInfo(memberId);
    return ResponseEntity.ok(ApiResponse.ok("회원 정보를 조회했습니다.", response));
}
@PatchMapping("/me")
public ResponseEntity<ApiResponse<MemberInfoResponse>> updateMyInfo(
        @RequestAttribute(AuthInterceptor.MEMBER_ID) Long memberId,
        @RequestBody @Valid MemberUpdateRequest request
) {
    MemberInfoResponse response = memberService.updateMyInfo(memberId, request);
    return ResponseEntity.ok(ApiResponse.ok("회원 정보를 수정했습니다.", response));
}
}
