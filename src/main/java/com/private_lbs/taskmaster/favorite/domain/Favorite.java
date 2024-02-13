package com.private_lbs.taskmaster.favorite.domain;

import com.private_lbs.taskmaster.bat.domain.Bat;
import com.private_lbs.taskmaster.global.domain.BaseEntity;
import com.private_lbs.taskmaster.member.domain.Member;
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
    @Column(name = "favorite_id", nullable = false)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "bat_id")
    private Bat bat;

    @Column(name = "is_favorite")
    @ColumnDefault("false")
    private boolean isFavorite;

    public Favorite(Member member, Bat bat) {
        addMember(member);
        addFavorite(bat);
    }

    public void addMember(Member member) {
        this.member = member;
        member.getFavorites().add(this);
    }

    public void addFavorite(Bat bat) {
        this.bat = bat;
        bat.makeFavorite(this);
    }

    public void changeFavoriteStatus() {
        isFavorite = !isFavorite;
    }
}
