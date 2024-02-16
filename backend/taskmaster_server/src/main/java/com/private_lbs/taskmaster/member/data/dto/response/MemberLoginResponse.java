package com.private_lbs.taskmaster.member.data.dto.response;

import com.private_lbs.taskmaster.member.domain.Member;
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

    private MemberLoginResponse(Member member, String accessToken, String refreshToken) {
        this.id = member.getId();
        this.email = member.getEmail();
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
    }

    public static MemberLoginResponse of(Member member, String accessToken, String refreshToken) {
        return new MemberLoginResponse(member, accessToken, refreshToken);
    }
}
