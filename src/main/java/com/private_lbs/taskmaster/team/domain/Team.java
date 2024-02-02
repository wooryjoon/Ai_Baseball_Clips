package com.private_lbs.taskmaster.team.domain;

import com.private_lbs.taskmaster.global.domain.BaseEntity;
import com.private_lbs.taskmaster.total_player.domain.TotalPlayer;
import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@RequiredArgsConstructor
@Getter
@Entity
public class Team extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "team_id", nullable = false)
    private Long id;

    @OneToMany(mappedBy = "team", fetch = FetchType.LAZY)
    private List<TotalPlayer> totalPlayers = new ArrayList<>();

    @Size(max = 50)
    @NonNull
    @Column(length = 50)
    private String name;

}