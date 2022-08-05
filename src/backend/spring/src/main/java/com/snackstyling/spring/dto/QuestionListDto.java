package com.snackstyling.spring.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
public class QuestionListDto {
    private Long id;
    private Integer weight;
    private Integer height;
    private LocalDate end_date;
    private LocalDateTime post_date;
    private Integer tpo;
    private String comments;
}
