package com.snackstyling.spring.member.dto;

import com.snackstyling.spring.community.answer.dto.AnswerResponse;
import com.snackstyling.spring.community.question.dto.QuestionResponse;
import lombok.Getter;

import java.util.List;

@Getter
public class MemberInfResponse {
    private String nickname;
    private Integer rank;
    public MemberInfResponse(String nickname, Integer rank){
        this.nickname=nickname;
        this.rank=rank;
    }
}
