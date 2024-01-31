package com.private_lbs.taskmaster.S3.Service;

import com.private_lbs.taskmaster.S3.Model.UserData;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.concurrent.ConcurrentHashMap;

@Service
@RequiredArgsConstructor
public class UserDataService {
    // 사용자 데이터 임시 저장.
    private final ConcurrentHashMap<Integer, UserData> userDataMap=new ConcurrentHashMap<>();
    public void storeUserData(int requestId,UserData userdata){
        userDataMap.put(requestId,userdata);
    }




}

