package com.private_lbs.taskmaster.redis.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
//AI 모델 서버에서 pub 할 데이터를 담을 모델
public class RedisSubData {
    private String bucket;
    // 가공된 많은 영상의 url이 sub되므로 List로 구현
    private String fileKey;
}
