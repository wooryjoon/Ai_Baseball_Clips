package com.private_lbs.taskmaster.favorite.domain.repository;

import com.private_lbs.taskmaster.member.domain.Member;
import com.private_lbs.taskmaster.favorite.domain.Favorite;
import com.private_lbs.taskmaster.processed_video.domain.ProcessedVideo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface FavoriteRepository extends JpaRepository<Favorite, Long> {
    Optional<Favorite> findLikeByMemberAndProcessedVideo(Member member, ProcessedVideo processedVideo);
}
