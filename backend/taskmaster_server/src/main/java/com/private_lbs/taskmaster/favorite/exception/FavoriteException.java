package com.private_lbs.taskmaster.favorite.exception;

import com.private_lbs.taskmaster.global.exception.ErrorCode;
import com.private_lbs.taskmaster.global.exception.GlobalException;

public class FavoriteException extends GlobalException {
    public FavoriteException(ErrorCode errorCode) {
        super(errorCode);
    }
}
