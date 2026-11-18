package com.umc.study.member.controller;

import com.umc.study.auth.AuthInterceptor;
import com.umc.study.common.dto.ApiResponse;
import com.umc.study.member.dto.*;
import com.umc.study.member.service.FavoriteService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequiredArgsConstructor
public class FavoriteController {
    private final FavoriteService favoriteService;

    @PostMapping("/favorites")
    public ResponseEntity<ApiResponse<FavoriteResponse>> create(
            @RequestAttribute(AuthInterceptor.MEMBER_ID) Long memberId,
            @RequestBody @Valid CreateFavoriteRequest request) {
        return ResponseEntity.status(201).body(ApiResponse.created("즐겨찾기를 등록했습니다.", favoriteService.create(memberId, request)));
    }

    @GetMapping("/favorites")
    public ApiResponse<List<FavoriteResponse>> list(@RequestAttribute(AuthInterceptor.MEMBER_ID) Long memberId) {
        return ApiResponse.ok("내 즐겨찾기 목록을 조회했습니다.", favoriteService.getMyFavorites(memberId));
    }

    @GetMapping("/favorites/{movieId}")
    public ApiResponse<FavoriteStatusResponse> status(@RequestAttribute(AuthInterceptor.MEMBER_ID) Long memberId,
                                                    @PathVariable Long movieId) {
        return ApiResponse.ok("즐겨찾기 여부를 조회했습니다.", favoriteService.getStatus(memberId, movieId));
    }

    @DeleteMapping("/favorites/{movieId}")
    public ApiResponse<Void> delete(@RequestAttribute(AuthInterceptor.MEMBER_ID) Long memberId,
                                   @PathVariable Long movieId) {
        favoriteService.delete(memberId, movieId);
        return ApiResponse.ok("즐겨찾기를 해제했습니다.", null);
    }
}
