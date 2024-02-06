package com.private_lbs.taskmaster.processed_video.domain.repository;

import com.private_lbs.taskmaster.player.domain.Player;
import com.private_lbs.taskmaster.processed_video.domain.ProcessedVideo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProcessedVideoRepository extends JpaRepository<ProcessedVideo, Long> {
    List<ProcessedVideo> findProcessedVideoListByPlayer(Player player);
}
