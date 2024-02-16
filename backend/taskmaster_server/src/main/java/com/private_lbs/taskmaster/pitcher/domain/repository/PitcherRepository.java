package com.private_lbs.taskmaster.pitcher.domain.repository;

import com.private_lbs.taskmaster.pitcher.domain.Pitcher;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PitcherRepository extends JpaRepository<Pitcher, Long> {
}
