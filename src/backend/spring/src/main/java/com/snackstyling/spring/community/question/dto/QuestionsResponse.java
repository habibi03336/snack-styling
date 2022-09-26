package com.snackstyling.spring.community.question.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;
@Getter
public class QuestionsResponse {
    private List<QuestionResponse> questionResponses;
    private Integer totalPage;
    public QuestionsResponse(List<QuestionResponse> questionResponses, Integer totalPage){
        this.questionResponses=questionResponses;
        this.totalPage=totalPage;
    }
}
