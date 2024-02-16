package com.private_lbs.taskmaster.team.domain.repository;

import com.private_lbs.taskmaster.team.domain.Team;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TeamRepository extends JpaRepository<Team, Long> {
}
