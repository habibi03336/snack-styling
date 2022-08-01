package com.snackstyling.spring.domain;

import com.sun.istack.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name="member")
public class Member {
    @Id @GeneratedValue
    @Column(name="memberId")
    private Long id;
    @OneToOne
    @JoinColumn(name="userId")
    private Login login;
    private String nickname;
    private Integer gender;
    // Int null 허용
    private Integer age;
    private Integer weight;
    private Integer height;
}
