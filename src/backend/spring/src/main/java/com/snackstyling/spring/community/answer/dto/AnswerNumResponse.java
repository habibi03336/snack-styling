package com.snackstyling.spring.community.answer.dto;

import lombok.Getter;

@Getter
public class AnswerNumResponse {
    private Long aid;
    public AnswerNumResponse(Long aid){
        this.aid=aid;
    }
}
