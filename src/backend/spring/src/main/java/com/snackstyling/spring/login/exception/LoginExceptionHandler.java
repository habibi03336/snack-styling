package com.snackstyling.spring.login.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.Collections;
import java.util.Map;

@ControllerAdvice("com.snackstyling.spring.login.controller")
public class LoginExceptionHandler {
    @ExceptionHandler(DuplicateEmailException.class)
    public ResponseEntity<Map<String, String>> emailAlreadyExistException(Exception e){
        return ResponseEntity.status(HttpStatus.CONFLICT)
                .body(Collections.singletonMap("message",e.getMessage()));
    }
    @ExceptionHandler(NoneEmailException.class)
    public ResponseEntity<Map<String, String>> NotExistEmailException(Exception e){
        return ResponseEntity.status(HttpStatus.CONFLICT)
                .body(Collections.singletonMap("message",e.getMessage()));
    }
    @ExceptionHandler(NonePwdException.class)
    public ResponseEntity<Map<String, String>> NotCorrectPwdException(Exception e){
        return ResponseEntity.status(HttpStatus.CONFLICT)
                .body(Collections.singletonMap("message",e.getMessage()));
    }
    @ExceptionHandler(NoneMemberException.class)
    public ResponseEntity<Map<String, String>> NotMemberInfException(Exception e){
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(Collections.singletonMap("message",e.getMessage()));
    }
    @ExceptionHandler(WithdrawException.class)
    public ResponseEntity<Map<String, String>> OutMemberException(Exception e){
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(Collections.singletonMap("message",e.getMessage()));
    }
}
