package com.private_lbs.taskmaster.request.exception;

import com.private_lbs.taskmaster.global.exception.ErrorCode;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public enum RequestErrorCode implements ErrorCode {
    ORIGIN_URL_ALREADY_ISSUED(HttpStatus.BAD_REQUEST, "REDIS_01", "URL이 이미 발급되었습니다.."),
    PRESIGNED_URL_ALREADY_ISSUED(HttpStatus.BAD_REQUEST, "REDIS_02", "presigned URL이 이미 발급되었습니다.");

    private final HttpStatus statusCode;
    private final String errorCode;
    private final String message;

    RequestErrorCode(HttpStatus statusCode, String errorCode, String message) {
        this.statusCode = statusCode;
        this.errorCode = errorCode;
        this.message = message;
    }
}
