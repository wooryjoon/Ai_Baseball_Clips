package com.private_lbs.taskmaster.member.data.vo;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class JwtToken {

    private String accessToken;
    private String refreshToken;

    private JwtToken(String accessToken, String refreshToken) {
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
    }

    public static JwtToken of(String accessToken , String refreshToken){
        return new JwtToken(accessToken, refreshToken);
    }

}
