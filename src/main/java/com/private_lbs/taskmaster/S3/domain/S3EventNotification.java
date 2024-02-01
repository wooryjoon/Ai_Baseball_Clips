package com.private_lbs.taskmaster.S3.domain;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;

import java.util.List;

@Getter
// AWS S3 이벤트 알림을 나타내는 클래스
public class S3EventNotification {
    // S3 이벤트 레코드 목록
    @JsonProperty("Records")
    private List<S3EventRecord> records;

    // AWS S3 이벤트의 단일 레코드
    @Getter
    public static class S3EventRecord {
        private S3Entity s3;

        // S3 엔티티 상세 정보를 포함하는 클래스
        @Getter
        public static class S3Entity {
            private S3Bucket bucket;
            private S3Object object;

            // S3 버킷 정보를 나타내는 클래스
            @Getter
            public static class S3Bucket {
                private String name;
            }

            // S3 객체 정보를 나타내는 클래스
            @Getter
            public static class S3Object {
                private String key;
            }
        }
    }
}
