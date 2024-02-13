package private_lbs.ai.pitcher.domain;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import private_lbs.ai.team.domain.Team;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Pitcher {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "pitcher_id", nullable = false)
    private long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "team_id")
    private Team team;

    private String name;

    private String position;

}

