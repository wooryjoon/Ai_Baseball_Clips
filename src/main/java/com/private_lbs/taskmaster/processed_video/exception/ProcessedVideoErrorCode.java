package com.private_lbs.taskmaster.processed_video.exception;

import com.private_lbs.taskmaster.global.exception.ErrorCode;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public enum ProcessedVideoErrorCode implements ErrorCode {

    PROCESSED_VIDEO_IS_NOT_FOUNT(HttpStatus.NOT_FOUND, "Processed_Video_01", "존재하지 않는 영상입니다.");

    private final HttpStatus statusCode;
    private final String errorCode;
    private final String message;

    ProcessedVideoErrorCode(HttpStatus statusCode, String errorCode, String message) {
        this.statusCode = statusCode;
        this.errorCode = errorCode;
        this.message = message;
    }
}
