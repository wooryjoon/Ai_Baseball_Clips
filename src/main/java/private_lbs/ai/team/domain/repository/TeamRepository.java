package private_lbs.ai.team.domain.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import private_lbs.ai.team.domain.Team;

public interface TeamRepository extends JpaRepository<Team, Long> {
}
