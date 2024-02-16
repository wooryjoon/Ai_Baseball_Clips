package com.private_lbs.taskmaster.global.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public class GlobalException extends RuntimeException {
    private final HttpStatus statusCode;
    private final String errorCode;
    private final String message;

    public GlobalException(ErrorCode errorCode) {
        this.statusCode = errorCode.getStatusCode();
        this.errorCode = errorCode.getErrorCode();
        this.message = errorCode.getMessage();
    }
}