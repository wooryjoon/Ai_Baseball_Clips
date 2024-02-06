package com.private_lbs.taskmaster.processed_video.domain.repository;

import com.private_lbs.taskmaster.processed_video.data.dto.response.ProcessedVideoResponse;
import com.private_lbs.taskmaster.processed_video.domain.ProcessedVideo;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ProcessedVideoQueryRepository extends JpaRepository<ProcessedVideo, Long> {
    @Query("SELECT new com.private_lbs.taskmaster.processed_video.data.dto.response." +
            "ProcessedVideoResponse(pv.processedVideoUrl,pv.id ,COALESCE(f.isFavorite, false)) " +
            "FROM Player p INNER JOIN p.processedVideos pv LEFT JOIN pv.favorite f " +
            "WHERE p.id = :playerId " +
            "ORDER BY p.createDateTime")
    List<ProcessedVideoResponse> findVideosAndFavoritesByPlayerOrderByCreateDateTime(@Param("playerId") Long playerId);
}
