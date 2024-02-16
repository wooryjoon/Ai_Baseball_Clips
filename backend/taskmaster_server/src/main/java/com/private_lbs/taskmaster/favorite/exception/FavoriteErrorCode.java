package com.private_lbs.taskmaster.favorite.exception;

import com.private_lbs.taskmaster.global.exception.ErrorCode;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public enum FavoriteErrorCode implements ErrorCode {

    IS_ALREADY_FAVORITE(HttpStatus.CONFLICT, "Favorite_01", "이미 좋아요를 표시했습니다."),
    IS_ALREADY_NOT_FAVORITE(HttpStatus.CONFLICT, "Favorite_02", "이미 좋아요 표시가 아닙니다.");

    private final HttpStatus statusCode;
    private final String errorCode;
    private final String message;

    FavoriteErrorCode(HttpStatus statusCode, String errorCode, String message) {
        this.statusCode = statusCode;
        this.errorCode = errorCode;
        this.message = message;
    }
}
