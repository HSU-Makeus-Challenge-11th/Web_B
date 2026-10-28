package com.umc.study.member.service;

import com.umc.study.member.dto.RatingResponse;
import com.umc.study.member.repository.MemberRepository;
import com.umc.study.member.repository.RatingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RatingService {

    private final RatingRepository ratingRepository;
    private final MemberRepository memberRepository;

    @Transactional(readOnly = true)
    public List<RatingResponse> getRatingsByMember(Long memberId) {
        if (!memberRepository.existsById(memberId)) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND,
                    "존재하지 않는 유저입니다."
            );
        }

        return ratingRepository.findByMember_MemberIdOrderByRatingIdDesc(memberId)
                .stream()
                .map(RatingResponse::from)
                .toList();
    }
}
