package com.private_lbs.taskmaster.request.exception;

import com.private_lbs.taskmaster.global.exception.ErrorCode;
import com.private_lbs.taskmaster.global.exception.GlobalException;

public class RequestException extends GlobalException {
    public RequestException(ErrorCode errorCode) {
        super(errorCode);
    }
}
