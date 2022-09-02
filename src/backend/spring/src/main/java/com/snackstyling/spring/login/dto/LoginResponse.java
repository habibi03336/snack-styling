package com.snackstyling.spring.login.dto;

import lombok.Getter;

@Getter
public class LoginResponse {
    private String refreshToken;
    private String accessToken;
    public LoginResponse(String refreshToken, String accessToken){
        this.accessToken=accessToken;
        this.refreshToken=refreshToken;
    }
}
