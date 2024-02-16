package com.private_lbs.taskmaster.S3.service;

import com.private_lbs.taskmaster.S3.data.dto.UserData;
import org.springframework.stereotype.Service;

import java.util.concurrent.ConcurrentHashMap;
@Service
public class UserDataStorage {

    private final ConcurrentHashMap<String, UserData> uploadIdToInfoMap = new ConcurrentHashMap<>();





    public void addUserData(String uploadId, UserData UserData) {
        uploadIdToInfoMap.put(uploadId, UserData);
    }

    public UserData getUserData(String uploadId) {
        return uploadIdToInfoMap.get(uploadId);
    }

    public void removeUserData(String uploadId) {
        uploadIdToInfoMap.remove(uploadId);
    }
}
