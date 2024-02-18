package com.private_lbs.taskmaster.redis.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.private_lbs.taskmaster.redis.exception.RedisErrorCode;
import com.private_lbs.taskmaster.redis.exception.RedisException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.connection.Message;
import org.springframework.data.redis.connection.MessageListener;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class RedisSubService implements MessageListener {
    private final ObjectMapper mapper = new ObjectMapper();
    private final SseEmitters sseEmitters;
    /**
     * @author boyjo
     * @date 2/3/24
     * @method onMessage
     * @param
     * @description SUB중인 채널로부터 메시지 수신
     **/
    @Override
    public void onMessage(Message message, byte[] pattern) {
        try {
            String mes = new String(message.getBody(), "UTF-8");
            log.info("SSE로 넘어온 메시지 = " + mes);

            ObjectMapper objectMapper = new ObjectMapper();

            try {
                List<String> messageList = objectMapper.readValue(mes, new TypeReference<List<String>>(){});
                sseEmitters.sendMessageLog(messageList);
            } catch (Exception e) {
                // JSON 배열이 아닌 경우의 기존 처리
                try {
                    Integer msgInt = Integer.parseInt(mes);
                    sseEmitters.sendMessage(String.valueOf(msgInt));
                } catch(Exception ex) {
                    System.out.println("requestId  " + mes);
                    String temp = mes.split("/")[1];
                    Integer requestId = Integer.parseInt(temp.replace("\"", ""));
                    sseEmitters.sendMessage(requestId);
                }
            }

        } catch (RedisException | IOException e) {
            throw new RedisException(RedisErrorCode.MESSAGE_RECEIVE_FAILED);
        }
    }
}
