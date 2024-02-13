package com.private_lbs.taskmaster.S3.service;

import com.amazonaws.HttpMethod;
import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.*;
import com.private_lbs.taskmaster.S3.data.dto.EventRecord;
import com.private_lbs.taskmaster.S3.data.dto.UserData;
import com.private_lbs.taskmaster.S3.data.vo.OriginUrl;
import com.private_lbs.taskmaster.redis.service.RedisPubService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.net.URL;
import java.util.*;

@Service
@RequiredArgsConstructor
public class S3Service {

    private final RedisPubService redisPubService;
    private final AmazonS3Client amazonS3Client;

   private  final UserDataStorage userDataStorage;
    // AWS S3 버킷 정보와 리전을 설정
    @Value("${cloud.aws.s3.bucket}")
    private String bucket;
    @Value("${cloud.aws.s3.region.static}")
    private String region;

    // AWS S3에서 파일에 대한 사전 서명된 URL을 생성하고 반환
    // 파일 이름, 사용자 ID, 요청 ID, 그리고 유효 기간을 인자로 받음
    public URL generatePresignedUrl(String fileKey, long durationMillis){
        Date expiration = new Date(System.currentTimeMillis() + durationMillis);
        GeneratePresignedUrlRequest request = new GeneratePresignedUrlRequest(bucket, fileKey)
                .withMethod(HttpMethod.PUT)
                .withExpiration(expiration);

        return amazonS3Client.generatePresignedUrl(request);
    }

    public Map<String, Object> createMultipartUploadUrls(String filename, Long fileSize, Long memberId, Long requestId) {

        OriginUrl originUrl = makeOriginUrl(filename, memberId, requestId);
        String uploadId = initiateMultipartUpload(originUrl.getFileKey());
        userDataStorage.addUserData(uploadId, new UserData(originUrl.getFileKey(),memberId,requestId));


        long partSize = 10 * 1024 * 1024;
        int partCount = (int) Math.ceil((double) fileSize / partSize);
        List<String> presignedUrls = new ArrayList<>();
        long durationMillis=100000 * 60;
        for (int partNumber = 1; partNumber <= partCount; partNumber++) {
            URL url=generatePresignedUrl(originUrl.getFileKey(),durationMillis);
            presignedUrls.add(url.toString());
        }

        Map<String, Object> response = new HashMap<>();
        response.put("presignedUrls", presignedUrls);
        response.put("uploadId", uploadId);
        return response;
    }
    private String initiateMultipartUpload(String fileKey) {
        InitiateMultipartUploadRequest request = new InitiateMultipartUploadRequest(bucket, fileKey);
        InitiateMultipartUploadResult result = amazonS3Client.initiateMultipartUpload(request);
        return result.getUploadId();
    }


    public OriginUrl makeOriginUrl(String fileName, long userId, long requestId) {
        String fileKey = userId + "/" + requestId + "/" + fileName;
        return OriginUrl.of(bucket, fileKey);
    }

    public void save(List<EventRecord> records) {
        for (EventRecord record : records) {
            redisPubService.sendMessage(OriginUrl.makeUrlFromEventRecord(record));
        }
    }

    public String generateS3Url(String fileKey) {
        return String.format("https://%s.s3.%s.amazonaws.com/%s", bucket, region, fileKey);
    }

    public void completeMultipartUpload(String uploadId, List<PartETag> partETags) {


        UserData UserData=userDataStorage.getUserData(uploadId);
        CompleteMultipartUploadRequest compRequest = new CompleteMultipartUploadRequest(bucket, UserData.getFileKey(), uploadId, partETags);

        amazonS3Client.completeMultipartUpload(compRequest);
    }


}
