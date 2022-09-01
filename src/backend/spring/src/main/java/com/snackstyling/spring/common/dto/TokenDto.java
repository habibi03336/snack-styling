package com.snackstyling.spring.common.dto;

import lombok.Getter;

@Getter
public class TokenDto {
    private String accessToken;
    public TokenDto(String accessToken){
        this.accessToken=accessToken;
    }
}
