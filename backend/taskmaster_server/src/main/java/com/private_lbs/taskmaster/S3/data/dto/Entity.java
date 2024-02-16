package com.private_lbs.taskmaster.S3.data.dto;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class Entity {
    private Bucket bucket;
    private Object object;
}