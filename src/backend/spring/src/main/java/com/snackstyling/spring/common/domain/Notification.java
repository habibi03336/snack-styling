package com.snackstyling.spring.common.domain;

import com.snackstyling.spring.community.answer.domain.Answer;
import com.snackstyling.spring.community.question.domain.Question;
import com.snackstyling.spring.member.domain.Member;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Notification {
    @Id @GeneratedValue
    @Column(name="notifyId")
    private Long id;
    @ManyToOne
    @JoinColumn(name="memberId")
    private Member member;
    @ManyToOne
    @JoinColumn(name="queId")
    private Question question;
    @ManyToOne
    @JoinColumn(name="ansId")
    private Answer answer;
    private Integer type;
    private Integer used=0;
}
