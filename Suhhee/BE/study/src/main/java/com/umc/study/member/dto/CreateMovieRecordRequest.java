package com.umc.study.member.dto;

import jakarta.validation.constraints.*;

public record CreateMovieRecordRequest(
        @NotNull(message = "영화 ID는 필수입니다.")
        @Positive(message = "영화 ID는 양수여야 합니다.") Long movieId,
        @NotNull(message = "별점은 필수입니다.")
        @Min(value = 1, message = "별점은 1점 이상이어야 합니다.")
        @Max(value = 5, message = "별점은 5점 이하여야 합니다.") Integer score,
        @Size(max = 500, message = "한줄평은 500자 이하여야 합니다.") String comment,
        @NotNull(message = "즐겨찾기 추가 여부는 필수입니다.") Boolean addToFavorites
) {}
