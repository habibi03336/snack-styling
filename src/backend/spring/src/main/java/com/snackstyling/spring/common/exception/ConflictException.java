package com.snackstyling.spring.common.exception;

public class ConflictException extends RuntimeException{ //409
    public ConflictException(String message){super(message);}
}