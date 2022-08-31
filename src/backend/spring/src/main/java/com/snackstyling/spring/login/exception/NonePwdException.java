package com.snackstyling.spring.login.exception;

public class NonePwdException extends RuntimeException{
    public NonePwdException(String message){
        super(message);
    }
}
