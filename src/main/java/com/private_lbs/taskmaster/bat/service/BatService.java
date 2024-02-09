package com.private_lbs.taskmaster.bat.service;

import com.private_lbs.taskmaster.bat.data.dto.response.ProcessedVideoByHitter;
import com.private_lbs.taskmaster.bat.data.dto.response.ProcessedVideoByInningHitters;
import com.private_lbs.taskmaster.bat.data.dto.response.HitterInfoWithInningInfo;
import com.private_lbs.taskmaster.bat.domain.repository.BatQueryRepository;
import com.private_lbs.taskmaster.hitter.domain.Hitter;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;
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

    public List<HitterInfoWithInningInfo> getProcessedVideoByTeamAndInning(long requestId, int inning) {

        // 경기에 출전한 타자의 정보 찾기 (중복된 이름)
        List<Object[]> hitters = batQueryRepository.getHitters(requestId, inning % 2);

        // 경기에 출전한 선수의 리스트 with 선택한 이닝에 타석에 들어선 선수는 processedVideo 정보도 저장
        List<HitterInfoWithInningInfo> HitterInfoWithInningInfos = new ArrayList<>();

        // HitterInfoWithInningInfos List 에 데이터를 담는 동안 중복 방지
        Set<Long> set = new HashSet<>();

        hitters.forEach(hitterArray -> {
            Hitter hitter = (Hitter) hitterArray[0];
            if (!set.contains(hitter.getId())) {
                HitterInfoWithInningInfos.add(HitterInfoWithInningInfo.builder()
                        .hitterId(hitter.getId())
                        .name(hitter.getName())
                        .position(hitter.getPosition())
                        .build());
                set.add(hitter.getId());
            }
        });

        // 선택한 이닝에 들어선 타석의 정보 가져오기
        List<ProcessedVideoByInningHitters> processedVideoByTeamAndInning = batQueryRepository
                .getProcessedVideoByTeamAndInning(requestId, inning);

        // 선택한 이닝에 들어선 타자의 타석의 정보를 전체 선수 List 에 등록된 선수 이름에 맞게 등록
        for (ProcessedVideoByInningHitters processedVideoByInningHitters : processedVideoByTeamAndInning) {
            Long hitterId = processedVideoByInningHitters.getHitterId();
            for (HitterInfoWithInningInfo HitterInfoWithInningInfo : HitterInfoWithInningInfos) {
                if (HitterInfoWithInningInfo.getHitterId() == hitterId) {
                    HitterInfoWithInningInfo.setHit(true);
                    HitterInfoWithInningInfo.setProcessedVideoUrl(processedVideoByInningHitters.getProcessedVideo());
                }
            }
        }
        return HitterInfoWithInningInfos;
    }
}
