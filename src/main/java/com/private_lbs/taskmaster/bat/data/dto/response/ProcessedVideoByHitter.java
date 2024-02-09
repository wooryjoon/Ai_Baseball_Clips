package com.private_lbs.taskmaster.bat.data.dto.response;

import lombok.Getter;

@Getter
public class ProcessedVideoByHitter {
    private String processedVideo;
    private String hitterName;
    private String pitcherName;
    private String inning;
    private boolean favorite;

    public ProcessedVideoByHitter(String processedVideo, String hitterName, String pitcherName, int inning, boolean favorite) {
        this.processedVideo = processedVideo;
        this.hitterName = hitterName;
        this.pitcherName = pitcherName;
        this.inning = check(inning);
        this.favorite = favorite;
    }

    private String check(int inning) {
        if ((inning % 2) == 0) {
            return inning / 2 + "회 말";
        }
        return inning / 2 + 1 + "회 초";
    }
}