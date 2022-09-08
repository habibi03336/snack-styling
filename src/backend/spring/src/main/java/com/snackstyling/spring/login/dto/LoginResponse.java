package com.snackstyling.spring.login.dto;

import com.snackstyling.spring.common.dto.TokenDto;
import lombok.Getter;

@Getter
public class LoginResponse {
    private TokenDto tokens;
    public LoginResponse(TokenDto tokens){
        this.tokens=tokens;
    }
}
