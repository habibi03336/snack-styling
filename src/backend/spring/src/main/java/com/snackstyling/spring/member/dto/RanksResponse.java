package com.snackstyling.spring.member.dto;

import lombok.Getter;

import java.util.List;

@Getter
public class RanksResponse {
    List<RankResponse> rankResponses;
    public RanksResponse(List<RankResponse> rankResponses){
        this.rankResponses=rankResponses;
    }
}
