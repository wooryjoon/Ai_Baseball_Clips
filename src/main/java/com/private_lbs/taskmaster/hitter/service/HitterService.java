package com.private_lbs.taskmaster.hitter.service;

import com.private_lbs.taskmaster.hitter.data.dto.HitterInfo;
import com.private_lbs.taskmaster.hitter.data.dto.HitterInfoWithInningProcessedVideo;
import com.private_lbs.taskmaster.hitter.data.dto.TotalHittersResponse;
import com.private_lbs.taskmaster.hitter.domain.HitterRepository.HitterRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class HitterService {

    private final HitterRepository hitterRepository;

    public TotalHittersResponse getHittersWithProcessedVideoByInning(long requestId, int inning) {

        return TotalHittersResponse.builder()
                .firstTeam(generateTeamHitters(requestId, 1, inning))
                .secondTeam(generateTeamHitters(requestId, 0, inning + 1))
                .build();
    }

    public TotalHittersResponse getHittersStartLineUp(long requestId) {

        return TotalHittersResponse.builder()
                .firstTeam(generateTeamStartLineUp(requestId, 1))
                .secondTeam(generateTeamStartLineUp(requestId, 0))
                .build();
    }


    private List<HitterInfoWithInningProcessedVideo> generateTeamHitters(long requestId, int teamOrder, int inning) {
        return hitterRepository.getHittersInOrder(requestId, teamOrder).stream()
                .map(h -> new HitterInfoWithInningProcessedVideo(h, inning))
                .toList();
    }

    private List<HitterInfo> generateTeamStartLineUp(long requestId, int inning) {
        return hitterRepository.getHittersStartLineUpInOrder(requestId, inning).stream()
                .limit(9)
                .map(HitterInfo::new)
                .toList();
    }
}
