package com.private_lbs.taskmaster.redis.domain;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

// 요청 처리 서버에서 Redis로 pub 할 데이터를 담을 Model

public class RedisPubData {
    private String fileKey;
    private String bucketName;
}
