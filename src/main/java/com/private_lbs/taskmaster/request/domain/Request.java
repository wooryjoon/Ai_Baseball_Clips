package com.private_lbs.taskmaster.request.domain;

import com.private_lbs.taskmaster.global.domain.BaseEntity;
import com.private_lbs.taskmaster.member.domain.Member;
import com.private_lbs.taskmaster.player.domain.Player;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Request extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "request_id", nullable = false)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @OneToMany(mappedBy = "request", fetch = FetchType.LAZY)
    private List<Player> players = new ArrayList<>();

    @NotNull
    private String url;

    private String presignedUrl;

    @Builder
    public Request(Member member, String url) {
        addRelatedMember(member);
        this.url = url;
    }

    private void addRelatedMember(Member member) {
        this.member = member;
        member.getRequests().add(this);
    }

}