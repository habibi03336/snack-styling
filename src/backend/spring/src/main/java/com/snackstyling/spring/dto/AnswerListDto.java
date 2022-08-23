package com.snackstyling.spring.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class AnswerListDto {
    private String nickname;
    private String top;
    private String bottom;
    private String cap;
    private String footwear;
    private String comments;
}
