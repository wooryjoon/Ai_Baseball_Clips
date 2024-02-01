package com.private_lbs.taskmaster.player.domain.repository;

import com.private_lbs.taskmaster.player.domain.Player;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PlayerRepository extends JpaRepository<Player, Long> {
}
