package com.snackstyling.spring.domain;

import com.snackstyling.spring.member.domain.Member;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Setter
@Getter
@NoArgsConstructor
public class Answer {
    @Id @GeneratedValue
    @Column(name="ansId")
    private Long id;
    @ManyToOne
    @JoinColumn(name="memberId")
    private Member member;
    @ManyToOne
    @JoinColumn(name="queId")
    private Question question;
    private LocalDateTime postDate;
    private Long codi;
    @Column(length = 1000)
    private String comments;
}
