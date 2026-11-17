package com.umc.study.member.service;

import com.umc.study.member.dto.CreateRatingRequest;
import com.umc.study.member.dto.RatingResponse;
import com.umc.study.member.dto.UpdateRatingRequest;
import com.umc.study.member.entity.Member;
import com.umc.study.member.entity.Rating;
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

    @Transactional
    public Long create(Long memberId, CreateRatingRequest request) {
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "존재하지 않는 유저입니다."
                ));

        if (ratingRepository.existsByMember_MemberIdAndMovieId(
                memberId,
                request.movieId()
        )) {
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "이미 평점을 등록한 영화입니다."
            );
        }

        Rating rating = new Rating(
                member,
                request.movieId(),
                request.score(),
                request.comment()
        );
        return ratingRepository.save(rating).getRatingId();
    }

    @Transactional
    public void update(Long ratingId, Long memberId, UpdateRatingRequest request) {
        Rating rating = getOwnedRating(ratingId, memberId);
        rating.update(request.score(), request.comment());
    }

    @Transactional
    public void delete(Long ratingId, Long memberId) {
        Rating rating = getOwnedRating(ratingId, memberId);
        ratingRepository.delete(rating);
    }

    private Rating getOwnedRating(Long ratingId, Long memberId) {
        Rating rating = ratingRepository.findById(ratingId)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "존재하지 않는 평점입니다."
                ));

        if (!rating.getMember().getMemberId().equals(memberId)) {
            throw new ResponseStatusException(
                    HttpStatus.FORBIDDEN,
                    "다른 회원의 평점은 수정하거나 삭제할 수 없습니다."
            );
        }
        return rating;
    }
}
