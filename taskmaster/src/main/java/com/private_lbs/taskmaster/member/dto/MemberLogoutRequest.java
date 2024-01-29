package com.private_lbs.taskmaster.member.dto;

import com.private_lbs.taskmaster.member.entity.Member;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Getter
public class MemberLogoutRequest {

    private Long id;

    public Member toMember() {
        return Member.builder()
                .id(id)
                .build();
    }
}
