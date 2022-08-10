package com.snackstyling.spring.domain;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Setter
@Getter
@NoArgsConstructor
public class Question {
    @Id @GeneratedValue
    @Column(name="queId")
    private Long id;
    @ManyToOne
    @JoinColumn(name="memberId")
    private Member member;
    private LocalDateTime postDate;
    private LocalDate endDate;
    private Integer tpo;
    @Column(length = 1000)
    private String comments;
    private Integer adopt;
}
