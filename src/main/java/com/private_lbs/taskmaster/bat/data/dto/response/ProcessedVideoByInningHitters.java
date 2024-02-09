package com.private_lbs.taskmaster.bat.data.dto.response;

import lombok.Getter;

@Getter
public class ProcessedVideoByInningHitters {
    private String processedVideo;
    private Long hitterId;
    private String pitcherName;
    private Boolean isFavorite;

    public ProcessedVideoByInningHitters(String processedVideo, Long hitterId, String pitcherName, Boolean isFavorite) {
        this.processedVideo = processedVideo;
        this.hitterId = hitterId;
        this.pitcherName = pitcherName;
        this.isFavorite = isFavorite;
    }

}

