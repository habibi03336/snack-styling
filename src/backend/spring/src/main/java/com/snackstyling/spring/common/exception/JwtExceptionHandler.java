package com.snackstyling.spring.common.exception;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.Collections;
import java.util.Map;

@ControllerAdvice("com.snackstyling.spring")
public class JwtExceptionHandler {
    @ExceptionHandler(TokenExpiredException.class)
    public ResponseEntity<Map<String, String>> TokenExpried(Exception e){
        // 익스파이어 한 경우에만 426번을 던져 줄 것이다.
        return ResponseEntity.status(HttpStatus.UPGRADE_REQUIRED)
                .body(Collections.singletonMap("message",e.getMessage()));
    }
    @ExceptionHandler(TokenMatchException.class)
    public ResponseEntity<Map<String, String>> TokenNotMatch(Exception e){
        return ResponseEntity.status(HttpStatus.CONFLICT)
                .body(Collections.singletonMap("message",e.getMessage()));
    }
    @ExceptionHandler(TokenSignatureException.class)
    public ResponseEntity<Map<String, String>> TokenSignatureNotMatch(Exception e){
        return ResponseEntity.status(HttpStatus.CONFLICT)
                .body(Collections.singletonMap("message",e.getMessage()));
    }
    @ExceptionHandler(TokenSupportException.class)
    public ResponseEntity<Map<String, String>> TokenNotSupport(Exception e){
        return ResponseEntity.status(HttpStatus.CONFLICT)
                .body(Collections.singletonMap("message",e.getMessage()));
    }
    @ExceptionHandler(ClaimEmptyException.class)
    public ResponseEntity<Map<String, String>> ClaimEmpty(Exception e){
        return ResponseEntity.status(HttpStatus.CONFLICT)
                .body(Collections.singletonMap("message",e.getMessage()));
    }
    @ExceptionHandler(MemberIdException.class)
    public ResponseEntity<Map<String, String>> MemberNotSame(Exception e){
        return ResponseEntity.status(HttpStatus.CONFLICT)
                .body(Collections.singletonMap("message",e.getMessage()));
    }
}
