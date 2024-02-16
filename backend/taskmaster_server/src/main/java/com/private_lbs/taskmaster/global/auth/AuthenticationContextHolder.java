package com.private_lbs.taskmaster.global.auth;

public class AuthenticationContextHolder {

    private static final ThreadLocal<Authentication> authenticationHolder = new ThreadLocal<>();

    // threadLocal 삭제
    public static void clearContext() {
        authenticationHolder.remove();
    }

    public static Authentication getAuthentication() {
        Authentication authentication = authenticationHolder.get();
        if (authentication == null) {
            authentication = Authentication.createEmptyAuthentication();
            authenticationHolder.set(authentication);
        }
        return authentication;
    }

    public static void setAuthentication(Authentication authentication) {
        authenticationHolder.set(authentication);
    }

}
