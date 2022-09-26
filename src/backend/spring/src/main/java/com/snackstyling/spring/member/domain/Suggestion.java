package com.snackstyling.spring.member.domain;

import com.snackstyling.spring.login.domain.Login;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Suggestion {
    @Id
    @GeneratedValue
    @Column(name="sugId")
    private Long id;
    @ManyToOne
    @JoinColumn(name="memberId")
    private Member member;
    @Column(length = 1000)
    private String contents;
}
