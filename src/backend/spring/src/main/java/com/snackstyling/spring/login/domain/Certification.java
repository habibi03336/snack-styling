package com.snackstyling.spring.login.domain;


import lombok.Getter;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;

@Getter
@RedisHash(value = "certification")
public class Certification {
    @Id
    private String email;
    private Integer check;
    public Certification(String email, Integer check){
        this.email=email;
        this.check=check;
    }
}
