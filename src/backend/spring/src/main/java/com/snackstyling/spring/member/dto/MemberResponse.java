package com.snackstyling.spring.member.dto;

import lombok.Getter;

@Getter
public class MemberResponse {
    private Long mid;
    public MemberResponse(Long mid){
        this.mid=mid;
    }
}
