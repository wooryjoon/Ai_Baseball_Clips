package com.private_lbs.taskmaster.request.domain;

import com.private_lbs.taskmaster.global.domain.BaseEntity;
import com.private_lbs.taskmaster.member.domain.Member;
import com.private_lbs.taskmaster.player.domain.Player;
import com.private_lbs.taskmaster.request.exception.RequestErrorCode;
import com.private_lbs.taskmaster.request.exception.RequestException;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

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

    private String url;

    @Column(length = 512)
    private String presignedUrl;

    public Request(Member member) {
        addRelatedMember(member);
        this.url = null;
        this.presignedUrl = null;
    }

    private void addRelatedMember(Member member) {
        this.member = member;
        member.getRequests().add(this);
    }

    public void setUrl(String url) {
        Optional.ofNullable(this.url).ifPresent(value -> {
            throw new RequestException(RequestErrorCode.ORIGIN_URL_ALREADY_ISSUED);
        });
        this.url = url;
    }

    public void setPresignedUrl(String presignedUrl) {
        Optional.ofNullable(this.presignedUrl).ifPresent(value -> {
            throw new RequestException(RequestErrorCode.PRESIGNED_URL_ALREADY_ISSUED);
        });
        this.presignedUrl = presignedUrl;
    }
}