package com.snackstyling.spring.common.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.Collections;
import java.util.Map;

@ControllerAdvice("com.snackstyling.spring")
public class FailExceptionHandler {
    @ExceptionHandler(UnauthorizedException.class)
    public ResponseEntity<Map<String, String>> Unauthorized(Exception e){
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(Collections.singletonMap("message",e.getMessage()));
    }
    @ExceptionHandler(NotFoundException.class)
    public ResponseEntity<Map<String, String>> NotFound(Exception e){
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(Collections.singletonMap("message",e.getMessage()));
    }
    @ExceptionHandler(NotAcceptableException.class)
    public ResponseEntity<Map<String, String>> NotAcceptable(Exception e){
        return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE)
                .body(Collections.singletonMap("message",e.getMessage()));
    }
    @ExceptionHandler(ConflictException.class)
    public ResponseEntity<Map<String, String>> Conflict(Exception e){
        return ResponseEntity.status(HttpStatus.CONFLICT)
                .body(Collections.singletonMap("message",e.getMessage()));
    }
    @ExceptionHandler(NotUpgradeException.class)
    public ResponseEntity<Map<String, String>> NotUpgrade(Exception e){
        return ResponseEntity.status(HttpStatus.UPGRADE_REQUIRED)
                .body(Collections.singletonMap("message",e.getMessage()));
    }
    @ExceptionHandler(ServerException.class)
    public ResponseEntity<Map<String, String>> ServerError(Exception e){
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(Collections.singletonMap("message",e.getMessage()));
    }
}
