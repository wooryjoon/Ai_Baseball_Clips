package com.private_lbs.taskmaster.bat.domain.repository.query;

import com.private_lbs.taskmaster.bat.data.dto.response.HitterNameAndImage;
import com.private_lbs.taskmaster.bat.data.dto.response.ProcessedVideoByInningHitters;
import com.private_lbs.taskmaster.bat.data.dto.response.ProcessedVideoByHitter;
import com.private_lbs.taskmaster.bat.domain.Bat;
import com.private_lbs.taskmaster.hitter.domain.Hitter;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface BatQueryRepository extends JpaRepository<Bat, Long> {
    @Query("SELECT new com.private_lbs.taskmaster.bat.data.dto.response" +
            ".ProcessedVideoByHitter(b.processedVideo, h.name, p.name, b.inning, COALESCE(f.isFavorite, false))" +
            " FROM Bat b " +
            "JOIN b.request r " +
            "JOIN b.hitter h " +
            "JOIN b.pitcher p " +
            "LEFT JOIN Favorite f ON b = f.bat " +
            "WHERE r.id = :requestId " +
            "ORDER BY b.inning")
    List<ProcessedVideoByHitter> findProcessedVideosByHitter(@Param("requestId") Long requestId);

    @Query("SELECT new com.private_lbs.taskmaster.bat.data.dto.response." +
            "ProcessedVideoByInningHitters(b.processedVideo, h.id, p.name, COALESCE(f.isFavorite,false)) " +
            "FROM Bat b " +
            "JOIN b.request r " +
            "JOIN b.pitcher p " +
            "JOIN b.hitter h " +
            "LEFT JOIN Favorite f ON b = f.bat " +
            "WHERE b.inning = :inning AND r.id = :requestId")
    List<ProcessedVideoByInningHitters> getProcessedVideoByTeamAndInning(
            @Param("requestId") long requestId,
            @Param("inning") int inning);


    @Query("SELECT b.hitter " +
            "FROM Bat b " +
            "JOIN b.request r " +
            "WHERE r.id = :requestId AND MOD(b.inning, 2) = :inning " +
            "ORDER BY b.createDateTime"
    )
    List<Hitter> getHitters(@Param("requestId") long requestId, @Param("inning") int inning);

    @Query("SELECT new com.private_lbs.taskmaster.bat.data.dto.response.HitterNameAndImage (b.inning, h.name) " +
            "FROM Bat b JOIN Hitter h ON b.hitter = h " +
            "WHERE b.request.id = :requestId ORDER BY b.inning, b.createDateTime")
    List<HitterNameAndImage> getTimeLine(@Param("requestId") long requestId);

}

