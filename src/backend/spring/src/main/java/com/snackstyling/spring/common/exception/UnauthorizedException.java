package com.snackstyling.spring.common.exception;

public class UnauthorizedException extends RuntimeException{ //401
    public UnauthorizedException(String message){super(message);}
}
