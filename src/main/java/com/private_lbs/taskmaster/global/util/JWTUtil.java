package com.private_lbs.taskmaster.global.util;

import com.private_lbs.taskmaster.member.domain.Member;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Component;

import java.io.UnsupportedEncodingException;
import java.util.Date;

@Component
@PropertySource("classpath:application-secret.yml")
public class JWTUtil {

    //  임시키
    @Value("${jwt.salt}")
    private String salt;

    @Value("${jwt.accessTokenExpireTime}")
    private long accessTokenExpireTime;

    //  AccessToken에 비해 유효기간을 길게 설정
    @Value("${jwt.refreshTokenExpireTime}")
    private long refreshTokenExpireTime;

    //	Signature 설정에 들어갈 key 생성.
    public byte[] generateKey() {
        byte[] key = null;
        try {
            // charset 설정 안하면 사용자 플랫폼의 기본 인코딩 설정으로 인코딩 됨
            key = salt.getBytes("UTF-8");
        } catch (UnsupportedEncodingException e) {
            throw new RuntimeException(e);
        }
        return key;
    }

    public String createAccessToken(Member member) {
        Long memberId = member.getId();

        Date now = new Date();
        Date validity = new Date(now.getTime() + accessTokenExpireTime);

        return Jwts.builder()
                .setSubject(memberId.toString())
                .setIssuedAt(now)
                .setExpiration(validity)
                .signWith(SignatureAlgorithm.HS256, generateKey())
                .compact();
    }

    public String createRefreshToken(String payload) {

        Date now = new Date();
        Date validity = new Date(now.getTime() + refreshTokenExpireTime);

        return Jwts.builder()
                .setSubject(payload)
                .setIssuedAt(now)
                .setExpiration(validity)
                .signWith(SignatureAlgorithm.HS256, generateKey())
                .compact();
    }

    public String getPayload(String token) {
        try {
            return Jwts.parser()
                    .setSigningKey(salt)
                    .parseClaimsJws(token)
                    .getBody()
                    .getSubject();
        } catch (ExpiredJwtException e) {
            return e.getClaims()
                    .getSubject();
        } catch (JwtException e) {
            throw new IllegalArgumentException("Invalid token");
        }
    }
}
