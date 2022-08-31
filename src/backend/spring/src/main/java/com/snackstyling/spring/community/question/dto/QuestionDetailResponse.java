package com.snackstyling.spring.community.question.dto;

import com.snackstyling.spring.community.answer.dto.AnswerResponse;
import lombok.Getter;

import java.util.List;

@Getter
public class QuestionDetailResponse {
    private QuestionResponse question;
    private List<AnswerResponse> answers;
    public QuestionDetailResponse(QuestionResponse question, List<AnswerResponse> answers){
        this.question=question;
        this.answers=answers;
    }
}
