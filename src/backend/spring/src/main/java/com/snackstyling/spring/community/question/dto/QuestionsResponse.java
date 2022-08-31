package com.snackstyling.spring.community.question.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;
@Getter
public class QuestionsResponse {
    List<QuestionResponse> questionResponses;
    public QuestionsResponse(List<QuestionResponse> questionResponses){
        this.questionResponses=questionResponses;
    }
}
