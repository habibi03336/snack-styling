package com.snackstyling.spring.common.dto;

import lombok.Getter;

@Getter
public class AccessTokenResponse {
    private String accessToken;
    public AccessTokenResponse(String accessToken){
        this.accessToken=accessToken;
    }
}
