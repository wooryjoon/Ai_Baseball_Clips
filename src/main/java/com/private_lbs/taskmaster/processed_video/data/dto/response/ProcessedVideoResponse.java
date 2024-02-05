package com.private_lbs.taskmaster.processed_video.data.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
@AllArgsConstructor
public class ProcessedVideoResponse {
    private String processedVideoUrl;
    private Long processedVideoId;
    private boolean isLike;
}
