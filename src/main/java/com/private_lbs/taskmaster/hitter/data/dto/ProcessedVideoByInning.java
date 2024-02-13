package com.private_lbs.taskmaster.hitter.data.dto;

import com.private_lbs.taskmaster.bat.domain.Bat;
import com.private_lbs.taskmaster.favorite.domain.Favorite;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class ProcessedVideoByInning {

    private long batId;
    private String processedVideoUrl;
    private String pitcherName;
    private String inning;
    private boolean favorite;

    public ProcessedVideoByInning(Bat bat) {
        batId = bat.getId();
        processedVideoUrl = bat.getProcessedVideo();
        pitcherName = bat.getPitcher().getName();
        inning = getInning(bat.getInning());
        favorite = isFavorite(bat.getFavorite());
    }

    private boolean isFavorite(Favorite favorite) {
        return favorite != null;
    }

    private String getInning(int inning) {
        if (inning % 2 == 1) {
            return inning / 2 + 1 + "회 초";
        } else {
            return inning / 2 + "회 말";
        }
    }
}
