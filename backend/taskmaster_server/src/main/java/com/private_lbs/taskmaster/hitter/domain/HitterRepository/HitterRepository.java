package com.private_lbs.taskmaster.hitter.domain.HitterRepository;

import com.private_lbs.taskmaster.hitter.domain.Hitter;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface HitterRepository extends JpaRepository<Hitter, Long> {
    @Query("SELECT distinct h " +
            "FROM Hitter h " +
            "JOIN FETCH h.team t " +
            "JOIN FETCH h.bat b " +
            "LEFT JOIN FETCH b.favorite f " +
            "WHERE b.request.id = :requestId and MOD(b.inning,2) = :teamOrder " +
            "ORDER BY b.createDateTime")
    List<Hitter> getHittersInOrder(@Param("requestId") Long requestId, @Param("teamOrder") int teamOrder);

    @Query("SELECT distinct h " +
            "FROM Hitter h " +
            "JOIN FETCH h.team t " +
            "JOIN FETCH h.bat b " +
            "WHERE b.request.id = :requestId and MOD(b.inning,2) = :teamOrder " +
            "ORDER BY b.createDateTime")
    List<Hitter> getHittersStartLineUpInOrder(@Param("requestId") Long requestId, @Param("teamOrder") int teamOrder);
}
