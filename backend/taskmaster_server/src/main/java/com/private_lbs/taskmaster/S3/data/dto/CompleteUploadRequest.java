package com.private_lbs.taskmaster.S3.data.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;
@Getter
@Setter
public class CompleteUploadRequest {

    private List<Part> parts;
    private String uploadId;

}
