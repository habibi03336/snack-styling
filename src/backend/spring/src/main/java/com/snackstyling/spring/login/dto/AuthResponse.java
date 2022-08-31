package com.snackstyling.spring.login.dto;

import lombok.Getter;

@Getter
public class AuthResponse {
    private Long uid;
    public AuthResponse(Long uid){
        this.uid=uid;
    }
}
