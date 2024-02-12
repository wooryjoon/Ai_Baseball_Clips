package com.private_lbs.taskmaster.hitter.service;

import com.private_lbs.taskmaster.hitter.data.dto.TeamHitters;
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

        return new TotalHittersResponse(
                generateTeamHitters(requestId, 1, inning),
                generateTeamHitters(requestId, 0, inning + 1));
    }

    private List<TeamHitters> generateTeamHitters(long requestId, int teamOrder, int inning) {
        return hitterRepository.getHittersInOrder(requestId, teamOrder).stream()
                .map(h -> new TeamHitters(h, inning))
                .toList();
    }
}
