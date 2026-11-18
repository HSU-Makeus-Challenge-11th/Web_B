package com.umc.study.member.repository;

import com.umc.study.member.entity.Favorite;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface FavoriteRepository extends JpaRepository<Favorite, Long> {
    List<Favorite> findByMember_MemberIdOrderByFavoriteIdDesc(Long memberId);
    Optional<Favorite> findByMember_MemberIdAndMovieId(Long memberId, Long movieId);
    boolean existsByMember_MemberIdAndMovieId(Long memberId, Long movieId);
}
