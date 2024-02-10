package com.private_lbs.taskmaster.bat.data.dto.response;

import com.private_lbs.taskmaster.hitter.domain.Hitter;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Builder
@Getter
public class LineUp {
    private List<Hitter> firstTeam;
    private List<Hitter> secondTeam;
}