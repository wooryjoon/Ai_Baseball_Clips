package com.private_lbs.taskmaster.Redis.Service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.private_lbs.taskmaster.Redis.Model.RedisSubData;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.connection.Message;
import org.springframework.data.redis.connection.MessageListener;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
@Service
@RequiredArgsConstructor
public class RedisSubService implements MessageListener {
    // sub 되는 메시지들을 저장 할 List.
    List<RedisSubData> messageList = new ArrayList<>();


    private final ObjectMapper mapper=new ObjectMapper();

    // Redis에서 data sub
    @Override
    public void onMessage(Message message, byte[] pattern) {
        try {
            RedisSubData redisSubData = mapper.readValue(message.getBody(), RedisSubData.class);
            messageList.add(redisSubData);
            for(String fileKey:redisSubData.getFilekeys()){
                System.out.println("File key : "+fileKey);
            }
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

    }
}
