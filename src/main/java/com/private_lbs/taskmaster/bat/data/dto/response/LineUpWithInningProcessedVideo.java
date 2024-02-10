package com.private_lbs.taskmaster.bat.data.dto.response;

import lombok.*;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class LineUpWithInningProcessedVideo {
    private String name;
    private String position;
    private String pitcherName;
    private boolean hit;
    private boolean favorite;
    private String processedVideo;

    public LineUpWithInningProcessedVideo(String name, String position) {
        this.name = name;
        this.position = position;
    }

    public void enrollProcessedVideo(ProcessedVideoByInningHitters processedVideoByInningHitters) {
        this.pitcherName = processedVideoByInningHitters.getPitcherName();
        this.favorite = processedVideoByInningHitters.getFavorite();
        this.processedVideo = processedVideoByInningHitters.getProcessedVideo();
        this.hit = true;


    }

}
