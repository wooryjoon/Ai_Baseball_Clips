package com.private_lbs.taskmaster.redis.exception;

import com.private_lbs.taskmaster.global.exception.ErrorCode;
import com.private_lbs.taskmaster.global.exception.GlobalException;

public class RedisException extends GlobalException {
    public RedisException(ErrorCode errorCode) {
        super(errorCode);
    }
}
