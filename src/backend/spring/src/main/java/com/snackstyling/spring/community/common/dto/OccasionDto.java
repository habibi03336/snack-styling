package com.snackstyling.spring.community.common.dto;

public class OccasionDto {
    public String getTpo(int tpo){
        if(tpo==0) return "데일리";
        else if(tpo==1) return "소개팅";
        else if(tpo==2) return "데이트";
        else if(tpo==3) return "동창회";
        return "결혼식";
    }
}
