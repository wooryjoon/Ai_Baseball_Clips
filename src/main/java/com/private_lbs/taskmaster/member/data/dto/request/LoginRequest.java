package com.private_lbs.taskmaster.member.data.dto.request;

import com.private_lbs.taskmaster.member.entity.Member;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor

public class LoginRequest {

    @Email(message = "이메일 형식이 아닙니다.")
    @NotNull(message = "이메일을 입력하세요.")
    private String email;

    @NotNull(message = "패스워드를 입력해주세요.")
    private String password;

    public Member toMember() {
        return Member.builder()
                .email(email)
                .password(password)
                .build();
    }

}
