package private_lbs.ai.pitcher.domain.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import private_lbs.ai.pitcher.domain.Pitcher;



public interface PitcherRepository extends JpaRepository<Pitcher, Long> {

}
