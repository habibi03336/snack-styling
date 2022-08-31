package com.snackstyling.spring.member.exception;

public class DuplicateNameException extends RuntimeException{
    public DuplicateNameException(String message){
        super(message);
    }
}
