package com.umc.study.member.service;

import com.umc.study.member.dto.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class MovieRecordService {
    private final RatingService ratingService;
    private final FavoriteService favoriteService;

    @Transactional
    public MovieRecordResponse create(Long memberId, CreateMovieRecordRequest request) {
        // 두 Service의 기본 REQUIRED 전파가 이 트랜잭션에 참여함.
        var rating = ratingService.create(memberId,
                new CreateRatingRequest(request.movieId(), request.score(), request.comment()));
        var favorite = request.addToFavorites()
                ? favoriteService.create(memberId, new CreateFavoriteRequest(request.movieId()))
                : null;
        // 즐겨찾기 저장 중 예외가 발생하면 먼저 저장한 평점도 rollback함.
        return new MovieRecordResponse(rating, favorite);
    }
}
