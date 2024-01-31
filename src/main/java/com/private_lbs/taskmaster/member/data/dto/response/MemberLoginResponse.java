package com.private_lbs.taskmaster.member.data.dto.response;

import com.private_lbs.taskmaster.member.data.vo.JwtToken;
import com.private_lbs.taskmaster.member.entity.Member;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class MemberLoginResponse {

    private Long id;
    private String email;
    private String accessToken;
    private String refreshToken;

    private MemberLoginResponse(Member member, JwtToken jwtToken) {
        this.id = member.getId();
        this.email = member.getEmail();
        this.accessToken = jwtToken.getAccessToken();
        this.refreshToken = jwtToken.getRefreshToken();
    }

    public static MemberLoginResponse of(Member member, JwtToken jwtToken) {
        return new MemberLoginResponse(member, jwtToken);
    }
}
