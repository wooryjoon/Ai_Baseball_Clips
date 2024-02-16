package com.private_lbs.taskmaster.global.auth;

import com.private_lbs.taskmaster.global.auth.exception.AuthenticationErrorCode;
import com.private_lbs.taskmaster.global.auth.exception.AuthenticationException;
import com.private_lbs.taskmaster.member.domain.Role;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import java.util.Objects;

@Component
public class AuthenticationInterceptor implements HandlerInterceptor {

    @Override
    public boolean preHandle(
            HttpServletRequest request,
            HttpServletResponse response,
            Object handler) {

        // 형변환 가능한지 확인
        if (!(handler instanceof HandlerMethod handlerMethod)) {
            return true;
        }

        // 권한이 필요한 메서드인지 확인
        if (isNeedsAuthorization(handlerMethod)) {
            return true;
        }

        Authentication authentication = AuthenticationContextHolder.getAuthentication();
        long userId = authentication.getUserId();
        if (userId == -1) {
            throw new AuthenticationException(AuthenticationErrorCode.TOKEN_IS_NOT_VALID);
        }
        return true;
    }

    @Override
    public void postHandle(
            HttpServletRequest request,
            HttpServletResponse response,
            Object handler,
            ModelAndView modelAndView
    ) {
        AuthenticationContextHolder.clearContext();
    }

    private Role getMethodRole(HandlerMethod handlerMethod) {
        return Objects.requireNonNull(handlerMethod.getMethodAnnotation(Auth.class))
                .role();
    }

    private boolean isNeedsAuthorization(HandlerMethod handlerMethod) {
        return handlerMethod.getMethodAnnotation(Auth.class) == null;
    }
}


