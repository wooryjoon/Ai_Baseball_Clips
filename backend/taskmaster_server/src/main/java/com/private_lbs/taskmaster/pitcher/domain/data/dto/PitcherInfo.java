package com.private_lbs.taskmaster.pitcher.domain.data.dto;

import com.private_lbs.taskmaster.pitcher.domain.Pitcher;
import lombok.Getter;

@Getter
public class PitcherInfo {

    private long pitcherId;
    private String name;
    private String position;
    private String teamName;

    public PitcherInfo(Pitcher pitcher) {
        pitcherId = pitcher.getId();
        name = pitcher.getName();
        position = pitcher.getPosition();
        teamName = pitcher.getTeam().getName();
    }

}
