package com.private_lbs.taskmaster.bat.data.dto.response;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Builder
@Getter
@Setter
public class HitterInfoWithInningInfo {

    private long hitterId;
    private String name;
    private String position;
    private boolean favorite;
    private boolean isHit;
    private String processedVideoUrl;

}
