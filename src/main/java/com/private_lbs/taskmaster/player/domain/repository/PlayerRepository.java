package com.private_lbs.taskmaster.player.domain.repository;

import com.private_lbs.taskmaster.player.domain.Player;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PlayerRepository extends JpaRepository<Player, Long> {
    List<Player> findPlayerByRequestId(Long requestId);
}
