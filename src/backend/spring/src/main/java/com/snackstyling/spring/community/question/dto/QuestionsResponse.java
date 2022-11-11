package com.snackstyling.spring.community.question.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;
@Getter
public class QuestionsResponse {
    private List<QuestionResponse> questionResponses;
    private Integer curPage;
    private Integer totalPage;
    public QuestionsResponse(List<QuestionResponse> questionResponses, Integer curPage, Integer totalPage){
        this.questionResponses=questionResponses;
        this.curPage=curPage;
        this.totalPage=totalPage;
    }
}
