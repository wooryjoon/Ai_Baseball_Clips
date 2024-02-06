package private_lbs.ai.service;

import org.springframework.context.ApplicationEventPublisher;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;
import private_lbs.ai.domain.AIProcessedVideoUrl;
import private_lbs.ai.domain.OriginalVideoLocalPath;
import private_lbs.ai.domain.OriginalVideoUrl;

@Service
public class MessagePublishService {
    private final ApplicationEventPublisher eventPublisher;
    private final RedisTemplate<String, Object> redisTemplate;

    public MessagePublishService(ApplicationEventPublisher eventPublisher,
                               RedisTemplate<String, Object> redisTemplate) {
        this.eventPublisher = eventPublisher;
        this.redisTemplate = redisTemplate;
    }


    // AI 모델 서버에서 가공 완료 메세지 수신 채널.
    public void publishEvent3(OriginalVideoLocalPath localFilePath) {
        this.redisTemplate.convertAndSend("ch2", localFilePath);
    }

    // AI 모델에서 가공완료된 영상 조각들 요청 처리 서버로 pub
    public void publishEvent2(AIProcessedVideoUrl AIProcessedVideoUrl) {
        this.redisTemplate.convertAndSend("ch1", AIProcessedVideoUrl);
    }

    // 요청 처리 서버에서 원본 영상 url 정보 전송 Test
    public void publishEvent1(OriginalVideoUrl OriginalVideoUrl){
        redisTemplate.convertAndSend("ch1",OriginalVideoUrl);
    }
}
