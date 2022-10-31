package com.snackstyling.spring.member.dto;

import com.snackstyling.spring.community.answer.dto.AnswerResponse;
import com.snackstyling.spring.community.question.dto.QuestionResponse;
import lombok.Getter;

import java.util.List;

@Getter
public class MemberInfResponse {
    private String nickname;
    private Integer gender;
    private Integer age;
    private Integer weight;
    private Integer height;
    private Integer rank;
    public MemberInfResponse(String nickname, Integer gender, Integer age, Integer weight, Integer height, Integer rank){
        this.nickname=nickname;
        this.gender=gender;
        this.age=age;
        this.weight=weight;
        this.height=height;
        this.rank=rank;
    }
}
