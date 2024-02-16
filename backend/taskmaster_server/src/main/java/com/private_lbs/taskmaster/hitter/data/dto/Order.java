package com.private_lbs.taskmaster.hitter.data.dto;

import lombok.Getter;

@Getter
public enum Order {

    FIRST_TEAM(1),
    SECOND_TEAM(0);

    private final int order;

    Order(int order) {
        this.order = order;
    }
}
