package com.private_lbs.taskmaster.member.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum Role {

    USER("ROLE_USER", 1),
    GUEST("ROLE_GUEST", 2);

    private final String role;
    private final int priority;

    public boolean hasAuthority(Role required) {
        return required.priority >= this.priority;
    }
}
