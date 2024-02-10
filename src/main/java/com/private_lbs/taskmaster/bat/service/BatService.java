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

    public Map<String, List<ProcessedVideoByHitter>> getProcessedVideoByHitters(long requestId) {
        return batQueryRepository.findProcessedVideosByHitter(requestId).stream()
                .collect(Collectors
                        .groupingBy(ProcessedVideoByHitter::getHitterName));
    }

    public List<LineUpWithInningProcessedVideo> getProcessedVideoByInning(long requestId, int inning) {

        // 경기에 출전한 선수의 리스트
        List<Hitter> hitters = getTeamLineUp(requestId, inning);
        // 선택한 이닝에 들어선 타석의 정보 hitterId를 key 로 설정해 Map 구조로 변경
        Map<Long, ProcessedVideoByInningHitters> groupByHitterId =
                batQueryRepository
                        .getProcessedVideoByTeamAndInning(requestId, inning)
                        .stream()
                        .collect(
                                Collectors.toMap(
                                        ProcessedVideoByInningHitters::getHitterId,
                                        Function.identity()
                                )
                        );

        List<LineUpWithInningProcessedVideo> lineUpWithInningProcessedVideos = new ArrayList<>();
        for (Hitter hitter : hitters) {
            LineUpWithInningProcessedVideo lineUpWithInningProcessedVideo
                    = new LineUpWithInningProcessedVideo(hitter.getName(), hitter.getPosition());

            ProcessedVideoByInningHitters processedVideoByInningHitters = groupByHitterId.get(hitter.getId());
            if (processedVideoByInningHitters != null) {
                lineUpWithInningProcessedVideo.enrollProcessedVideo(processedVideoByInningHitters);
            }
            lineUpWithInningProcessedVideos.add(lineUpWithInningProcessedVideo);
        }
        return lineUpWithInningProcessedVideos;
    }


    private List<Hitter> getTeamLineUp(long requestId, int inning) {
        return batQueryRepository.getHitters(requestId, inning % 2).stream()
                .collect(Collectors.collectingAndThen(
                        Collectors.toCollection(LinkedHashSet::new),
                        ArrayList::new
                ));
    }

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
