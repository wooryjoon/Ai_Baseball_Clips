package com.private_lbs.taskmaster.bat.data.dto.response;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class TeamInfo {

    private String firstTeamName;
    private String firstTeamImageUrl;
    private String secondTeamName;
    private String secondTeamImageUrl;

}
