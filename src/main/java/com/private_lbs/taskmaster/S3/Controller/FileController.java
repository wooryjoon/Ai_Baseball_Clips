package com.private_lbs.taskmaster.S3.Controller;

import com.private_lbs.taskmaster.Redis.Model.RedisPubData;
import com.private_lbs.taskmaster.Redis.Service.RedisPubService;
import com.private_lbs.taskmaster.S3.Model.S3EventNotification;
import com.private_lbs.taskmaster.S3.Model.UserData;
import com.private_lbs.taskmaster.S3.Service.FileService;
import com.private_lbs.taskmaster.S3.Service.UserDataService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URL;

@RestController
@RequestMapping("/S3")
@RequiredArgsConstructor
public class FileController {

    private final FileService fileService;
    private final UserDataService userDataService;
    private final RedisPubService redisPubService;

    // 클라이언트로부터 AWS S3 사전 서명된 URL 생성 요청을 처리
    @GetMapping("/generate-url")
    public ResponseEntity<String> generatePresignedUrl(@ModelAttribute UserData userdata){
        int requestID = 1;
        userDataService.storeUserData(requestID, userdata);
        long durationMillis = 100000 * 60;
        URL url = fileService.generatePresignedUrl(userdata.getFileName(), userdata.getUserId(), requestID, durationMillis);
        return ResponseEntity.ok(url.toString());
    }

    // AWS S3에서 파일 업로드 이벤트 수신 및 처리
    @PostMapping("/endpoint")
    public String receiveFileUrl(@RequestBody S3EventNotification notification){
        for (S3EventNotification.S3EventRecord record : notification.getRecords()) {
            String bucketName = record.getS3().getBucket().getName();
            String fileKey = record.getS3().getObject().getKey();

            // 수신된 데이터를 Redis로 전송
            redisPubService.sendMessage(new RedisPubData(fileKey, bucketName));
        }
        return "성공";
    }
}
