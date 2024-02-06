package com.private_lbs.taskmaster.processed_video.data.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Builder
@Getter
@AllArgsConstructor
public class ProcessedVideoFromPlayer {
    private String playerName;
    private List<ProcessedVideoResponse> processedVideoResponses;
}
