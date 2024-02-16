package com.private_lbs.taskmaster.hitter.data.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
@AllArgsConstructor
public class TotalHittersResponse {
    private List<?> firstTeam;
    private List<?> secondTeam;

}
