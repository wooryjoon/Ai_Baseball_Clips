package com.private_lbs.taskmaster.hitter.service;

import com.private_lbs.taskmaster.hitter.data.dto.HitterInfo;
import com.private_lbs.taskmaster.hitter.data.dto.HitterInfoWithInningProcessedVideo;
import com.private_lbs.taskmaster.hitter.data.dto.TotalHittersResponse;
import com.private_lbs.taskmaster.hitter.domain.HitterRepository.HitterRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

import static com.private_lbs.taskmaster.hitter.data.dto.Order.FIRST_TEAM;
import static com.private_lbs.taskmaster.hitter.data.dto.Order.SECOND_TEAM;

@Service
@RequiredArgsConstructor
public class HitterService {

    private final HitterRepository hitterRepository;

    public TotalHittersResponse getHittersWithProcessedVideoByInning(long requestId, int inning) {

        return TotalHittersResponse.builder()
                .firstTeam(generateTeamHitters(requestId, FIRST_TEAM.getOrder(), inning))
                .secondTeam(generateTeamHitters(requestId, SECOND_TEAM.getOrder(), inning + 1))
                .build();
    }

    public TotalHittersResponse getHittersStartLineUp(long requestId) {

        return TotalHittersResponse.builder()
                .firstTeam(generateTeamStartLineUp(requestId, FIRST_TEAM.getOrder()))
                .secondTeam(generateTeamStartLineUp(requestId, SECOND_TEAM.getOrder()))
                .build();
    }


    public TotalHittersResponse getHittersWithProcessedVideos(long requestId) {

        return TotalHittersResponse.builder()
                .firstTeam(generateTeamHitters(requestId, FIRST_TEAM.getOrder()))
                .secondTeam(generateTeamHitters(requestId, SECOND_TEAM.getOrder()))
                .build();
    }

    private List<HitterInfoWithInningProcessedVideo> generateTeamHitters(long requestId, int teamOrder) {
        return hitterRepository.getHittersInOrder(requestId, teamOrder).stream()
                .map(HitterInfoWithInningProcessedVideo::new)
                .toList();
    }


    private List<HitterInfoWithInningProcessedVideo> generateTeamHitters(long requestId, int teamOrder, int inning) {
        return hitterRepository.getHittersInOrder(requestId, teamOrder).stream()
                .map(h -> new HitterInfoWithInningProcessedVideo(h, inning))
                .toList();
    }

    private List<HitterInfo> generateTeamStartLineUp(long requestId, int teamOrder) {
        return hitterRepository.getHittersStartLineUpInOrder(requestId, teamOrder).stream()
                .limit(9)
                .map(HitterInfo::new)
                .toList();
    }

}
