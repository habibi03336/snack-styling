package com.snackstyling.spring.login.exception;

public class NoneEmailException extends RuntimeException{
    public NoneEmailException(String message){
        super(message);
    }
}
