package com.private_lbs.taskmaster.member.data.dto.request;

import lombok.*;

@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class TokenRefreshRequest {

    String accessToken;
    String refreshToken;

}
