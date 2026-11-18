package com.umc.study.member.dto;

import com.umc.study.member.entity.Favorite;
import java.time.LocalDateTime;

public record FavoriteResponse(Long favoriteId, Long movieId, LocalDateTime createdAt) {
    public static FavoriteResponse from(Favorite favorite) {
        return new FavoriteResponse(favorite.getFavoriteId(), favorite.getMovieId(), favorite.getCreatedAt());
    }
}
