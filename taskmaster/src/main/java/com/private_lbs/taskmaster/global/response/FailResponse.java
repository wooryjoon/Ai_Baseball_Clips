package com.private_lbs.taskmaster.global.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.http.HttpStatus;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class FailResponse {
    private boolean success;
    private String msg;
    private HttpStatus status;
}
