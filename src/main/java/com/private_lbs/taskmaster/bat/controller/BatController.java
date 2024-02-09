package com.private_lbs.taskmaster.bat.controller;

import com.private_lbs.taskmaster.bat.data.dto.response.ProcessedVideoByHitter;
import com.private_lbs.taskmaster.bat.data.dto.response.HitterInfoWithInningInfo;
import com.private_lbs.taskmaster.bat.service.BatService;
import com.private_lbs.taskmaster.global.auth.Auth;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
public class BatController {

    private final BatService batService;

    @Auth
    @GetMapping("/{request}/bat/hitters/processed-videos")
    public ResponseEntity<Map<String, List<ProcessedVideoByHitter>>> getProcessedVideosByHitters(@PathVariable("request") long requestId) {
        return ResponseEntity.ok().body(batService.getProcessedVideoByHitters(requestId));
    }

    @Auth
    @GetMapping("/{request}/bat/{inning}/processed-videos")
    public ResponseEntity<List<HitterInfoWithInningInfo>> getProcessedVideoByTeamAndInning
            (@PathVariable("request") long request,
             @PathVariable("inning") int inning) {
        return ResponseEntity.ok().body(batService.getProcessedVideoByTeamAndInning(request, inning));
    }
}
