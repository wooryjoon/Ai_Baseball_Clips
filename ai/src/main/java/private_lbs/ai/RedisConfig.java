package private_lbs.ai;


import lombok.RequiredArgsConstructor;
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
import private_lbs.ai.domain.AIProcessedVideoUrl;
import private_lbs.ai.subscriber.RedisMessageSubscriber;

@RequiredArgsConstructor
@Configuration
public class RedisConfig {


    @Bean
    public RedisConnectionFactory redisConnectionFactory(){
        return new LettuceConnectionFactory();
    }

    @Bean
    public RedisTemplate<String,Object> redisTemplate(){
        RedisTemplate<String,Object> redisTemplate=new RedisTemplate<>();
        redisTemplate.setConnectionFactory(redisConnectionFactory());
        redisTemplate.setKeySerializer(new StringRedisSerializer());
        redisTemplate.setValueSerializer(new Jackson2JsonRedisSerializer<>(AIProcessedVideoUrl.class));
        return redisTemplate;
    }

    @Bean
    public RedisMessageListenerContainer redisContainer(RedisConnectionFactory redisConnectionFactory, RedisMessageSubscriber RedisMessageSubscriber) {
        RedisMessageListenerContainer container = new RedisMessageListenerContainer();
        container.setConnectionFactory(redisConnectionFactory);

        // RedisSubService의 onMessage 메서드 참조를 사용
        MessageListenerAdapter messageListenerAdapter = new MessageListenerAdapter(RedisMessageSubscriber, "onMessage");

        container.addMessageListener(messageListenerAdapter, Topic1());
//        container.addMessageListener(messageListenerAdapter, Topic2());

        return container;
    }



    @Bean
    ChannelTopic Topic1(){
        return new ChannelTopic("ch1");
    };

//    @Bean
//    ChannelTopic Topic2(){
//        return new ChannelTopic("ch2");
//    };


}

