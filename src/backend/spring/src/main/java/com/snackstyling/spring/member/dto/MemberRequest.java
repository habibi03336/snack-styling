package com.snackstyling.spring.member.dto;

import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MemberRequest {
    @ApiModelProperty(value = "별명", example = "킹명주", required = true)
    private String nickname;
    @ApiModelProperty(value = "나이", example = "35", required = true)
    private Integer age;
    @ApiModelProperty(value = "성", example = "1", required = true)
    private Integer gender;
    @ApiModelProperty(value = "몸무게", example = "45", required = true)
    private Integer weight;
    @ApiModelProperty(value = "키", example = "158", required = true)
    private Integer height;
}
