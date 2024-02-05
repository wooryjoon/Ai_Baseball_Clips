package com.private_lbs.taskmaster.processed_video.data.dto.response;

import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Builder
@Getter
public class ProcessedVideoFromPlayer {
    private String playerName;
    private List<ProcessedVideoResponse> processedVideoResponses;
}
