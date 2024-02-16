package com.private_lbs.taskmaster.favorite.data.dto.response;

import com.private_lbs.taskmaster.bat.domain.Bat;
import com.private_lbs.taskmaster.hitter.data.dto.HitterInfo;
import com.private_lbs.taskmaster.pitcher.domain.data.dto.PitcherInfo;
import lombok.Getter;

import java.time.LocalDate;

@Getter
public class FavoriteProcessedVideo {
    private long batId;
    private LocalDate createDateTime;
    private String processedVideoUrl;
    private boolean favorite;
    private HitterInfo hitterInfo;
    private PitcherInfo pitcherInfo;

    public FavoriteProcessedVideo(Bat bat) {
        batId = bat.getId();
        createDateTime = bat.getCreateDateTime().toLocalDate();
        processedVideoUrl = bat.getProcessedVideo();
        favorite = bat.getFavorite().isFavorite();
        hitterInfo = new HitterInfo(bat.getHitter());
        pitcherInfo = new PitcherInfo(bat.getPitcher());
    }
}
