package com.private_lbs.taskmaster.processed_video.exception;

import com.private_lbs.taskmaster.global.exception.ErrorCode;
import com.private_lbs.taskmaster.global.exception.GlobalException;

public class ProcessedVideoException extends GlobalException {
    public ProcessedVideoException(ErrorCode errorCode) {
        super(errorCode);
    }
}
