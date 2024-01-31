package com.private_lbs.taskmaster.S3.Service;

import com.amazonaws.HttpMethod;
import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.GeneratePresignedUrlRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.net.URL;
import java.util.Date;

@Service
@RequiredArgsConstructor
public class FileService {

    private final AmazonS3Client amazonS3Client;

    // AWS S3 버킷 정보와 리전을 설정
    @Value("${cloud.aws.s3.bucket}")
    private String bucket;
    @Value("${cloud.aws.s3.region.static}")
    private String region;

    // AWS S3에서 파일에 대한 사전 서명된 URL을 생성하고 반환
    // 파일 이름, 사용자 ID, 요청 ID, 그리고 유효 기간을 인자로 받음
    public URL generatePresignedUrl(String fileName, String userId, int requestId, long durationMillis){

        String fileKey=userId+"/"+requestId+"/"+fileName;
        Date expiration =new Date();
        expiration.setTime(expiration.getTime()+durationMillis);
        GeneratePresignedUrlRequest generatePresignedUrlRequest=
                new GeneratePresignedUrlRequest(bucket,fileKey)
                        .withMethod(HttpMethod.PUT)
                        .withExpiration(expiration);

        return amazonS3Client.generatePresignedUrl(generatePresignedUrlRequest);
    }



}
