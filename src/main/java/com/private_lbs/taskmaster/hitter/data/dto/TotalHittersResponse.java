package com.private_lbs.taskmaster.hitter.data.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;

@Getter
@AllArgsConstructor
public class TotalHittersResponse {

    private List<TeamHitters> firstTeam;
    private List<TeamHitters> secondTeam;

}
