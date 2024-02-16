package com.private_lbs.taskmaster.global.auth.exception;

import com.private_lbs.taskmaster.global.exception.ErrorCode;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public enum AuthenticationErrorCode implements ErrorCode {

    TOKEN_IS_NOT_VALID(HttpStatus.FORBIDDEN, "TOKEN_01", "다시 로그인 해주세요");

    private final HttpStatus statusCode;
    private final String errorCode;
    private final String message;

    AuthenticationErrorCode(HttpStatus statusCode, String errorCode, String message) {
        this.statusCode = statusCode;
        this.errorCode = errorCode;
        this.message = message;
    }
}
