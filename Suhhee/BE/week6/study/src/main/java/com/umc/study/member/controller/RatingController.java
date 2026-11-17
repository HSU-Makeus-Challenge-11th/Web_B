package com.umc.study.member.controller;

import com.umc.study.common.dto.ApiResponse;
import com.umc.study.member.dto.CreateRatingRequest;
import com.umc.study.member.dto.RatingResponse;
import com.umc.study.member.dto.UpdateRatingRequest;
import com.umc.study.member.service.RatingService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/members")
public class RatingController {

    private final RatingService ratingService;

    @GetMapping("/{memberId}/ratings")
    public ApiResponse<List<RatingResponse>> getMemberRatings(@PathVariable Long memberId) {
        return ApiResponse.ok(
                "회원 평점 조회에 성공했습니다.",
                ratingService.getRatingsByMember(memberId)
        );
    }

    @PostMapping("/{memberId}/ratings")
    public ResponseEntity<ApiResponse<Long>> create(
            @PathVariable Long memberId,
            @Valid @RequestBody CreateRatingRequest request
    ) {
        Long ratingId = ratingService.create(memberId, request);
        return ResponseEntity.status(201)
                .body(ApiResponse.created("평점 등록에 성공했습니다.", ratingId));
    }

    @PatchMapping("/{memberId}/ratings/{ratingId}")
    public ApiResponse<Void> update(
            @PathVariable Long memberId,
            @PathVariable Long ratingId,
            @Valid @RequestBody UpdateRatingRequest request
    ) {
        ratingService.update(ratingId, memberId, request);
        return ApiResponse.ok("평점 수정에 성공했습니다.", null);
    }

    @DeleteMapping("/{memberId}/ratings/{ratingId}")
    public ResponseEntity<Void> delete(
            @PathVariable Long memberId,
            @PathVariable Long ratingId
    ) {
        ratingService.delete(ratingId, memberId);
        return ResponseEntity.noContent().build();
    }
}
