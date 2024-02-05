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

    @Column(name = "favorite")
    @ColumnDefault("false")
    private boolean favorite;

    public Favorite(Member member, ProcessedVideo processedVideo) {
        addMember(member);
        this.processedVideo = processedVideo;
    }

    public void addMember(Member member) {
        member.getFavorites().add(this);
    }
}
