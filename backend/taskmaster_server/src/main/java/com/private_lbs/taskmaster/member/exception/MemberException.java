package com.private_lbs.taskmaster.member.exception;

import com.private_lbs.taskmaster.global.exception.ErrorCode;
import com.private_lbs.taskmaster.global.exception.GlobalException;

public class MemberException extends GlobalException {
    public MemberException(ErrorCode errorCode) {
        super(errorCode);
    }
}
