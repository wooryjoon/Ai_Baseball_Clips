package com.private_lbs.taskmaster.Redis.Service;

import com.private_lbs.taskmaster.Redis.Model.RedisPubData;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class RedisPubService {
    private final RedisTemplate<String, Object> redisTemplate;
    // Redis ch1로 pub
    public void sendMessage(RedisPubData redispubdata){
        redisTemplate.convertAndSend("ch1",redispubdata);
    }
}
