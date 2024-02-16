package com.private_lbs.taskmaster.hitter.data.dto;

import com.private_lbs.taskmaster.hitter.domain.Hitter;
import lombok.Data;

@Data
public class HitterInfo {

    private long hitterId;
    private String imageUrl;
    private String name;
    private String position;
    private String teamName;

    public HitterInfo(Hitter hitter) {
        hitterId = hitter.getId();
        name = hitter.getName();
        position = hitter.getPosition();
        teamName = hitter.getTeam().getName();
        imageUrl = hitter.getImageUrl();
    }
}
