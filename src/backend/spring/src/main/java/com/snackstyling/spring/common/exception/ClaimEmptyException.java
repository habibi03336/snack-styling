package com.snackstyling.spring.common.exception;

public class ClaimEmptyException extends RuntimeException{
    public ClaimEmptyException(String message){
        super(message);
    }
}
