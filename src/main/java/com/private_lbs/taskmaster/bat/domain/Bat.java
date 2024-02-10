package com.private_lbs.taskmaster.bat.domain;

import com.private_lbs.taskmaster.global.domain.BaseEntity;
import com.private_lbs.taskmaster.hitter.domain.Hitter;
import com.private_lbs.taskmaster.pitcher.domain.Pitcher;
import com.private_lbs.taskmaster.request.domain.Request;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Entity
public class Bat extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "bat_id", nullable = false)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "request_id")
    private Request request;

    private String processedVideo;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "hitter_id")
    private Hitter hitter;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "pitcher_id")
    private Pitcher pitcher;

    private int inning;

    public Bat(Request request, Hitter hitter, Pitcher pitcher, int inning, String processedVideo) {
        addRelatedRequest(request);
        this.hitter = hitter;
        this.pitcher = pitcher;
        this.inning = inning;
        this.processedVideo = processedVideo;
    }

    private void addRelatedRequest(Request request) {
        this.request = request;
        request.getBats().add(this);
    }

}