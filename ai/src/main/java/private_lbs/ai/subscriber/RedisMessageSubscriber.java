package private_lbs.ai.subscriber;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.connection.Message;
import org.springframework.data.redis.connection.MessageListener;
import org.springframework.stereotype.Service;
import private_lbs.ai.domain.OriginalVideoLocalPath;
import private_lbs.ai.domain.OriginalVideoUrl;
import private_lbs.ai.service.MessageSubscribeService;

import java.io.IOException;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class RedisMessageSubscriber implements MessageListener {


    private final MessageSubscribeService messageSubscribeService;
    private final ObjectMapper mapper=new ObjectMapper();
    @Override
    public void onMessage(Message message, byte[] pattern) {
        String messageBody = new String(message.getBody());
        try {
            Map<String, Object> messageMap = mapper.readValue(messageBody, new TypeReference<Map<String, Object>>() {});
            // OriginalVideoUrl 형태인지 확인. 요청처리서버에서 ch1로 pub 한 data
            if (messageMap.containsKey("fileKey") && messageMap.containsKey("bucket")) {

                // OriginalVideoUrl 형태로 처리
                OriginalVideoUrl OriginalVideoUrl = mapper.convertValue(messageMap, OriginalVideoUrl.class);

                messageSubscribeService.processOriginalVideoUrl(OriginalVideoUrl);
            } else if (messageMap.containsKey("localPath")) {
                // OriginalVideoLocalPath 형태로 처리
                OriginalVideoLocalPath OriginalVideoLocalPath = mapper.convertValue(messageMap, OriginalVideoLocalPath.class);

                System.out.println("로컬 경로 = " +OriginalVideoLocalPath.getLocalPath());
                messageSubscribeService.processOriginalVideoLocalPath(OriginalVideoLocalPath);
            } else {
                // 알 수 없는 메시지 형태 처리
                System.out.println("알 수 없는 메시지 형태: " + messageBody);
            }
        } catch (JsonProcessingException e) {
            throw new RuntimeException("JSON 파싱 오류: " + e.getMessage(), e);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    // 플라스크로 부터 가공 완료 및 데이터 저장 위치 수신


}
