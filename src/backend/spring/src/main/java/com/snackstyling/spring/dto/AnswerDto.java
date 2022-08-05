package com.snackstyling.spring.dto;

import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AnswerDto {
    @ApiModelProperty(value = "맴버고유식별번호", example = "6", required = true)
    private Long mid;
    @ApiModelProperty(value = "질문고유식별번호", example = "8", required = true)
    private Long qid;
    @ApiModelProperty(value = "top id", example = "3", required = true)
    private Integer top;
    @ApiModelProperty(value = "bottom id", example = "4", required = true)
    private Integer bottom;
    @ApiModelProperty(value = "내용", example = "이렇게 코디해서 입어보세요!!", required = true)
    private String comments;
}
