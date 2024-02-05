package private_lbs.ai.service;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.amazonaws.services.s3.model.S3Object;
import com.amazonaws.services.s3.model.S3ObjectInputStream;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

@Service
@RequiredArgsConstructor
public class S3FileService {
    private final AmazonS3Client amazonS3Client;
    @Value("${cloud.aws.s3.bucket}")
    private String bucketName;

    public void downloadFile(String bucketName,String fileKey,String localFilePath) throws IOException {
        S3Object s3Object = amazonS3Client.getObject(bucketName, fileKey);
        S3ObjectInputStream inputStream = s3Object.getObjectContent();
        Files.copy(inputStream, Paths.get(localFilePath), StandardCopyOption.REPLACE_EXISTING);

    }


    public void uploadFile(String fileKey, File file) {
        PutObjectRequest putObjectRequest = new PutObjectRequest(bucketName, fileKey, file);
        amazonS3Client.putObject(putObjectRequest);

    }

    public String buildFileKey(String basePath, String[] parts) {
        String[] paths=basePath.split("\\\\");
        StringBuilder fileKeyBuilder = new StringBuilder();
        fileKeyBuilder.append(paths[paths.length-2]).append("/").append(paths[paths.length-1]);
        for (String part : parts) {
            fileKeyBuilder.append("/").append(part);
        }
        return fileKeyBuilder.toString();
    }

}
