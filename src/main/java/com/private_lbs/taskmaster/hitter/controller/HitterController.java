package com.private_lbs.taskmaster.hitter.controller;

import com.private_lbs.taskmaster.global.auth.Auth;
import com.private_lbs.taskmaster.hitter.data.dto.TotalHittersResponse;
import com.private_lbs.taskmaster.hitter.service.HitterService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class HitterController {

    private final HitterService hitterService;

    @Auth
    @GetMapping("/{requestId}/hitters/list/processed-videos")
    public ResponseEntity<TotalHittersResponse> getHittersWithProcessedVideo(
            @PathVariable("requestId") long requestId) {

        return ResponseEntity.ok().body(hitterService.getHittersWithProcessedVideos(requestId));
    }

    @Auth
    @GetMapping("/{requestId}/hitter/list/{inning}/processed-video")
    public ResponseEntity<TotalHittersResponse> getHittersWithProcessedVideoByInning(
            @PathVariable("requestId") long requestId,
            @PathVariable("inning") int inning) {

        return ResponseEntity.ok(hitterService.getHittersWithProcessedVideoByInning(requestId, inning));
    }

    @Auth
    @GetMapping("/{requestId}/hitter/list/line-up")
    public ResponseEntity<TotalHittersResponse> getHittersStartLineUp(@PathVariable("requestId") long requestId) {

        return ResponseEntity.ok().body(hitterService.getHittersStartLineUp(requestId));
    }
}
