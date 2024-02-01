package com.private_lbs.taskmaster.Redis;

import com.private_lbs.taskmaster.Redis.domain.RedisPubData;
import com.private_lbs.taskmaster.Redis.service.RedisSubServiceTest;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.connection.lettuce.LettuceConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.listener.ChannelTopic;
import org.springframework.data.redis.listener.RedisMessageListenerContainer;
import org.springframework.data.redis.listener.adapter.MessageListenerAdapter;
import org.springframework.data.redis.serializer.Jackson2JsonRedisSerializer;
import org.springframework.data.redis.serializer.StringRedisSerializer;

@Configuration
public class RedisConfig {

    // Redis 연결 설정을 위한 ConnectionFactory 빈 생성
    @Bean
    public RedisConnectionFactory redisConnectionFactory() {
        return new LettuceConnectionFactory();
    }

    // Redis 작업을 위한 RedisTemplate 설정
    @Bean
    public RedisTemplate<String, Object> redisTemplate() {
        RedisTemplate<String, Object> redisTemplate = new RedisTemplate<>();
        redisTemplate.setConnectionFactory(redisConnectionFactory());
        redisTemplate.setKeySerializer(new StringRedisSerializer());
        redisTemplate.setValueSerializer(new Jackson2JsonRedisSerializer<>(RedisPubData.class));
        return redisTemplate;
    }

    // Redis 메시지 리스너 어댑터 설정
    @Bean
    MessageListenerAdapter messageListenerAdapter() {
        return new MessageListenerAdapter(new RedisSubServiceTest());
    }

    // Redis 메시지 리스너 컨테이너 설정
    @Bean
    RedisMessageListenerContainer redisContainer() {
        RedisMessageListenerContainer container = new RedisMessageListenerContainer();
        container.setConnectionFactory(redisConnectionFactory());
        container.addMessageListener(messageListenerAdapter(), Topic1());
        return container;
    }

    // Redis pub/sub 토픽 설정
    @Bean
    ChannelTopic Topic1() {
        return new ChannelTopic("ch1");
    }

    @Bean
    ChannelTopic Topic2() {
        return new ChannelTopic("ch2");
    }
}
