package com.snackstyling.spring.community.answer.dto;

import lombok.Getter;

import java.util.List;

@Getter
public class AnswersResponse {
    List<AnswerResponse> answerResponses;
    public AnswersResponse(List<AnswerResponse> answerResponses){
        this.answerResponses=answerResponses;
    }
}
