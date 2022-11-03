package com.snackstyling.spring.community.answer.domain;

import com.snackstyling.spring.community.question.domain.Question;
import com.snackstyling.spring.member.domain.Member;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;

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
    private Integer adopt=0;
    private Integer used=1;
}
