package com.private_lbs.taskmaster.redis.service;

import com.private_lbs.taskmaster.S3.data.vo.OriginUrl;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class RedisPubService {
    private final RedisTemplate<String, Object> redisTemplate;


    /**
     * @author boyjo
     * @date 2/3/24
     * @method sendMessage
     * @param originUrl: 원본 url
     * @description AI 서버가 SUB중인 Redis ch1 채널로 메시지 PUB
     **/
    public void sendMessage(OriginUrl originUrl){
        //TODO: url은 차후, 설정한 프로토콜에 맞춰 메시지로 수정해야 함
        redisTemplate.convertAndSend("ch1", originUrl);
        log.info(originUrl.toString());
    }

    public void sendMessage(String message){
        //TODO: url은 차후, 설정한 프로토콜에 맞춰 메시지로 수정해야 함
        redisTemplate.convertAndSend("ch3", message);
        log.info(message);
    }
}
