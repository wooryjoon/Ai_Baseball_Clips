package com.private_lbs.taskmaster.processed_video.controller;

import com.private_lbs.taskmaster.global.auth.Auth;
import com.private_lbs.taskmaster.processed_video.data.dto.response.ProcessedVideoFromPlayer;
import com.private_lbs.taskmaster.processed_video.service.ProcessedVideoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/processed-video")
@RequiredArgsConstructor
public class ProcessedVideoController {

    private final ProcessedVideoService processedVideoService;

    @Auth
    @GetMapping("/{request_id}")
    public ResponseEntity<List<ProcessedVideoFromPlayer>> getProcessedVideos(@PathVariable("request_id") Long request) {
        return ResponseEntity.ok().body(processedVideoService.getPlayerProcessedVideo(request));
    }
}
