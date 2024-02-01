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

    // 필터가 적용하지 않을 url
    private final String[] whiteList = {"/member/check-email/*", "/member/login", "/member/join"};

    // 필터가 적용하지 않을 url 일 경우 필터 적용 x
    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
        String path = request.getServletPath();
        log.info("요청 주소 = " + path);
        return PatternMatchUtils.simpleMatch(whiteList, path);
    }

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain)
            throws ServletException, IOException {

        try {
            // 헤더에서 토큰 가져오기
            String token = extractTokenFromHeader(request);

            log.info("{} ", token);

            // 토큰 확인
            if (tokenResolver.isTokenNotExpired(token)) {
                throw new JwtException("Invalid token exception");
            }
            // 인가 가능 여부 체크

            Authentication authentication = tokenResolver.getAuthentication(token);
            AuthenticationContextHolder.setAuthentication(authentication);

        } catch (Exception e) {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            return;
        }

        doFilter(request, response, filterChain);
        AuthenticationContextHolder.clearContext();
    }

    private String extractTokenFromHeader(HttpServletRequest request) {
        String authorization = request.getHeader(TOKEN_HEADER);
        if (authorization == null) {
            log.info("Token not found");
            throw new IllegalArgumentException();
        }
        try {
            return authorization.split(" ")[1];
        } catch (Exception e) {
            log.info("Invalid token format");
            throw new IllegalArgumentException();
        }
    }
}
