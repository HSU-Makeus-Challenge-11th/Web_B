package com.umc.study.member.service;

import com.umc.study.member.dto.MemberInfoResponse;
import com.umc.study.member.dto.MemberUpdateRequest;
import com.umc.study.common.exception.ApiException;

import com.umc.study.member.dto.AvailabilityResponse;
import com.umc.study.member.dto.MemberResponse;
import com.umc.study.member.dto.SignUpRequest;
import com.umc.study.member.entity.Member;
import com.umc.study.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

@Service
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;

    @Transactional(readOnly = true)
    public AvailabilityResponse checkNickname(String nickname) {
        return new AvailabilityResponse(!memberRepository.existsByNickname(nickname));
    }

    @Transactional(readOnly = true)
    public AvailabilityResponse checkEmail(String email) {
        return new AvailabilityResponse(!memberRepository.existsByEmail(email));
    }

    @Transactional
    public MemberResponse signUp(SignUpRequest request) {
        if (memberRepository.existsByEmail(request.email())) {
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "이미 사용 중인 이메일입니다."
            );
        }
        if (memberRepository.existsByNickname(request.nickname())) {
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "이미 사용 중인 닉네임입니다."
            );
        }

        Member member = new Member(
                request.email(),
                passwordEncoder.encode(request.password()),
                request.nickname()
        );
        return MemberResponse.from(memberRepository.save(member));
    }
    @Transactional(readOnly = true)
public MemberInfoResponse getMyInfo(Long memberId) {
    Member member = memberRepository.findById(memberId)
            .orElseThrow(() -> new ApiException(HttpStatus.NOT_FOUND, "MEMBER404_1",
                    "해당 회원을 찾을 수 없습니다."));

    return MemberInfoResponse.from(member);
}
    @Transactional
public MemberInfoResponse updateMyInfo(Long memberId, MemberUpdateRequest request) {
    Member member = memberRepository.findById(memberId)
            .orElseThrow(() -> new ApiException(HttpStatus.NOT_FOUND, "MEMBER404_1",
                    "해당 회원을 찾을 수 없습니다."));

    // 나를 제외한 다른 회원이 그 닉네임을 쓰고 있다면 막습니다.
    // DB에도 UNIQUE 제약이 걸려 있지만 제약 위반 예외 대신 우리가 정한 응답을 주기 위해 먼저 확인합니다.
    if (memberRepository.existsByNicknameAndMemberIdNot(request.nickname(), memberId)) {
        throw new ApiException(HttpStatus.CONFLICT, "MEMBER409_1",
                "이미 사용 중인 닉네임입니다.");
    }

    member.updateNickname(request.nickname());
    memberRepository.save(member);

    return MemberInfoResponse.from(member);
}
}
