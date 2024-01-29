package com.private_lbs.taskmaster.member.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "refresh_token")
public class RefreshToken {

    @Id
    @GeneratedValue
    @Column(name = "refresh_token_id")
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @Column(name = "refresh_token_info")
    private String refreshToken;

    public RefreshToken toEntity(Member member, String refreshToken) {
        return RefreshToken.builder()
                .member(member)
                .refreshToken(refreshToken)
                .build();
    }
}
