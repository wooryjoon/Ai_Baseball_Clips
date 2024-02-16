package com.private_lbs.taskmaster.member.exception;

import com.private_lbs.taskmaster.global.exception.ErrorCode;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public enum MemberErrorCode implements ErrorCode {

    EMAIL_IS_NOT_VALID(HttpStatus.BAD_REQUEST, "MEMBER_01", "유효하지 않은 이메일 형식입니다."),
    EMAIL_ALREADY_EXISTS(HttpStatus.BAD_REQUEST, "MEMBER_02", "존재하는 이메일입니다."),
    PHONE_NUMBER_ALREADY_EXISTS(HttpStatus.BAD_REQUEST, "MEMBER_03", "존재하는 전화번호입니다."),
    LOGIN_FAILED(HttpStatus.BAD_REQUEST, "MEMBER_04", "잘못된 비밀 번호 입니다."),
    MEMBER_DOES_NOT_EXISTS(HttpStatus.BAD_REQUEST, "MEMBER_05", "존재하지 않는 회원입니다.");

    private final HttpStatus statusCode;
    private final String errorCode;
    private final String message;

    MemberErrorCode(HttpStatus statusCode, String errorCode, String message) {
        this.statusCode = statusCode;
        this.errorCode = errorCode;
        this.message = message;
    }
}
