package com.private_lbs.taskmaster.bat.data.dto.response;

import lombok.Getter;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Base64;

@Getter
public class HitterNameAndImage {

    int inning;
    String name;
    String imageBase64;

    public HitterNameAndImage(int inning, String name, String imageUrl) throws IOException {
        this.inning = inning;
        this.name = name;
        this.imageBase64 = getImageBase64(imageUrl);
    }

    private String getImageBase64(String imageUrl) throws IOException {
        Path path = Paths.get(imageUrl);
        byte[] imageBytes = Files.readAllBytes(path);
        return Base64.getEncoder().encodeToString(imageBytes);
    }
}
