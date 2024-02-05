package com.private_lbs.taskmaster.favorite.data.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class FavoriteRequest {

    @NotNull
    private long processedVideoId;

}
