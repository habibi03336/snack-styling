package com.snackstyling.spring.community.question.dto;

import com.snackstyling.spring.community.answer.dto.AnswerResponse;
import com.snackstyling.spring.community.answer.dto.AnswersResponse;
import lombok.Getter;


@Getter
public class QuestionDetailResponse {
    private QuestionResponse question;
    private AnswersResponse answers;
    public QuestionDetailResponse(QuestionResponse question, AnswersResponse answers){
        this.question=question;
        this.answers=answers;
    }
}
