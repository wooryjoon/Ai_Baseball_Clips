package com.private_lbs.taskmaster.global.auth;

import com.private_lbs.taskmaster.global.util.JWTUtil;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
@RequiredArgsConstructor
@Slf4j
public class AuthenticationTokenResolver {

    private final JWTUtil jwtUtil;
//    private static final String ROLE_CLAIM_NAME = "role";

    public Authentication getAuthentication(String token) {
        Claims claims = getClaims(token);


        String subject = claims.getSubject();
        long userId = Long.parseLong(subject);
//        String roleStr = claims.get(ROLE_CLAIM_NAME)
//                .toString();
//        Role role = Role.valueOf(roleStr);
        return new Authentication(userId);
    }


    // 토큰의 정보를 가져와서 만료시간을 확인
    public boolean isTokenNotExpired(String token) {
        return getClaims(token)
                .getExpiration()
                .before(new Date());
    }

    // Jwt 토큰의 Claim 을 가져오기
    public Claims getClaims(String token) {
        Claims claims = null;
        try {
            claims = Jwts.parser()
                    .setSigningKey(jwtUtil.generateKey())
                    .parseClaimsJws(token)
                    .getBody();
        } catch (Exception e) {
            log.error(e.getMessage());
            throw new IllegalArgumentException();
        }
        return claims;
    }
}
