package com.private_lbs.taskmaster.favorite.domain.repository;

import com.private_lbs.taskmaster.favorite.data.dto.response.FavoriteProcessedVideo;
import com.private_lbs.taskmaster.favorite.domain.Favorite;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface FavoriteQueryRepository extends JpaRepository<Favorite, Long> {
    @Query("SELECT new com.private_lbs.taskmaster.favorite.data.dto.response." +
            "FavoriteProcessedVideo(b.processedVideo,b.hitter.name, b.pitcher.name,f.isFavorite) " +
            "FROM Favorite f " +
            "INNER JOIN f.bat b " +
            "INNER JOIN b.hitter h " +
            "WHERE f.member.id = :memberId")
    List<FavoriteProcessedVideo> findVideoLinkAndPlayerNameAndFavoriteByUserId(@Param("memberId") Long memberId);
}
