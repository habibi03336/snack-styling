package com.snackstyling.spring.community.question.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;
@Getter
@Setter
public class QuestionResponse {
    private Long qid;
    private Long mid;
    private String nickname;
    private Integer weight;
    private Integer height;
    private LocalDate endDate;
    private LocalDateTime postDate;
    private String tpo;
    private String comments;
    private Long ans_count=0L;
}
