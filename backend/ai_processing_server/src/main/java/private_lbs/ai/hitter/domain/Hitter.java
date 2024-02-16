package private_lbs.ai.hitter.domain;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import private_lbs.ai.team.domain.Team;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Hitter {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "hitter_id", nullable = false)
    private long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "team_id")
    private Team team;

    private String name;

    private String position;

}

