package com.private_lbs.taskmaster.redis.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.private_lbs.taskmaster.redis.domain.RedisPubData;
import org.springframework.data.redis.connection.Message;
import org.springframework.data.redis.connection.MessageListener;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Service
public class RedisSubServiceTest implements MessageListener {

    public static List<String> messageList=new ArrayList<>();
    private final ObjectMapper mapper=new ObjectMapper();
    @Override
    public void onMessage(Message message, byte[] pattern) {
        try {
            RedisPubData redispubdata = mapper.readValue(message.getBody(), RedisPubData.class);
            messageList.add(message.toString());
            System.out.println(message.toString());


        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
}
