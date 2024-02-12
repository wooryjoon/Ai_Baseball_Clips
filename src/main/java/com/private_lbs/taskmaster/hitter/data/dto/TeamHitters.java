package com.private_lbs.taskmaster.hitter.data.dto;

import com.private_lbs.taskmaster.hitter.domain.Hitter;
import lombok.Getter;

import java.util.List;
import java.util.stream.Collectors;

@Getter
public class TeamHitters {

    private String name;
    private String imageUrl;
    private String position;
    List<ProcessedVideoByInning> processedVideoByInnings;

    public TeamHitters(Hitter hitter, int inning) {
        name = hitter.getName();
        imageUrl = "이미지";
        position = hitter.getPosition();
        processedVideoByInnings = hitter.getBat().stream()
                .filter(b -> compareRequestedInning(b.getInning(), inning))
                .map(ProcessedVideoByInning::new)
                .collect(Collectors.toList());
    }

    private boolean compareRequestedInning(int inning, int requestInning) {
        return inning == requestInning;
    }

}
