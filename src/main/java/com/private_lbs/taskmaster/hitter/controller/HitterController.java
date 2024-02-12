package com.private_lbs.taskmaster.hitter.controller;

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

    @GetMapping("/{requestId}/hitter/list/{inning}/processed-video")
    public ResponseEntity<TotalHittersResponse> getHittersWithProcessedVideoByInning(
            @PathVariable("requestId") long requestId,
            @PathVariable("inning") int inning) {
        return ResponseEntity.ok(hitterService.getHittersWithProcessedVideoByInning(requestId, inning));
    }

    @GetMapping("/{requestId}/hitter/list/line-up")
    public ResponseEntity<?> getHittersStartLineUp(@PathVariable("requestId") long requestId) {
        return ResponseEntity.ok().body(hitterService.getHittersStartLineUp(requestId));
    }
}
