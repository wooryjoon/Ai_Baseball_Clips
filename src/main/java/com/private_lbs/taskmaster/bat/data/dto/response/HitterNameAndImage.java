package com.private_lbs.taskmaster.bat.data.dto.response;

import lombok.Getter;

@Getter
public class HitterNameAndImage {

    int inning;
    String name;
    String imageUrl;

    public HitterNameAndImage(int inning, String name, String imageUrl) {
        this.inning = inning;
        this.name = name;
        this.imageUrl = imageUrl;
    }
}
