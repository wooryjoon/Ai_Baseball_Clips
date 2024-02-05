package com.private_lbs.taskmaster.favorite.data.dto.response;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class ProcessedVideoFavorite {
    private String processedVideoUrl;
    private String playerName;
    private boolean isLike;
}
