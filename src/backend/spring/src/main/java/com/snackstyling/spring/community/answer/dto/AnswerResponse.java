package com.snackstyling.spring.community.answer.dto;

import com.snackstyling.spring.community.common.dto.ClothDto;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AnswerResponse {
    private String nickname;
    private ClothDto clothDto;
    private String comments;
    private Integer adopt;
}
