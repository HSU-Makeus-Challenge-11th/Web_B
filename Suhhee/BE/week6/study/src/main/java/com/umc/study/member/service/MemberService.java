package com.umc.study.member.service;

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
}
