package com.snackstyling.spring.community.answer.dto;

import com.snackstyling.spring.community.common.dto.ClothDto;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class AnswerResponse {
    private Long mid;
    private Long aid;
    private String nickname;
    private ClothDto codi;
    private String comments;
    private Integer adopt;
    private LocalDateTime postDate;
}
