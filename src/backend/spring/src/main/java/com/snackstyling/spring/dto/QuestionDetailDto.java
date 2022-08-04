package com.snackstyling.spring.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Setter
@Getter
@NoArgsConstructor
public class QuestionDetailDto {
    private QuestionListDto que;
    private List<AnswerListDto> ans;

}
