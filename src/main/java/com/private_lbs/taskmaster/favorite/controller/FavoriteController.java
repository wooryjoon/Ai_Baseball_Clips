package com.private_lbs.taskmaster.favorite.controller;

import com.private_lbs.taskmaster.favorite.data.dto.request.FavoriteRequest;
import com.private_lbs.taskmaster.favorite.data.dto.response.FavoriteProcessedVideo;
import com.private_lbs.taskmaster.favorite.service.FavoriteService;
import com.private_lbs.taskmaster.global.auth.Auth;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController("/favorite")
@RequiredArgsConstructor
public class FavoriteController {

    private final FavoriteService favoriteService;

    @Auth
    @PostMapping("/updateStatus")
    public ResponseEntity<Void> updateFavoriteStatus(@Valid @RequestBody FavoriteRequest favoriteRequest) {
        favoriteService.updateFavoriteStatus(favoriteRequest);
        return ResponseEntity.ok().build();
    }

    @Auth
    @GetMapping("/list")
    public ResponseEntity<List<FavoriteProcessedVideo>> getLikeList() {
        return ResponseEntity.ok().body(favoriteService.getLikeList());
    }

}
