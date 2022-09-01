package com.snackstyling.spring.common.exception;

public class TokenSignatureException extends RuntimeException{
    public TokenSignatureException(String message){
        super(message);
    }
}
