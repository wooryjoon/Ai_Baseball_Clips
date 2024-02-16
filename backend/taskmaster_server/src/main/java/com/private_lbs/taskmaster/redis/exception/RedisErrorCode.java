package com.private_lbs.taskmaster.redis.exception;

import com.private_lbs.taskmaster.global.exception.ErrorCode;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public enum RedisErrorCode implements ErrorCode {
    MESSAGE_RECEIVE_FAILED(HttpStatus.INTERNAL_SERVER_ERROR, "REDIS_01", "메시지 수신을 실패하였습니다.");

    private final HttpStatus statusCode;
    private final String errorCode;
    private final String message;

    RedisErrorCode(HttpStatus statusCode, String errorCode, String message) {
        this.statusCode = statusCode;
        this.errorCode = errorCode;
        this.message = message;
    }
}
