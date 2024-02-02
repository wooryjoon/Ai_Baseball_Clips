package com.private_lbs.taskmaster.total_player.domain;

import com.private_lbs.taskmaster.global.domain.BaseEntity;
import com.private_lbs.taskmaster.team.domain.Team;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Entity
public class TotalPlayer extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "total_player_id", nullable = false)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    private Team team;

    @NotNull
    @Column(length = 100)
    private String name;

    public TotalPlayer(Team team, String name) {
        addRelatedTeam(team);
        this.name = name;
    }

    private void addRelatedTeam(Team team) {
        this.team = team;
        team.getTotalPlayers().add(this);
    }
}
