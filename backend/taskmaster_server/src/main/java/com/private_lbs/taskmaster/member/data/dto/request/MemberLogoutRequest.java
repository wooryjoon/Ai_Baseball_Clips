package com.private_lbs.taskmaster.member.data.dto.request;

import com.private_lbs.taskmaster.member.domain.Member;
import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Getter
public class MemberLogoutRequest {

    @NotNull(message = "잘못된 요청")
    private Long id;
    public Member toMember() {
        return Member.builder()
                .id(id)
                .build();
    }
}
