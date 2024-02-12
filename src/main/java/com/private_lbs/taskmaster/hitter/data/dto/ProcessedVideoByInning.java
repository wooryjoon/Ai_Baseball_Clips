package com.private_lbs.taskmaster.hitter.data.dto;

import com.private_lbs.taskmaster.bat.domain.Bat;
import com.private_lbs.taskmaster.favorite.domain.Favorite;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class ProcessedVideoByInning {

    private String processedVideoUrl;
    private String pitcherName;
    private boolean favorite;

    public ProcessedVideoByInning(Bat bat) {
        processedVideoUrl = bat.getProcessedVideo();
        pitcherName = bat.getPitcher().getName();
        favorite = isFavorite(bat.getFavorite());
    }

    private boolean isFavorite(Favorite favorite) {
        return favorite != null;
    }

}
