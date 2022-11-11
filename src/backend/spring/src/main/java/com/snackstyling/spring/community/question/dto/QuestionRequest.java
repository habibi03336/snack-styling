package com.snackstyling.spring.community.question.dto;

import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
@Getter
@Setter
public class QuestionRequest {
    @ApiModelProperty(value = "TPO", example = "1", required = true)
    private Integer tpo;
    @ApiModelProperty(value = "옷 입을 날짜", example = "2022-08-23", required = true)
    private LocalDate endDate;
    @ApiModelProperty(value = "내용", example = "여름 코디 추천좀 해주세요!", required = true)
    private String comments;
}
