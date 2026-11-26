package com.umc.movie.controller;

import com.umc.movie.config.SwaggerConfig;
import com.umc.movie.dto.*;
import com.umc.movie.interceptor.AuthInterceptor;
import com.umc.movie.service.FavoriteService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.ExampleObject;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequiredArgsConstructor
@Tag(name = "즐겨찾기", description = "로그인한 회원의 영화 즐겨찾기 API")
@SecurityRequirement(name = SwaggerConfig.BEARER_AUTH)
public class FavoriteController {
    private final FavoriteService favoriteService;

    @Operation(
            summary = "즐겨찾기 등록",
            description = "토큰의 주인인 회원이 TMDB 영화 ID 하나를 즐겨찾기에 추가합니다."
    )
    @ApiResponses({
            @io.swagger.v3.oas.annotations.responses.ApiResponse(
                    responseCode = "201", description = "즐겨찾기 등록 성공",
                    content = @Content(mediaType = "application/json", examples = @ExampleObject(value = """
                            {
                              "isSuccess": true,
                              "code": "COMMON201",
                              "message": "즐겨찾기를 등록했습니다.",
                              "result": { "favoriteId": 1, "movieId": 550, "createdAt": "2026-09-13T21:00:00" }
                            }
                            """))),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(
                    responseCode = "401", description = "토큰이 없거나 유효하지 않음",
                    content = @Content(mediaType = "application/json", examples = @ExampleObject(value = """
                            {
                              "isSuccess": false,
                              "code": "AUTH401_2",
                              "message": "로그인이 필요한 요청입니다.",
                              "result": null
                            }
                            """))),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(
                    responseCode = "409", description = "이미 즐겨찾기한 영화",
                    content = @Content(mediaType = "application/json", examples = @ExampleObject(value = """
                            {
                              "isSuccess": false,
                              "code": "FAVORITE409_1",
                              "message": "이미 이 영화를 즐겨찾기하셨습니다.",
                              "result": null
                            }
                            """)))
    })
    @PostMapping("/favorites")
    public ResponseEntity<ApiResponse<FavoriteResponse>> create(
            @RequestAttribute(AuthInterceptor.MEMBER_ID) Long memberId,
            @RequestBody @Valid CreateFavoriteRequest request) {
        return ResponseEntity.status(201).body(ApiResponse.created(
                "즐겨찾기를 등록했습니다.", favoriteService.create(memberId, request)));
    }

    @GetMapping("/favorites")
    @Operation(
            summary = "내 즐겨찾기 조회",
            description = "로그인한 회원이 즐겨찾기한 영화 목록을 최신순으로 조회합니다."
    )
    @ApiResponses({
            @io.swagger.v3.oas.annotations.responses.ApiResponse(
                    responseCode = "200", description = "즐겨찾기 목록 조회 성공"),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(
                    responseCode = "401", description = "토큰이 없거나 유효하지 않음 (AUTH401_2/AUTH401_3/AUTH401_4)")
    })
    public ResponseEntity<ApiResponse<List<FavoriteResponse>>> getMyFavorites(
            @RequestAttribute(AuthInterceptor.MEMBER_ID) Long memberId) {
        return ResponseEntity.ok(ApiResponse.ok(
                "내 즐겨찾기 목록을 조회했습니다.", favoriteService.getMyFavorites(memberId)));
    }

    @GetMapping("/favorites/{movieId}")
    @Operation(
            summary = "즐겨찾기 여부 조회",
            description = "로그인한 회원이 특정 TMDB 영화를 즐겨찾기했는지 조회합니다."
    )
    @ApiResponses({
            @io.swagger.v3.oas.annotations.responses.ApiResponse(
                    responseCode = "200", description = "즐겨찾기 여부 조회 성공"),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(
                    responseCode = "401", description = "토큰이 없거나 유효하지 않음 (AUTH401_2/AUTH401_3/AUTH401_4)")
    })
    public ResponseEntity<ApiResponse<FavoriteStatusResponse>> getStatus(
            @RequestAttribute(AuthInterceptor.MEMBER_ID) Long memberId, @PathVariable Long movieId) {
        return ResponseEntity.ok(ApiResponse.ok(
                "즐겨찾기 여부를 조회했습니다.", favoriteService.getStatus(memberId, movieId)));
    }

    @DeleteMapping("/favorites/{movieId}")
    @Operation(
            summary = "즐겨찾기 해제",
            description = "로그인한 회원이 특정 TMDB 영화의 즐겨찾기를 해제합니다."
    )
    @ApiResponses({
            @io.swagger.v3.oas.annotations.responses.ApiResponse(
                    responseCode = "200", description = "즐겨찾기 해제 성공"),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(
                    responseCode = "401", description = "토큰이 없거나 유효하지 않음 (AUTH401_2/AUTH401_3/AUTH401_4)"),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(
                    responseCode = "404", description = "즐겨찾기를 찾을 수 없음 (FAVORITE404_1)")
    })
    public ResponseEntity<ApiResponse<Void>> delete(
            @RequestAttribute(AuthInterceptor.MEMBER_ID) Long memberId, @PathVariable Long movieId) {
        favoriteService.delete(memberId, movieId);
        return ResponseEntity.ok(ApiResponse.ok("즐겨찾기를 해제했습니다.", null));
    }
}
