package com.private_lbs.taskmaster.processed_video.domain.repository;

import com.private_lbs.taskmaster.processed_video.domain.ProcessedVideo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProcessedVideoRepository extends JpaRepository<ProcessedVideo, Long> {
}
