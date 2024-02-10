package com.private_lbs.taskmaster.bat.data.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class ProcessedVideoByInningHitters {
    private String processedVideo;
    private Long hitterId;
    private String pitcherName;
    private Boolean Favorite;
}

