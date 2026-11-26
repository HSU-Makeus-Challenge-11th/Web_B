package com.umc.movie.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record UpdateRatingRequest(
        @Schema(description = "수정할 별점(1점 이상 5점 이하)", example = "4")
        @NotNull(message = "별점을 입력해주세요.")
        @Min(value = 1, message = "별점은 1점 이상이어야 합니다.")
        @Max(value = 5, message = "별점은 5점 이하여야 합니다.")
        Integer score,
        @Schema(description = "수정할 500자 이하의 선택 후기", example = "다시 보니 더 좋았어요.")
        @Size(max = 500, message = "후기는 500자 이하로 입력해주세요.")
        String comment
) {}
