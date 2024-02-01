package com.private_lbs.taskmaster.global.auth;

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

        // 인가 가능 여부 체크
//        Authentication authentication = AuthenticationContextHolder.getAuthentication();
//        Role clientRole = authentication.getRole();
//        Role handlerRole = getMethodRole(handlerMethod);

//        if (!clientRole.hasAuthority(handlerRole)) {
//            throw new AuthenticationException(AuthenticationError.TOKEN_DIE);
//        }
//        AuthenticationContextHolder.setAuthentication(authentication);

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


