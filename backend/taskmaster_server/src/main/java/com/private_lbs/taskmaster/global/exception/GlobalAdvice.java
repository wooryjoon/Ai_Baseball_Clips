package com.private_lbs.taskmaster.global.exception;

import com.private_lbs.taskmaster.global.exception.dto.GlobalExceptionResponse;
import com.private_lbs.taskmaster.global.exception.dto.ValidationExceptionResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice()
public class GlobalAdvice {

    @ExceptionHandler
    public ResponseEntity<?> illegalArgumentResponse(GlobalException ex) {
        return GlobalExceptionResponse.toResponse(ex);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ValidationExceptionResponse> validationHandlerException(MethodArgumentNotValidException e) {
        return ValidationExceptionResponse.toResponse(e);
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(IllegalArgumentException.class)
    public String handler(IllegalArgumentException e) {
        return e.getMessage();
    }
}
