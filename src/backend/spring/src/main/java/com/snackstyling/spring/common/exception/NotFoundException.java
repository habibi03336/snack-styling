package com.snackstyling.spring.common.exception;

public class NotFoundException extends RuntimeException{ //404
    public NotFoundException(String message){
        super(message);
    }
}