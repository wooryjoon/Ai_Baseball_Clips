package private_lbs.ai.bat.domain.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import private_lbs.ai.bat.domain.Bat;

public interface BatRepository extends JpaRepository<Bat, Long> {
}
