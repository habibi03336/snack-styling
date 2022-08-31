package com.snackstyling.spring.member.exception;

import com.snackstyling.spring.login.exception.DuplicateEmailException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.Collections;
import java.util.Map;

@ControllerAdvice("com.snackstyling.spring.member.controller")
public class MemberExceptionHandler {
    @ExceptionHandler(DuplicateNameException.class)
    public ResponseEntity<Map<String, String>> nameAlreadyExistException(Exception e){
        return ResponseEntity.status(HttpStatus.CONFLICT)
                .body(Collections.singletonMap("message",e.getMessage()));
    }
}
