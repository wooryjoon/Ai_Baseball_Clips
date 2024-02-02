package com.private_lbs.taskmaster.player.domain;

import com.private_lbs.taskmaster.processed_video.domain.ProcessedVideo;
import com.private_lbs.taskmaster.request.domain.Request;
import com.private_lbs.taskmaster.global.domain.BaseEntity;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Entity
public class Player extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "player_id", nullable = false)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    private Request request;

    @OneToMany(mappedBy = "player", fetch = FetchType.LAZY)
    private List<ProcessedVideo> processedVideos = new ArrayList<>();

    @Size(max = 50)
    @NotNull
    @Column(length = 50)
    private String name;

    public Player(Request request, String name) {
        addRelatedRequest(request);
        this.name = name;
    }

    private void addRelatedRequest(Request request) {
        this.request = request;
        request.getPlayers().add(this);
    }

}