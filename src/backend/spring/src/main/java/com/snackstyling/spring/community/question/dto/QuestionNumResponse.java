package com.snackstyling.spring.community.question.dto;

import lombok.Getter;

@Getter
public class QuestionNumResponse {
    private Long qid;
    public QuestionNumResponse(Long qid){
        this.qid=qid;
    }
}
