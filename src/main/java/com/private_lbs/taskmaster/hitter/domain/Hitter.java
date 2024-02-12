package com.private_lbs.taskmaster.hitter.domain;

import com.private_lbs.taskmaster.bat.domain.Bat;
import com.private_lbs.taskmaster.global.domain.BaseEntity;
import com.private_lbs.taskmaster.team.domain.Team;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Hitter extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "hitter_id", nullable = false)
    private long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "team_id")
    private Team team;

    @OneToMany(mappedBy = "hitter", fetch = FetchType.LAZY)
    private List<Bat> bat = new ArrayList<>();

    private String name;

    private String position;

//    private String imageUrl;

    public Hitter(Team team, String name, String position) {
        this.team = team;
        this.name = name;
        this.position = position;
    }

}
