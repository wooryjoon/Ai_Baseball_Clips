package com.private_lbs.taskmaster.bat.service;

import com.private_lbs.taskmaster.bat.data.dto.response.HitterNameAndImage;
import com.private_lbs.taskmaster.bat.data.dto.response.TeamInfo;
import com.private_lbs.taskmaster.bat.domain.repository.query.BatQueryRepository;
import com.private_lbs.taskmaster.hitter.domain.Hitter;
import com.private_lbs.taskmaster.hitter.domain.HitterRepository.HitterRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BatService {

    private final BatQueryRepository batQueryRepository;
    private final HitterRepository hitterRepository;

    // 경기에 팀 정보 가져오기
    public TeamInfo getTeamInfo(long requestId) {


        List<Hitter> firstTeamHitters = batQueryRepository.getHitters(requestId, 1);
        List<Hitter> secondTeamHitters = batQueryRepository.getHitters(requestId, 0);

        return TeamInfo.builder()
                .firstTeamName(firstTeamHitters.get(0).getTeam().getName())
                .firstTeamImageUrl(firstTeamHitters.get(0).getTeam().getImageUrl())
                .secondTeamName(secondTeamHitters.get(0).getTeam().getName())
                .secondTeamImageUrl(secondTeamHitters.get(0).getTeam().getImageUrl())
                .build();
    }

    public Map<Integer, List<HitterNameAndImage>> getTimeLine(long requestId) {
        return batQueryRepository.getTimeLine(requestId).stream()
                .collect(Collectors
                        .groupingBy(HitterNameAndImage::getInning));
    }
}
