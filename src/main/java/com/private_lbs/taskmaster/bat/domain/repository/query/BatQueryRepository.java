package com.private_lbs.taskmaster.bat.domain.repository.query;

import com.private_lbs.taskmaster.bat.data.dto.response.HitterNameAndImage;
import com.private_lbs.taskmaster.bat.domain.Bat;
import com.private_lbs.taskmaster.hitter.domain.Hitter;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface BatQueryRepository extends JpaRepository<Bat, Long> {
    @Query("SELECT b.hitter " +
            "FROM Bat b " +
            "JOIN b.request r " +
            "WHERE r.id = :requestId AND MOD(b.inning, 2) = :inning " +
            "ORDER BY b.createDateTime"
    )
    List<Hitter> getHitters(@Param("requestId") long requestId, @Param("inning") int inning);

    @Query("SELECT new com.private_lbs.taskmaster.bat.data.dto.response.HitterNameAndImage (b.inning, h.name, h.imageUrl) " +
            "FROM Bat b JOIN Hitter h ON b.hitter = h " +
            "WHERE b.request.id = :requestId ORDER BY b.inning, b.createDateTime")
    List<HitterNameAndImage> getTimeLine(@Param("requestId") long requestId);

}

