package com.private_lbs.taskmaster.bat.controller;

import com.private_lbs.taskmaster.bat.data.dto.response.HitterNameAndImage;
import com.private_lbs.taskmaster.bat.data.dto.response.TeamInfo;
import com.private_lbs.taskmaster.bat.service.BatService;
import com.private_lbs.taskmaster.global.auth.Auth;
import jakarta.validation.Valid;
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
    @GetMapping("/{requestId}/bat/team")
    public ResponseEntity<TeamInfo> getTeamInfo(@Valid @PathVariable("requestId") long requestId) {
        return ResponseEntity.ok().body(batService.getTeamInfo(requestId));
    }

    @Auth
    @GetMapping("/{requestId}/bat/time-line")
    public ResponseEntity<Map<String, List<HitterNameAndImage>>> getTimeLine(
            @Valid @PathVariable("requestId") long requestId) {
        return ResponseEntity.ok().body(batService.getTimeLine(requestId));
    }
}
