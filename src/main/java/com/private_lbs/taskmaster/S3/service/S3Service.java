package com.private_lbs.taskmaster.S3.service;

import com.amazonaws.HttpMethod;
import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.GeneratePresignedUrlRequest;
import com.private_lbs.taskmaster.redis.service.RedisPubService;
import com.private_lbs.taskmaster.S3.data.dto.EventRecord;
import com.private_lbs.taskmaster.S3.data.vo.OriginUrl;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.net.URL;
import java.util.Date;
import java.util.List;

@Service
@RequiredArgsConstructor
public class S3Service {

    private RedisPubService redisPubService;
    private final AmazonS3Client amazonS3Client;


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


    public OriginUrl makeOriginUrl(String fileName, long userId, long requestId) {
        String fileKey = userId + "/" + requestId + "/" + fileName;
        return OriginUrl.of(bucket, fileKey);
    }

    public void save(List<EventRecord> records) {
        for (EventRecord record : records) {
            redisPubService.sendMessage(OriginUrl.makeUrlFromEventRecord(record));
        }
    }
}
