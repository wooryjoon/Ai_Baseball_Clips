package com.private_lbs.taskmaster.bat.service;

import com.private_lbs.taskmaster.bat.data.dto.response.*;
import com.private_lbs.taskmaster.bat.domain.repository.BatQueryRepository;
import com.private_lbs.taskmaster.hitter.domain.Hitter;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BatService {

    private final BatQueryRepository batQueryRepository;

    // 경기에 팀 정보 가져오기
    public TeamInfo getTeamInfo(long requestId) {

        List<Hitter> firstTeamHitters = batQueryRepository.getHitters(requestId, 1);
        List<Hitter> secondTeamHitters = batQueryRepository.getHitters(requestId, 0);

        return TeamInfo.builder()
                .firstTeamName(firstTeamHitters.get(0).getTeam().getName())
                .secondTeamName(secondTeamHitters.get(0).getTeam().getName())
                .build();
    }

    public Map<Integer, List<HitterNameAndImage>> getTimeLine(long requestId) {
        return batQueryRepository.getTimeLine(requestId).stream()
                .collect(Collectors
                        .groupingBy(HitterNameAndImage::getInning));
    }

    public LineUp getTeamStartLineUp(long requestId) {

        List<Hitter> firstTeam = getTeamLineUp(requestId, 1);
        List<Hitter> secondTeam = getTeamLineUp(requestId, 0);

        return LineUp.builder()
                .firstTeam(firstTeam.subList(0, 9))
                .secondTeam(secondTeam.subList(0, 9))
                .build();
    }
}
