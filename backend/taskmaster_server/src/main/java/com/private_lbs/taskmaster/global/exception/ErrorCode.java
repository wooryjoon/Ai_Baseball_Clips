package com.private_lbs.taskmaster.global.exception;

import org.springframework.http.HttpStatus;

public interface ErrorCode {
    HttpStatus getStatusCode();

    String getErrorCode();

    String getMessage();
}
