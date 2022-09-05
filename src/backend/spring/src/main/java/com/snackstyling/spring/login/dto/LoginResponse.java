package com.snackstyling.spring.login.dto;

import com.snackstyling.spring.common.dto.TokenDto;
import lombok.Getter;

@Getter
public class LoginResponse {
    private Long mid;
    private TokenDto tokens;
    public LoginResponse(Long mid, TokenDto tokens){
        this.mid=mid;
        this.tokens=tokens;
    }
}
