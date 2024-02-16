package com.private_lbs.taskmaster.S3.data.dto;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@RequiredArgsConstructor
public class UserData {
    private final String fileKey;
    private final Long memberId;
    private final Long requestId;
}
