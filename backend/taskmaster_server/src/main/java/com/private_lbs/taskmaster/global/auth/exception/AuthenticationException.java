package com.private_lbs.taskmaster.global.auth.exception;

import com.private_lbs.taskmaster.global.exception.ErrorCode;
import com.private_lbs.taskmaster.global.exception.GlobalException;
import io.jsonwebtoken.JwtException;

public class AuthenticationException extends GlobalException {
    public AuthenticationException(ErrorCode errorCode) {
        super(errorCode);
    }
}
