package com.private_lbs.taskmaster.favorite.domain;

import com.private_lbs.taskmaster.global.domain.BaseEntity;
import com.private_lbs.taskmaster.member.domain.Member;
import com.private_lbs.taskmaster.processed_video.domain.ProcessedVideo;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Getter
@Entity
@Builder
public class Favorite extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "like_id", nullable = false)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "processed_video_id")
    private ProcessedVideo processedVideo;

    @Column(name = "is_favorite")
    @ColumnDefault("false")
    private boolean isFavorite;

    public Favorite(Member member, ProcessedVideo processedVideo) {
        addMember(member);
        addProcessedVideo(processedVideo);
    }

    public void addMember(Member member) {
        this.member = member;
        member.getFavorites().add(this);
    }

    public void addProcessedVideo(ProcessedVideo processedVideo) {
        this.processedVideo = processedVideo;
        processedVideo.addFavorite(this);
    }

    public void changeFavoriteStatus() {
        isFavorite = !isFavorite;
    }
}
