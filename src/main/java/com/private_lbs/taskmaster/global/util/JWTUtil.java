package com.private_lbs.taskmaster.global.util;

import com.private_lbs.taskmaster.member.data.vo.JwtToken;
import com.private_lbs.taskmaster.member.entity.Member;
import io.jsonwebtoken.Claims;
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

    public JwtToken createToken(Member member) {
        return JwtToken.of(createAccessToken(member.getId()), createRefreshToken(member.getId()));
    }

    public String createAccessToken(Long id) {
        return create(id, accessTokenExpireTime);
    }

    public String createRefreshToken(Long id) {
        return create(id, refreshTokenExpireTime);
    }


    //  Token 발급
    //  key : Claim에 셋팅될 key 값
    //	value : Claim에 셋팅 될 data 값
    //	subject : payload에 sub의 value로 들어갈 subject값
    //	expire : 토큰 유효기간 설정을 위한 값
    //	jwt 토큰의 구성 : header + payload + signature
    private String create(Long id, long expireTime) {
        Claims claims = Jwts.claims()
                .setSubject(id.toString()) // 토큰 제목 설정 ex) access-token, refresh-token
                .setIssuedAt(new Date()) // 생성일 설정
                .setExpiration(new Date(System.currentTimeMillis() + expireTime)); // 만료일 설정 (유효 기간)

        String jwt = Jwts.builder()
                .setHeaderParam("type", "JWT").setClaims(claims)
                .signWith(SignatureAlgorithm.HS256, this.generateKey())
                .compact();

        return jwt;
    }
}
