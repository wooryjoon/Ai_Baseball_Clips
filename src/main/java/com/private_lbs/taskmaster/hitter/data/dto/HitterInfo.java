package com.private_lbs.taskmaster.hitter.data.dto;

import com.private_lbs.taskmaster.hitter.domain.Hitter;
import lombok.Data;

@Data
public class HitterInfo {

    private long hitterId;
    private String name;
    private String position;

    public HitterInfo(Hitter hitter) {
        this.hitterId = hitter.getId();
        this.name = hitter.getName();
        this.position = hitter.getPosition();
    }
}
