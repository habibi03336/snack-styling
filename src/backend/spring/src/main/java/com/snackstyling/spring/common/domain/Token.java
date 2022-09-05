package com.snackstyling.spring.common.domain;

import lombok.Getter;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;

@Getter
@RedisHash(value = "token", timeToLive = 604800)

public class Token {
    @Id
    private String email;
    private String refreshToken;
    public Token(String email, String refreshToken){
        this.email=email;
        this.refreshToken=refreshToken;
    }

}
