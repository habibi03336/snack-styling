package com.snackstyling.spring.login.dto;

import com.snackstyling.spring.common.dto.TokenDto;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class LoginResponse {
    private Boolean isMember;
    private TokenDto tokens;
    public LoginResponse(Boolean isMember, TokenDto tokens){
        this.isMember=isMember;
        this.tokens=tokens;
    }
}
