package com.private_lbs.taskmaster.bat.data.dto.response;

import lombok.Getter;

@Getter
public class HitterNameAndImage {

    String inning;
    String name;
    String imageUrl;

    public HitterNameAndImage(int inning, String name, String imageUrl) {
        this.inning = getInning(inning);
        this.name = name;
        this.imageUrl = imageUrl;
    }


    private String getInning(int inning) {
        if (inning % 2 == 1) {
            return inning / 2 + 1 + "회 초";
        } else {
            return inning / 2 + "회 말";
        }
    }


}
