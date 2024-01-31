package com.private_lbs.taskmaster.global.exception.dto;

import lombok.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;

import java.util.Objects;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Data
@Builder
public class ValidationExceptionResponse {
    private String message;

    public static ResponseEntity<ValidationExceptionResponse> toResponse(MethodArgumentNotValidException e) {
        return ResponseEntity
                .status(e.getStatusCode())
                .body(ValidationExceptionResponse.builder()
                        .message(Objects.requireNonNull(
                                e.getBindingResult().getFieldError()
                        ).getDefaultMessage())
                        .build()
                );
    }
}
