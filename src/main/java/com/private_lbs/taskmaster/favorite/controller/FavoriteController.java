package com.private_lbs.taskmaster.favorite.controller;

import com.private_lbs.taskmaster.global.auth.Auth;
import com.private_lbs.taskmaster.favorite.data.dto.request.FavoriteCancelRequest;
import com.private_lbs.taskmaster.favorite.data.dto.request.FavoriteRequest;
import com.private_lbs.taskmaster.favorite.data.dto.response.ProcessedVideoFavorite;
import com.private_lbs.taskmaster.favorite.service.FavoriteService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController("/favorite")
@RequiredArgsConstructor
public class FavoriteController {

    private final FavoriteService favoriteService;

    @Auth
    @PostMapping("/like")
    public ResponseEntity<Void> like(@Valid @RequestBody FavoriteRequest likeRequest) {
        favoriteService.like(likeRequest);
        return ResponseEntity.ok().build();
    }


    @Auth
    @DeleteMapping("/dislike")
    public ResponseEntity<Void> dislike(@Valid @RequestBody FavoriteCancelRequest dislikeRequest) {
        favoriteService.dislike(dislikeRequest);
        return ResponseEntity.ok().build();
    }

    @Auth
    @GetMapping("like/list")
    public ResponseEntity<List<ProcessedVideoFavorite>> getLikeList() {
        return ResponseEntity.ok().body(favoriteService.getLikeList());
    }

}
