package com.umc.study.member.service;

import com.umc.study.common.exception.ApiException;
import com.umc.study.member.dto.*;
import com.umc.study.member.entity.Favorite;
import com.umc.study.member.repository.FavoriteRepository;
import com.umc.study.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
@RequiredArgsConstructor
public class FavoriteService {
    private final FavoriteRepository favoriteRepository;
    private final MemberRepository memberRepository;

    @Transactional
    public FavoriteResponse create(Long memberId, CreateFavoriteRequest request) {
        var member = memberRepository.findById(memberId)
                .orElseThrow(() -> new ApiException(HttpStatus.NOT_FOUND, "MEMBER404_1", "해당 회원을 찾을 수 없습니다."));
        if (favoriteRepository.existsByMember_MemberIdAndMovieId(memberId, request.movieId())) {
            throw duplicate();
        }
        try {
            return FavoriteResponse.from(favoriteRepository.saveAndFlush(new Favorite(member, request.movieId())));
        } catch (DataIntegrityViolationException exception) {
            throw duplicate();
        }
    }

    private ApiException duplicate() {
        return new ApiException(HttpStatus.CONFLICT, "FAVORITE409_1", "이미 이 영화를 즐겨찾기하셨습니다.");
    }

    @Transactional(readOnly = true)
    public List<FavoriteResponse> getMyFavorites(Long memberId) {
        return favoriteRepository.findByMember_MemberIdOrderByFavoriteIdDesc(memberId).stream()
                .map(FavoriteResponse::from).toList();
    }

    @Transactional(readOnly = true)
    public FavoriteStatusResponse getStatus(Long memberId, Long movieId) {
        return new FavoriteStatusResponse(favoriteRepository.existsByMember_MemberIdAndMovieId(memberId, movieId));
    }

    @Transactional
    public void delete(Long memberId, Long movieId) {
        var favorite = favoriteRepository.findByMember_MemberIdAndMovieId(memberId, movieId)
                .orElseThrow(() -> new ApiException(HttpStatus.NOT_FOUND, "FAVORITE404_1", "즐겨찾기한 영화를 찾을 수 없습니다."));
        favoriteRepository.delete(favorite);
    }
}
