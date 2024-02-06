package com.private_lbs.taskmaster.processed_video.domain;

import com.private_lbs.taskmaster.global.domain.BaseEntity;
import com.private_lbs.taskmaster.player.domain.Player;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Entity
public class ProcessedVideo extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "processed_video_id", nullable = false)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    private Player player;

    @Size(max = 255)
    @NotNull
    private String processedVideoUrl;
    public ProcessedVideo(Player player, String processedVideoUrl) {
        addRelatedPlayer(player);
        this.processedVideoUrl = processedVideoUrl;
    }

    private void addRelatedPlayer(Player player) {
        this.player = player;
        player.getProcessedVideos().add(this);
    }
}