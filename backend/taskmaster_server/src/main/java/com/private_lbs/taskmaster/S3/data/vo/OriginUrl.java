package com.private_lbs.taskmaster.S3.data.vo;

import com.private_lbs.taskmaster.S3.data.dto.EventRecord;
import lombok.Getter;

@Getter
public class OriginUrl {
    String bucket;
    String fileKey;

    private OriginUrl(String bucket, String fileKey) {
        this.bucket = bucket;
        this.fileKey = fileKey;
    }

    public static OriginUrl of(String bucket, String fileKey) {
        return new OriginUrl(bucket, fileKey);
    }

    public static OriginUrl makeUrlFromEventRecord(EventRecord record) {
        return OriginUrl.of(
            record.getS3().getBucket().getName(),
            record.getS3().getObject().getKey()
        );
    }

    @Override
    public String toString() {
        return getBucket() + "/" + getFileKey();
    }
}
