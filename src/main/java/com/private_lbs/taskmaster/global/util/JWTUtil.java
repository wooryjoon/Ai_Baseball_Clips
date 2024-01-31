package com.private_lbs.taskmaster.global.util;

import com.private_lbs.taskmaster.member.data.vo.JwtToken;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
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
    private byte[] generateKey() {
        byte[] key = null;
        try {
            // charset 설정 안하면 사용자 플랫폼의 기본 인코딩 설정으로 인코딩 됨
            key = salt.getBytes("UTF-8");
        } catch (UnsupportedEncodingException e) {
            throw new RuntimeException(e);
        }
        return key;
    }

    public JwtToken createToken(String email) {
        return JwtToken.of(createAccessToken(email), createRefreshToken(email));
    }

    public String createAccessToken(String email) {
        return create(email, "access-token", accessTokenExpireTime);
    }

    public String createRefreshToken(String email) {
        return create(email, "refresh-token"
                , refreshTokenExpireTime);
    }


    //  Token 발급
    //  key : Claim에 셋팅될 key 값
    //	value : Claim에 셋팅 될 data 값
    //	subject : payload에 sub의 value로 들어갈 subject값
    //	expire : 토큰 유효기간 설정을 위한 값
    //	jwt 토큰의 구성 : header + payload + signature
    private String create(String email, String subject, long expireTime) {
        Claims claims = Jwts.claims()
                .setSubject(subject) // 토큰 제목 설정 ex) access-token, refresh-token
                .setIssuedAt(new Date()) // 생성일 설정
                .setExpiration(new Date(System.currentTimeMillis() + expireTime)); // 만료일 설정 (유효 기간)

        //  저장할 data의 key, value
        claims.put("email", email);

        String jwt = Jwts.builder()
                .setHeaderParam("typ", "JWT").setClaims(claims)
                .signWith(SignatureAlgorithm.HS256, this.generateKey())
                .compact();

        return jwt;
    }

    //  전달 받은 토큰이 제대로 생성된것인지 확인
    public boolean checkToken(String token) {
        System.out.println(token);
        try {
//			setSigningKey : JWS 서명 검증을 위한  secret key 세팅
//			parseClaimsJws : 파싱하여 원본 jws 만들기
            Jws<Claims> claims = Jwts.parser().setSigningKey(this.generateKey()).parseClaimsJws(token);
            return true;
        } catch (Exception e) {
            System.out.println("틀림");
            return false;
        }
    }
}
