package com.private_lbs.taskmaster.player.domain.repository;

import com.private_lbs.taskmaster.player.domain.Player;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface PlayerRepository extends JpaRepository<Player, Long> {
    @Query("select p from Player p where p.request.id = :requestId")
    List<Player> findPlayer(@Param("requestId") long requestId);
}
