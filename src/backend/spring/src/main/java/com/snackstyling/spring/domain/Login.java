package com.snackstyling.spring.domain;

import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Login {
    @Id
    @GeneratedValue
    @Column(name="userId")
    private Long id;
    private String email;
    private String password;
    private int used;
}
