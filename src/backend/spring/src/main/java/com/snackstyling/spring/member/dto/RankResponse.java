package com.snackstyling.spring.member.dto;

import lombok.Getter;

@Getter
public class RankResponse {
    String nickname;
    Integer adoptCnt;
    public RankResponse(String nickname, Integer adoptCnt){
        this.nickname=nickname;
        this.adoptCnt=adoptCnt;
    }
}
