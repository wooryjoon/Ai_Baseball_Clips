package com.private_lbs.taskmaster.global.auth;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class Authentication {

    long userId;
//    Role role;

    public static Authentication createEmptyAuthentication() {
        return new Authentication(-1L);
    }

//    role 추가시 사용
//    public static Authentication createEmptyAuthentication() {
//        return new Authentication(-1L, Role.GUEST);
//    }
}






