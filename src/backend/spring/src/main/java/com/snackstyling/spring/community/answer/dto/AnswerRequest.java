package com.snackstyling.spring.community.answer.dto;

import com.snackstyling.spring.community.common.dto.CoordinationDto;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;

@Getter
public class AnswerRequest {
    @ApiModelProperty(value = "맴버고유식별번호", example = "6", required = true)
    private Long mid;
    @ApiModelProperty(value = "질문고유식별번호", example = "8", required = true)
    private Long qid;
    @ApiModelProperty(value = "코디 정보", example = "{top:1,bottom:2}", required = true)
    private CoordinationDto codi;
    @ApiModelProperty(value = "내용", example = "이렇게 코디해서 입어보세요!!", required = true)
    private String comments;
}
