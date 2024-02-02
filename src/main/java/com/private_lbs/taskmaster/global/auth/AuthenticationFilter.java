package com.private_lbs.taskmaster.global.auth;

import io.jsonwebtoken.JwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.util.PatternMatchUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Slf4j
@Component
@RequiredArgsConstructor
public class AuthenticationFilter extends OncePerRequestFilter {

    private static final String TOKEN_HEADER = "Authorization";
    private final AuthenticationTokenResolver tokenResolver;

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain)
            throws ServletException, IOException {

        try {
            // 헤더에서 토큰 가져오기
            String token = extractTokenFromHeader(request);

            // 토큰 확인
            if (tokenResolver.isTokenNotExpired(token)) {
                throw new JwtException("Invalid token exception");
            }

            // 사용자 정보 thread local 에 저장
            Authentication authentication = tokenResolver.getAuthentication(token);
            AuthenticationContextHolder.setAuthentication(authentication);

        } catch (Exception e) {
            log.error(e.getMessage());
        }

        doFilter(request, response, filterChain);
        AuthenticationContextHolder.clearContext();
    }

    private String extractTokenFromHeader(HttpServletRequest request) {
        String authorization = request.getHeader(TOKEN_HEADER);
        if (authorization == null) {
            throw new IllegalArgumentException("Token not found");
        }
        try {
            return authorization.split(" ")[1];
        } catch (Exception e) {
            throw new IllegalArgumentException("Invalid token format");
        }
    }
}
