package com.umc.study.member.controller;

import com.umc.study.auth.AuthInterceptor;
import com.umc.study.common.dto.ApiResponse;
import com.umc.study.member.dto.*;
import com.umc.study.member.service.MovieRecordService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
public class MovieRecordController {
    private final MovieRecordService movieRecordService;

    @PostMapping("/movie-records")
    public ResponseEntity<ApiResponse<MovieRecordResponse>> create(
            @RequestAttribute(AuthInterceptor.MEMBER_ID) Long memberId,
            @RequestBody @Valid CreateMovieRecordRequest request) {
        return ResponseEntity.status(201).body(ApiResponse.created("영화 기록을 저장했습니다.", movieRecordService.create(memberId, request)));
    }
}
